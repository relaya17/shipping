import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setComparison } from '../redux/comparingQuotesSlice';
import { Button, Container, Form } from 'react-bootstrap';
import LinkButton from '../components/LinkButton';
import { ROUTES } from '../routs/routes';

const ComparingQuotes = () => {
  const { t } = useTranslation();
  const [comparison, setComparisonValue] = useState<string>('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setComparison(comparison));
  };

  return (
    <main id="main-content">
      <Container className="my-5">
        <h1 className="mb-3">{t('pages.stubs.comparing.title')}</h1>
        <p className="lead text-muted mb-4">{t('pages.stubs.comparing.body')}</p>
        <Form className="mb-4">
          <Form.Group controlId="formComparison" className="mb-3">
            <Form.Label>{t('forms.message')}</Form.Label>
            <Form.Control
              type="text"
              value={comparison}
              onChange={(e) => setComparisonValue(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit} className="me-2">
            {t('common.submit')}
          </Button>
          <LinkButton to={ROUTES.FREE_MOVING_QUOTE} variant="outline-primary">
            {t('cta.get_quote')}
          </LinkButton>
        </Form>
      </Container>
    </main>
  );
};

export default ComparingQuotes;
