const express = require('express');
const router = express.Router();

const { rateLimits } = require('../middleware/security');
const auth = require('../middleware/auth');
const Quote = require('../models/Quote');
const Shipment = require('../models/Shipment');
const Invoice = require('../models/Invoice');
const User = require('../models/User');

router.use(rateLimits.api);

const ACTIVE_STATUSES = [
  'booked',
  'pickup_scheduled',
  'picked_up',
  'in_transit',
  'customs_clearance',
  'out_for_delivery'
];

function periodStart(period) {
  const days = period === '90days' ? 90 : period === '30days' ? 30 : 7;
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - days);
  return start;
}

function mapShipmentStatus(status) {
  if (!status) return 'pending';
  if (status === 'delivered') return 'delivered';
  if (['booked', 'pickup_scheduled'].includes(status)) return 'approved';
  if (ACTIVE_STATUSES.includes(status)) return 'in_transit';
  if (['quote', 'quoted', 'draft', 'pending'].includes(status)) return 'pending';
  return 'pending';
}

// POST /api/analytics — accept client events (best-effort)
router.post('/', auth.optionalAuth, async (req, res) => {
  try {
    const event = req.body || {};
    if (process.env.NODE_ENV !== 'production') {
      console.log('POST /api/analytics', event?.action || event?.type || 'event');
    }
    return res.status(201).json({ success: true, received: true });
  } catch (error) {
    console.warn('analytics ingest failed:', error?.message || error);
    return res.status(201).json({ success: true, received: false });
  }
});

// GET /api/analytics/dashboard — real aggregates for admins
router.get('/dashboard', auth.requireAuth, auth.requireAdmin, async (req, res, next) => {
  try {
    const period = ['7days', '30days', '90days'].includes(req.query.period)
      ? req.query.period
      : '7days';
    const startDate = periodStart(period);

    const [
      revenueAgg,
      activeShipments,
      totalCustomers,
      totalQuotes,
      satisfactionAgg,
      deliveryAgg,
      recentShipments
    ] = await Promise.all([
      Invoice.aggregate([
        {
          $match: {
            status: 'paid',
            $or: [
              { 'payment.paidAt': { $gte: startDate } },
              { 'payment.paidAt': null, updatedAt: { $gte: startDate } }
            ]
          }
        },
        { $group: { _id: null, total: { $sum: '$amounts.totalAmount' } } }
      ]),
      Shipment.countDocuments({
        'shipmentInfo.status': { $in: ACTIVE_STATUSES }
      }),
      User.countDocuments({
        'permissions.role': { $in: ['user', 'premium'] },
        'permissions.isActive': { $ne: false }
      }),
      Quote.countDocuments({ createdAt: { $gte: startDate } }),
      Shipment.aggregate([
        {
          $match: {
            'communication.customerSatisfaction.rating': { $exists: true, $ne: null },
            updatedAt: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: null,
            avg: { $avg: '$communication.customerSatisfaction.rating' },
            count: { $sum: 1 }
          }
        }
      ]),
      Shipment.aggregate([
        {
          $match: {
            'shipmentInfo.status': 'delivered',
            'timeline.actualDeliveryDate': { $gte: startDate },
            $or: [
              { 'timeline.transitDays': { $gt: 0 } },
              {
                'timeline.actualPickupDate': { $exists: true },
                'timeline.actualDeliveryDate': { $exists: true }
              }
            ]
          }
        },
        {
          $project: {
            days: {
              $cond: [
                { $gt: ['$timeline.transitDays', 0] },
                '$timeline.transitDays',
                {
                  $divide: [
                    { $subtract: ['$timeline.actualDeliveryDate', '$timeline.actualPickupDate'] },
                    1000 * 60 * 60 * 24
                  ]
                }
              ]
            }
          }
        },
        { $group: { _id: null, avg: { $avg: '$days' } } }
      ]),
      Shipment.find({})
        .sort({ createdAt: -1 })
        .limit(10)
        .select(
          'shipmentInfo.trackingNumber shipmentInfo.status customer.contactInfo addresses.destination pricing.totalPrice aiInsights.recommendations'
        )
        .lean()
    ]);

    const recentOrders = (recentShipments || []).map((s) => {
      const city = s.addresses?.destination?.city || '';
      const country = s.addresses?.destination?.country || '';
      const destination = [city, country].filter(Boolean).join(', ') || '—';
      const recs = Array.isArray(s.aiInsights?.recommendations)
        ? s.aiInsights.recommendations
            .map((r) => (typeof r === 'string' ? r : r?.title || r?.text))
            .filter(Boolean)
        : [];
      return {
        id: s.shipmentInfo?.trackingNumber || String(s._id),
        customer: s.customer?.contactInfo?.name || s.customer?.contactInfo?.email || '—',
        destination,
        value: Number(s.pricing?.totalPrice) || 0,
        status: mapShipmentStatus(s.shipmentInfo?.status),
        aiRecommendations: recs.slice(0, 3)
      };
    });

    return res.json({
      success: true,
      period,
      metrics: {
        totalRevenue: Number(revenueAgg[0]?.total) || 0,
        activeShipments,
        totalCustomers,
        totalQuotes,
        avgDeliveryTime: deliveryAgg[0]?.avg != null ? Math.round(deliveryAgg[0].avg * 10) / 10 : null,
        customerSatisfaction:
          satisfactionAgg[0]?.avg != null
            ? Math.round(satisfactionAgg[0].avg * 10) / 10
            : null,
        aiInteractions: null
      },
      recentOrders
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
