import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../redux/store';
import { clearCart } from '../redux/cartSlice';
import { useAuth } from '../hooks/useAuth';
import api from '../service/api';

type InvoiceAmounts = {
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
};

type Invoice = {
  _id: string;
  invoiceNumber: string;
  status: string;
  amounts: InvoiceAmounts;
  tax?: {
    country?: string;
    state?: string;
    rate?: number;
    jurisdiction?: string;
    notes?: string;
  };
  customer?: { name?: string; email?: string };
  lineItems?: Array<{ description: string; quantity: number; unitPrice: number; total: number }>;
};

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'
];

/** Secure Stripe Checkout — no card data on this site (PCI). */
const CheckoutPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user } = useAuth();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const customerName = useSelector((state: RootState) => state.cart.customerName);

  const invoiceIdParam = searchParams.get('invoiceId') || '';
  const statusParam = searchParams.get('status') || '';

  const [invoiceId, setInvoiceId] = useState(invoiceIdParam);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [country, setCountry] = useState('US');
  const [stateCode, setStateCode] = useState('CA');
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [stripeConfigured, setStripeConfigured] = useState(false);

  const loadConfig = useCallback(async () => {
    try {
      const { data } = await api.get<{ success: boolean; stripeConfigured: boolean }>('/billing/config');
      setStripeConfigured(Boolean(data.stripeConfigured));
    } catch {
      setStripeConfigured(false);
    }
  }, []);

  const loadInvoice = useCallback(async (id: string) => {
    const { data } = await api.get<{ success: boolean; invoice: Invoice }>(`/billing/${id}`);
    setInvoice(data.invoice);
    if (data.invoice.tax?.country) setCountry(data.invoice.tax.country);
    if (data.invoice.tax?.state) setStateCode(data.invoice.tax.state);
  }, []);

  const loadMyInvoices = useCallback(async () => {
    const { data } = await api.get<{ success: boolean; invoices: Invoice[] }>('/billing');
    const unpaid = (data.invoices || []).filter((inv) => inv.status !== 'paid' && inv.status !== 'void');
    setInvoices(unpaid);
    if (!invoiceId && unpaid[0]) setInvoiceId(unpaid[0]._id);
  }, [invoiceId]);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  useEffect(() => {
    if (statusParam === 'success') {
      setInfo(t('checkout.payment_success'));
      dispatch(clearCart());
    } else if (statusParam === 'cancel') {
      setError(t('checkout.payment_cancel'));
    }
  }, [statusParam, dispatch, t]);

  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      try {
        setLoading(true);
        setError('');
        if (invoiceIdParam) {
          setInvoiceId(invoiceIdParam);
          await loadInvoice(invoiceIdParam);
        } else {
          await loadMyInvoices();
        }
      } catch {
        setError(t('checkout.load_error'));
      } finally {
        setLoading(false);
      }
    })();
  }, [isAuthenticated, invoiceIdParam, loadInvoice, loadMyInvoices, t]);

  useEffect(() => {
    if (!invoiceId || !isAuthenticated || invoiceIdParam) return;
    (async () => {
      try {
        await loadInvoice(invoiceId);
      } catch {
        setError(t('checkout.load_error'));
      }
    })();
  }, [invoiceId, isAuthenticated, invoiceIdParam, loadInvoice, t]);

  const applyTax = async () => {
    if (!invoiceId) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post<{ success: boolean; invoice: Invoice }>(`/billing/${invoiceId}/tax`, {
        country,
        state: country === 'US' ? stateCode : undefined,
        line1,
        city,
        postalCode
      });
      setInvoice(data.invoice);
      setInfo(t('checkout.tax_updated'));
    } catch {
      setError(t('checkout.tax_failed'));
    } finally {
      setLoading(false);
    }
  };

  const payWithStripe = async () => {
    if (!invoiceId) {
      setError(t('checkout.select_invoice'));
      return;
    }
    setLoading(true);
    setError('');
    try {
      const taxRes = await api.post<{ success: boolean; invoice: Invoice }>(`/billing/${invoiceId}/tax`, {
        country,
        state: country === 'US' ? stateCode : undefined,
        line1,
        city,
        postalCode
      });
      setInvoice(taxRes.data.invoice);

      const { data } = await api.post<{ success: boolean; checkoutUrl: string }>(`/billing/${invoiceId}/checkout`);
      if (!data.checkoutUrl) {
        setError(t('checkout.no_checkout_url'));
        return;
      }
      window.location.href = data.checkoutUrl;
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      setError(axiosErr.response?.data?.error || t('checkout.checkout_failed'));
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = async () => {
    if (!invoiceId) return;
    try {
      const response = await api.get<Blob>(`/billing/${invoiceId}/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `${invoice?.invoiceNumber || 'invoice'}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      setError(t('checkout.pdf_failed'));
    }
  };

  if (!isAuthenticated) {
    return (
      <main id="main-content" className="container py-5">
        <div className="alert alert-warning" role="alert">
          {t('checkout.login_required')}
          <div className="mt-3">
            <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>
              {t('checkout.go_home')}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="container py-5" style={{ maxWidth: 720 }}>
      <h1 className="mb-4">{t('checkout.title')}</h1>
      <p className="text-muted">{t('checkout.subtitle')}</p>

      {user && (
        <div className="alert alert-light border">
          {t('checkout.signed_in_as')} {user.firstName} {user.lastName} ({user.email})
        </div>
      )}

      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {info && <div className="alert alert-success" role="status">{info}</div>}

      {!stripeConfigured && <div className="alert alert-warning">{t('checkout.stripe_missing')}</div>}

      {cartItems?.length > 0 && (
        <div className="alert alert-info">
          {t('checkout.cart_note')} ({cartItems.length} items, {totalPrice}
          {customerName ? `, ${customerName}` : ''})
        </div>
      )}

      <div className="mb-3">
        <label className="form-label" htmlFor="invoiceSelect">{t('checkout.invoice_label')}</label>
        {invoices.length > 0 ? (
          <select
            id="invoiceSelect"
            className="form-select"
            value={invoiceId}
            onChange={(e) => setInvoiceId(e.target.value)}
          >
            {invoices.map((inv) => (
              <option key={inv._id} value={inv._id}>
                {inv.invoiceNumber} — {inv.amounts.totalAmount} {inv.amounts.currency} ({inv.status})
              </option>
            ))}
          </select>
        ) : (
          <input
            id="invoiceSelect"
            className="form-control"
            placeholder={t('checkout.invoice_placeholder')}
            value={invoiceId}
            onChange={(e) => setInvoiceId(e.target.value)}
          />
        )}
      </div>

      {invoice && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h2 className="h5 card-title">{invoice.invoiceNumber}</h2>
            <p className="mb-1">{t('checkout.status')}: <strong>{invoice.status}</strong></p>
            <p className="mb-1">
              {t('checkout.customer')}: {invoice.customer?.name} ({invoice.customer?.email})
            </p>
            <ul className="mb-2">
              {(invoice.lineItems || []).map((item, idx) => (
                <li key={`${item.description}-${idx}`}>
                  {item.description} — {item.total} {invoice.amounts.currency}
                </li>
              ))}
            </ul>
            <p className="mb-0">{t('checkout.subtotal')}: {invoice.amounts.subtotal} {invoice.amounts.currency}</p>
            <p className="mb-0">
              {t('checkout.tax')} ({invoice.tax?.jurisdiction || '—'}
              {invoice.tax?.rate != null ? ` @ ${(invoice.tax.rate * 100).toFixed(2)}%` : ''}):{' '}
              {invoice.amounts.taxAmount} {invoice.amounts.currency}
            </p>
            <p className="fw-bold fs-5 mt-2">
              {t('checkout.amount_due')}: {invoice.amounts.totalAmount} {invoice.amounts.currency}
            </p>
          </div>
        </div>
      )}

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h5 card-title">{t('checkout.billing_address')}</h2>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="country">{t('checkout.country')}</label>
              <select id="country" className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="US">{t('checkout.united_states')}</option>
                <option value="IL">{t('checkout.israel')}</option>
              </select>
            </div>
            {country === 'US' && (
              <div className="col-md-6">
                <label className="form-label" htmlFor="state">{t('checkout.state')}</label>
                <select id="state" className="form-select" value={stateCode} onChange={(e) => setStateCode(e.target.value)}>
                  {US_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="col-12">
              <label className="form-label" htmlFor="line1">{t('checkout.street')}</label>
              <input id="line1" className="form-control" value={line1} onChange={(e) => setLine1(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="city">{t('checkout.city')}</label>
              <input id="city" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="postal">{t('checkout.postal')}</label>
              <input id="postal" className="form-control" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            </div>
          </div>
          <button type="button" className="btn btn-outline-secondary mt-3" onClick={applyTax} disabled={loading || !invoiceId}>
            {t('checkout.recalc_tax')}
          </button>
        </div>
      </div>

      <div className="d-grid gap-2">
        <button
          type="button"
          className="btn btn-success btn-lg"
          onClick={payWithStripe}
          disabled={loading || !invoiceId || invoice?.status === 'paid' || !stripeConfigured}
        >
          {loading ? t('checkout.redirecting') : t('checkout.pay_stripe')}
        </button>
        <button type="button" className="btn btn-outline-primary" onClick={downloadPdf} disabled={!invoiceId}>
          {t('checkout.download_pdf')}
        </button>
      </div>
    </main>
  );
};

export default CheckoutPage;
