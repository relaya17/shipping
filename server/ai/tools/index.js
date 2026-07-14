const { getQuoteTool, createQuoteTool, writeQuoteProposalTool } = require('./quoteTools');
const { trackShipmentTool, updateShipmentGpsTool } = require('./shipmentTools');
const { lookupUsShippingLawTool, listUsCorridorsTool } = require('./usLawTools');

module.exports = {
  getQuote: getQuoteTool,
  createQuote: createQuoteTool,
  writeQuoteProposal: writeQuoteProposalTool,
  trackShipment: trackShipmentTool,
  updateShipmentGps: updateShipmentGpsTool,
  lookupUsShippingLaw: lookupUsShippingLawTool,
  listUsCorridors: listUsCorridorsTool
};
