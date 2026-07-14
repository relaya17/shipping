import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FreeQuoteForm = () => {
  const { t } = useTranslation();
  const [movingFrom, setMovingFrom] = useState('');
  const [movingTo, setMovingTo] = useState('');
  const [quote, setQuote] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!movingFrom || !movingTo) {
      alert('Please fill in both location fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/get-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movingFrom, movingTo }),
      });

      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      console.error('Error contacting the server:', error);
    }
  };

  return (
    <main id="main-content">
      <div className="container mt-5">
        <h2>{t('hero.cta_primary')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="movingFrom" className="form-label">{t('forms.from_location')}</label>
            <input
              type="text"
              className="form-control"
              id="movingFrom"
              value={movingFrom}
              onChange={(e) => setMovingFrom(e.target.value)}
              placeholder="Enter location"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="movingTo" className="form-label">{t('forms.to_location')}</label>
            <input
              type="text"
              className="form-control"
              id="movingTo"
              value={movingTo}
              onChange={(e) => setMovingTo(e.target.value)}
              placeholder="Enter location"
            />
          </div>
          <button type="submit" className="btn btn-primary">{t('common.submit')}</button>
        </form>
        {quote && <p>{quote}</p>}
      </div>
    </main>
  );
};

export default FreeQuoteForm;
