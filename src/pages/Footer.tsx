import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { UniversalAccess, ShieldCheck, FileText, Envelope, Telephone, InfoCircle } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { ROUTES } from '../routs/routes';
import { CONTACT, LICENSE, SAFER_LOOKUP_URL, FMCSA_CONSUMER_RESOURCES } from '../config/companyInfo';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row className="mb-4">
          {/* Company Info */}
          <Col md={3} className="mb-4">
            <h5 className="fw-bold mb-3">VIP International Shipping</h5>
            <p className="small">
              {t('footer.description')}
            </p>
            <div className="mb-2">
              <Telephone className="me-2" size={16} />
              <a href={`tel:${CONTACT.phoneHref}`} className="text-light text-decoration-none">
                {CONTACT.phoneDisplay}
              </a>
            </div>
            <div>
              <Envelope className="me-2" size={16} />
              <a href={`mailto:${CONTACT.email}`} className="text-light text-decoration-none">
                {CONTACT.email}
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={3} className="mb-4">
            <h6 className="fw-bold mb-3">{t('footer.quick_links')}</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to={ROUTES.HOME} className="text-light text-decoration-none hover-underline">
                  {t('nav.home')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to={ROUTES.ABOUT} className="text-light text-decoration-none hover-underline">
                  {t('nav.about')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to={ROUTES.MOVING_SERVICES} className="text-light text-decoration-none hover-underline">
                  {t('nav.services')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to={ROUTES.FREE_MOVING_QUOTE} className="text-light text-decoration-none hover-underline">
                  {t('nav.quote')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to={ROUTES.CONTACT} className="text-light text-decoration-none hover-underline">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </Col>

          {/* Services */}
          <Col md={3} className="mb-4">
            <h6 className="fw-bold mb-3">{t('footer.services')}</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to={ROUTES.INTERNATIONAL_HOUSEHOLD_MOVERS} className="text-light text-decoration-none hover-underline">
                  {t('services.household')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to={ROUTES.INTERNATIONAL_CAR_SHIPPING} className="text-light text-decoration-none hover-underline">
                  {t('services.vehicle')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to={ROUTES.PACKING_SERVICE} className="text-light text-decoration-none hover-underline">
                  {t('services.packing')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to={ROUTES.MOVING_INSURANCE} className="text-light text-decoration-none hover-underline">
                  {t('services.insurance')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to={ROUTES.OVERSEAS_ARTWORK_SHIPPING} className="text-light text-decoration-none hover-underline">
                  {t('services.artwork')}
                </Link>
              </li>
            </ul>
          </Col>

          {/* Legal */}
          <Col md={3} className="mb-4">
            <h6 className="fw-bold mb-3">{t('footer.legal')}</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to={ROUTES.PRIVACY_POLICY} className="text-light text-decoration-none hover-underline">
                  <ShieldCheck size={14} className="me-1" />
                  {t('footer.privacy')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to={ROUTES.TERMS_OF_SERVICE} className="text-light text-decoration-none hover-underline">
                  <FileText size={14} className="me-1" />
                  {t('footer.terms')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to={ROUTES.ACCESSIBILITY} className="text-light text-decoration-none hover-underline">
                  <UniversalAccess size={14} className="me-1" />
                  {t('footer.accessibility')}
                </Link>
              </li>
              <li className="mb-2">
                <a
                  href={FMCSA_CONSUMER_RESOURCES.rightsAndResponsibilities}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none hover-underline"
                >
                  <InfoCircle size={14} className="me-1" />
                  {t('footer.fmcsa_rights')}
                </a>
              </li>
              <li className="mb-2">
                <a
                  href={FMCSA_CONSUMER_RESOURCES.protectYourMove}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none hover-underline"
                >
                  <InfoCircle size={14} className="me-1" />
                  {t('footer.fmcsa_protect')}
                </a>
              </li>
            </ul>
            <div className="mt-3">
              <LanguageSelector />
            </div>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <Row className="pt-3 border-top border-secondary">
          <Col className="text-center">
            <small>
              © {new Date().getFullYear()} VIP International Shipping. {t('footer.copyright')}
            </small>
            <br />
            <small className="text-muted">
              {LICENSE.usdotNumber || LICENSE.mcNumber ? (
                <>
                  {t('footer.licensed_insured')}
                  {LICENSE.usdotNumber && ` | USDOT ${LICENSE.usdotNumber}`}
                  {LICENSE.mcNumber && ` | ${LICENSE.mcNumber}`}
                  {' '}
                  <a href={SAFER_LOOKUP_URL} target="_blank" rel="noopener noreferrer" className="text-muted">
                    {t('footer.verify_safer')}
                  </a>
                </>
              ) : (
                <>
                  {t('footer.licensing_pending')}{' '}
                  <a href={SAFER_LOOKUP_URL} target="_blank" rel="noopener noreferrer" className="text-muted">
                    {t('footer.verify_before_booking')}
                  </a>
                </>
              )}
            </small>
          </Col>
        </Row>
      </Container>

      <style>{`
        .hover-underline:hover {
          text-decoration: underline !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
