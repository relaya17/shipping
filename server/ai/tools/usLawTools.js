const { z } = require('zod');
const usKnowledge = require('../knowledge/usShippingLaw');

/**
 * כלי ידע — חוק הובלה ארה״ב + גיאוגרפיה לפי מדינה.
 */
const lookupUsShippingLawTool = {
  description:
    'US shipping law and operations expertise: FMCSA HHG, CBP customs, interstate vs intrastate, weight permits, tax, ' +
    'and state-level operational info (50 states + DC). Must use before giving regulatory advice.',
  parameters: z.object({
    topic: z.enum([
      'fmcsa_hhg',
      'cabotage',
      'customs',
      'interstate_vs_intrastate',
      'weight_permits',
      'sales_tax'
    ]).default('fmcsa_hhg'),
    state: z.string().optional().describe('State code or name, e.g. CA or California')
  }),
  execute: async ({ topic, state }) => usKnowledge.lookup(topic, state)
};

const listUsCorridorsTool = {
  description: 'List of major US highway corridors (I-95, I-10, I-80, etc.) for freight route planning.',
  parameters: z.object({}),
  execute: async () => ({ corridors: usKnowledge.listCorridors() })
};

module.exports = { lookupUsShippingLawTool, listUsCorridorsTool };
