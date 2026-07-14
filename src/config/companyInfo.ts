/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH — real business details go here.
 * ============================================================================
 *  Every value below is currently a placeholder ("FILL_ME..."). Search this
 *  file for "FILL_ME" and replace each one with your actual, verified
 *  business information before launching.
 *
 *  Why this matters: US federal law (49 CFR 375.213, enforced by the
 *  Federal Motor Carrier Safety Administration) requires interstate
 *  household-goods movers to display a real, verifiable USDOT number and
 *  operating authority (MC number), and to give consumers links to two
 *  official consumer-protection booklets before booking. Placeholder
 *  numbers like "MC-XXXXXX" are not compliant — customers (and FMCSA) can
 *  and do check these against the public SAFER database.
 *
 *  Once you fill this in, the real values automatically propagate to the
 *  Footer, Contact page, and About page — you only need to edit them once,
 *  here.
 * ============================================================================
 */

export const COMPANY_NAME = 'VIP International Shipping';
export const COMPANY_LEGAL_NAME = 'FILL_ME (registered legal entity name, e.g. "VIP International Shipping LLC")';

export const CONTACT = {
  /** Primary customer-facing phone number, e.g. "+1 (555) 123-4567" */
  phoneDisplay: 'FILL_ME_PHONE',
  /** Same number formatted for tel: links, e.g. "+15551234567" */
  phoneHref: 'FILL_ME_PHONE_HREF',
  /** WhatsApp Business number including country code, digits only, e.g. "15551234567" */
  whatsappNumber: 'FILL_ME_WHATSAPP',
  /** General inbox */
  email: 'FILL_ME_EMAIL',
  /** Support-specific inbox (can be the same as email) */
  supportEmail: 'FILL_ME_SUPPORT_EMAIL',
  /** Privacy/legal inbox (can be the same as email) */
  privacyEmail: 'FILL_ME_PRIVACY_EMAIL',
  address: {
    line1: 'FILL_ME_STREET_ADDRESS',
    city: 'FILL_ME_CITY',
    region: 'FILL_ME_STATE_OR_REGION',
    postalCode: 'FILL_ME_POSTAL_CODE',
    country: 'FILL_ME_COUNTRY',
  },
  hours: 'FILL_ME_BUSINESS_HOURS (e.g. "Mon–Fri 9:00–18:00")',
};

/**
 * Federal / state licensing. Leave a field as an empty string until you
 * have the real, verified number — the UI will show a clear "pending"
 * state instead of a fake placeholder like "MC-XXXXXX".
 */
export const LICENSE = {
  /** USDOT number, digits only, e.g. "1234567". Required for US interstate HHG moves. */
  usdotNumber: '',
  /** FMCSA operating authority (Motor Carrier) number, e.g. "MC-123456". */
  mcNumber: '',
  /** Federal Maritime Commission OTI license number — only if you act as an
   *  ocean freight forwarder / NVOCC for international moves. */
  fmcNumber: '',
  /** State-level intrastate mover license, if applicable (varies by state, e.g. California Cal-T number). */
  stateLicense: '',
};

/** Public FMCSA carrier lookup — auto-links to your USDOT record once filled in above. */
export const SAFER_LOOKUP_URL = LICENSE.usdotNumber
  ? `https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=${LICENSE.usdotNumber}`
  : 'https://safer.fmcsa.dot.gov/CompanySnapshot.aspx';

/**
 * Official FMCSA consumer-protection materials. 49 CFR 375.213 requires
 * interstate movers/brokers to give prospective customers a copy of, or an
 * electronic link to, both of these before the move. Do not remove.
 */
export const FMCSA_CONSUMER_RESOURCES = {
  rightsAndResponsibilities:
    'https://www.fmcsa.dot.gov/sites/fmcsa.dot.gov/files/2023-10/FMCSA_R%26R_Handbook_Web_v1.pdf',
  protectYourMove: 'https://www.fmcsa.dot.gov/protect-your-move',
};
