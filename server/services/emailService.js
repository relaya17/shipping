/**
 * Transactional email via nodemailer.
 * Configure EMAIL_USER + EMAIL_PASS (or SMTP_*). No-ops with a clear log when unset.
 */
const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);

  if (!user || !pass) {
    return null;
  }

  transporter = host
    ? nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
      })
    : nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: { user, pass }
      });

  return transporter;
}

async function sendMail({ to, subject, text, html }) {
  const tx = getTransporter();
  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@vipshipping.local';

  if (!tx) {
    console.warn('[emailService] EMAIL_USER/EMAIL_PASS not set — skipping send:', subject, '→', to);
    return { skipped: true, reason: 'Email not configured' };
  }

  const info = await tx.sendMail({ from, to, subject, text, html });
  return { skipped: false, messageId: info.messageId };
}

async function sendQuoteConfirmation({ to, name, quoteId, estimateMin, estimateMax }) {
  const subject = 'Your VIP International Shipping quote request';
  const text = [
    `Hi ${name || 'there'},`,
    '',
    'Thanks for requesting a free moving quote.',
    quoteId ? `Reference: ${quoteId}` : null,
    estimateMin != null && estimateMax != null
      ? `Estimated range: $${Number(estimateMin).toLocaleString()} – $${Number(estimateMax).toLocaleString()}`
      : null,
    '',
    'A specialist will contact you shortly.',
    '',
    '— VIP International Shipping'
  ]
    .filter(Boolean)
    .join('\n');

  return sendMail({
    to,
    subject,
    text,
    html: `<p>${text.replace(/\n/g, '<br/>')}</p>`
  });
}

async function sendPaymentReceipt({ to, name, invoiceId, amount, currency = 'USD' }) {
  const subject = `Payment received — invoice ${invoiceId || ''}`.trim();
  const text = [
    `Hi ${name || 'there'},`,
    '',
    'We received your payment.',
    invoiceId ? `Invoice: ${invoiceId}` : null,
    amount != null ? `Amount: ${currency} ${Number(amount).toLocaleString()}` : null,
    '',
    'Thank you for choosing VIP International Shipping.'
  ]
    .filter(Boolean)
    .join('\n');

  return sendMail({
    to,
    subject,
    text,
    html: `<p>${text.replace(/\n/g, '<br/>')}</p>`
  });
}

async function sendTrackingUpdate({ to, name, trackingNumber, status, eta }) {
  const subject = `Shipment update${trackingNumber ? ` — ${trackingNumber}` : ''}`;
  const text = [
    `Hi ${name || 'there'},`,
    '',
    trackingNumber ? `Tracking: ${trackingNumber}` : null,
    status ? `Status: ${status}` : null,
    eta ? `Estimated delivery: ${eta}` : null,
    '',
    'Track anytime on our website.',
    '',
    '— VIP International Shipping'
  ]
    .filter(Boolean)
    .join('\n');

  return sendMail({
    to,
    subject,
    text,
    html: `<p>${text.replace(/\n/g, '<br/>')}</p>`
  });
}

module.exports = {
  sendMail,
  sendQuoteConfirmation,
  sendPaymentReceipt,
  sendTrackingUpdate
};
