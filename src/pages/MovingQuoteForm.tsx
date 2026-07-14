import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

const MovingQuoteForm: React.FC = () => {
  const { t } = useTranslation();
  const [movingFrom, setMovingFrom] = useState('');
  const [movingTo, setMovingTo] = useState('');
  const [quote, setQuote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (movingFrom && movingTo) {
      setQuote(t('forms.quote_result', { from: movingFrom, to: movingTo }));
    } else {
      setQuote(t('forms.fill_locations'));
    }
  };

  return (
    <main id="main-content">
      <div className="container mt-5">
        <h2>{t('forms.fill_quote_title')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="movingFrom" className="form-label">{t('forms.from_location')}</label>
            <input
              type="text"
              className="form-control"
              id="movingFrom"
              placeholder={t('forms.enter_location')}
              value={movingFrom}
              onChange={(e) => setMovingFrom(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="movingTo" className="form-label">{t('forms.to_location')}</label>
            <input
              type="text"
              className="form-control"
              id="movingTo"
              placeholder={t('forms.enter_location')}
              value={movingTo}
              onChange={(e) => setMovingTo(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">{t('cta.get_quote')}</button>
        </form>

        {quote && (
          <div className="mt-4">
            <h4>{t('forms.quote_label')}</h4>
            <p>{quote}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default MovingQuoteForm;
