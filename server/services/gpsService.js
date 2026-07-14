const Shipment = require('../models/Shipment');
const usKnowledge = require('../ai/knowledge/usShippingLaw');

/**
 * שירות GPS — עדכון מיקום, מסלול, ותצוגת מעקב ציבורית.
 */

function toPublicTracking(shipment) {
  const loc = shipment.tracking?.currentLocation || {};
  const coords = loc.coordinates || {};
  const route = (shipment.tracking?.route || []).map((point) => ({
    lat: point.location?.coordinates?.latitude,
    lon: point.location?.coordinates?.longitude,
    address: point.location?.address,
    timestamp: point.timestamp,
    speed: point.speed,
    direction: point.direction
  })).filter((p) => p.lat != null && p.lon != null);

  const milestones = (shipment.timeline?.milestones || []).map((m, idx) => ({
    id: String(m._id || idx),
    event: m.event,
    location: m.location,
    description: m.description,
    status: m.status,
    timestamp: m.timestamp,
    lat: m.coordinates?.latitude,
    lon: m.coordinates?.longitude
  }));

  const progress = estimateProgress(shipment);

  return {
    trackingNumber: shipment.shipmentInfo.trackingNumber,
    status: shipment.shipmentInfo.status,
    serviceType: shipment.shipmentInfo.serviceType,
    currentLocation: {
      address: loc.address,
      city: loc.city,
      state: loc.state || undefined,
      country: loc.country,
      lat: coords.latitude,
      lon: coords.longitude,
      lastUpdated: loc.lastUpdated
    },
    origin: summarizeAddress(shipment.addresses?.origin),
    destination: summarizeAddress(shipment.addresses?.destination),
    estimatedDelivery: shipment.timeline?.estimatedDeliveryDate,
    distanceRemainingKm: shipment.tracking?.distanceRemaining,
    carrier: shipment.tracking?.carrier,
    route,
    milestones,
    progress,
    map: buildMapUrls(coords.latitude, coords.longitude, route)
  };
}

function summarizeAddress(addr) {
  if (!addr) return null;
  return {
    city: addr.city,
    state: addr.state,
    country: addr.country,
    address: addr.address,
    lat: addr.coordinates?.latitude,
    lon: addr.coordinates?.longitude
  };
}

function estimateProgress(shipment) {
  const status = shipment.shipmentInfo?.status;
  const map = {
    pending: 5,
    quoted: 10,
    booked: 15,
    picked_up: 30,
    in_transit: 55,
    at_customs: 70,
    out_for_delivery: 85,
    delivered: 100,
    cancelled: 0,
    returned: 95
  };
  if (map[status] != null) return map[status];

  const routeLen = shipment.tracking?.route?.length || 0;
  return Math.min(90, 20 + routeLen * 5);
}

function buildMapUrls(lat, lon, route) {
  if (lat == null || lon == null) return null;
  const delta = 0.35;
  const bbox = `${lon - delta}%2C${lat - delta}%2C${lon + delta}%2C${lat + delta}`;
  const embed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  const open = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=10/${lat}/${lon}`;
  const last = route?.[route.length - 1];
  return {
    embedUrl: embed,
    openUrl: open,
    lastPoint: last || { lat, lon }
  };
}

async function updateGps(trackingNumber, payload, actor = {}) {
  const shipment = await Shipment.findByTrackingNumber(trackingNumber);
  if (!shipment) {
    const err = new Error('Shipment not found');
    err.status = 404;
    throw err;
  }

  let { latitude, longitude, address, city, state, country, speed, direction, altitude, status } = payload || {};

  // אם לא נשלחו קואורדינטות אבל יש state ארה״ב — השתמש במרכז המדינה כקירוב
  if ((latitude == null || longitude == null) && state) {
    const approx = usKnowledge.getStateCoordinates(state);
    if (approx) {
      latitude = approx.lat;
      longitude = approx.lon;
      address = address || approx.label;
      city = city || approx.label.split(',')[0];
      country = country || 'US';
    }
  }

  if (latitude == null || longitude == null) {
    const err = new Error('latitude and longitude are required (or a US state)');
    err.status = 400;
    throw err;
  }

  shipment.tracking.currentLocation = {
    address: address || shipment.tracking.currentLocation?.address,
    city: city || shipment.tracking.currentLocation?.city,
    country: country || shipment.tracking.currentLocation?.country || 'US',
    coordinates: { latitude: Number(latitude), longitude: Number(longitude) },
    lastUpdated: new Date()
  };

  // שמירת state בשדה address אם אין שדה ייעודי במודל — נשמור ב-city/address
  if (state) {
    shipment.tracking.currentLocation.city = city || state;
  }

  shipment.tracking.route.push({
    location: {
      coordinates: { latitude: Number(latitude), longitude: Number(longitude) },
      address: address || `${city || ''}${state ? `, ${state}` : ''}`.trim()
    },
    timestamp: new Date(),
    speed: speed != null ? Number(speed) : undefined,
    direction: direction != null ? Number(direction) : undefined,
    altitude: altitude != null ? Number(altitude) : undefined
  });

  if (status) {
    shipment.shipmentInfo.status = status;
  }

  if (actor.note) {
    shipment.timeline.milestones.push({
      event: 'gps_update',
      location: address || `${latitude},${longitude}`,
      description: actor.note,
      status: 'in_progress',
      timestamp: new Date(),
      coordinates: { latitude: Number(latitude), longitude: Number(longitude) }
    });
  }

  await shipment.save();
  return toPublicTracking(shipment);
}

async function getTrackingView(trackingNumber) {
  const shipment = await Shipment.findByTrackingNumber(trackingNumber);
  if (!shipment) return null;
  return toPublicTracking(shipment);
}

/**
 * אתחול GPS במוצא כשנוצר משלוח (אם יש קואורדינטות או state ארה״ב).
 */
async function seedOriginGps(shipment) {
  const origin = shipment.addresses?.origin;
  if (!origin) return shipment;

  let lat = origin.coordinates?.latitude;
  let lon = origin.coordinates?.longitude;
  let address = origin.address;

  if ((lat == null || lon == null) && origin.state) {
    const approx = usKnowledge.getStateCoordinates(origin.state);
    if (approx) {
      lat = approx.lat;
      lon = approx.lon;
      address = address || approx.label;
    }
  }

  if (lat == null || lon == null) return shipment;

  shipment.tracking = shipment.tracking || {};
  shipment.tracking.currentLocation = {
    address,
    city: origin.city,
    country: origin.country || 'US',
    coordinates: { latitude: lat, longitude: lon },
    lastUpdated: new Date()
  };
  shipment.tracking.route = [{
    location: { coordinates: { latitude: lat, longitude: lon }, address },
    timestamp: new Date()
  }];

  await shipment.save();
  return shipment;
}

module.exports = {
  toPublicTracking,
  updateGps,
  getTrackingView,
  seedOriginGps,
  buildMapUrls
};
