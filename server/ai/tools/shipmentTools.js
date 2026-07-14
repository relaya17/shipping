const { z } = require('zod');
const shipmentService = require('../../services/shipmentService');
const gpsService = require('../../services/gpsService');

/**
 * כלי AI למעקב משלוח + GPS.
 */
const trackShipmentTool = {
  description:
    'Check shipment status, current GPS location, route, and map link by tracking number (VIP + digits). ' +
    'Use when a customer asks where their shipment is or requests tracking.',
  parameters: z.object({
    trackingNumber: z.string().describe('Tracking number, e.g. VIP1234567890')
  }),
  execute: async ({ trackingNumber }) => {
    const view = await gpsService.getTrackingView(trackingNumber);
    if (!view) return { found: false };
    return {
      found: true,
      ...view,
      isDelayed: (() => {
        // חישוב קל — אם יש estimatedDelivery שעבר
        if (!view.estimatedDelivery) return false;
        return new Date() > new Date(view.estimatedDelivery) && view.status !== 'delivered';
      })()
    };
  }
};

/**
 * עדכון GPS — לשימוש סוכן/תפעול כשמדווחים מיקום חדש (למשל נהג עדכן מדינה).
 */
const updateShipmentGpsTool = {
  description:
    'Update a shipment GPS location. Can send precise lat/lon, or a US state (approx. capital/center). ' +
    'Use when a customer/driver reports a new location or when simulating route progress.',
  parameters: z.object({
    trackingNumber: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    state: z.string().optional().describe('US state code such as CA, TX, NY'),
    city: z.string().optional(),
    address: z.string().optional(),
    country: z.string().optional(),
    speedKmh: z.number().optional(),
    status: z.enum([
      'pending', 'quoted', 'booked', 'picked_up', 'in_transit',
      'at_customs', 'out_for_delivery', 'delivered', 'cancelled', 'returned'
    ]).optional(),
    note: z.string().optional()
  }),
  execute: async (args) => {
    try {
      const view = await gpsService.updateGps(args.trackingNumber, {
        latitude: args.latitude,
        longitude: args.longitude,
        state: args.state,
        city: args.city,
        address: args.address,
        country: args.country || 'US',
        speed: args.speedKmh,
        status: args.status
      }, { note: args.note });
      return { success: true, tracking: view };
    } catch (error) {
      return { success: false, error: error.message, status: error.status || 500 };
    }
  }
};

module.exports = { trackShipmentTool, updateShipmentGpsTool };
