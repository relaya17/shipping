import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setMovingData, setQuote } from '../src/redux/moveSlice';

const MovingForm: React.FC = () => {
  const { t } = useTranslation();
  const [movingFrom, setMovingFrom] = useState('');
  const [movingTo, setMovingTo] = useState('');
  const [quote, setQuoteState] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!movingFrom || !movingTo) {
      alert('Please fill in both location fields');
      return;
    }

    dispatch(setMovingData({ movingFrom, movingTo }));

    const calculatedQuote = `Your quote: $${Math.floor(Math.random() * 1000)}`;
    dispatch(setQuote(calculatedQuote));

    setQuoteState(calculatedQuote);

    try {
      const response = await fetch('https://your-backend-api-url.com/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movingFrom,
          movingTo,
        }),
      });

      if (response.ok) {
        console.log('Data sent successfully');
      } else {
        console.error('An error occurred while saving');
      }
    } catch (error) {
      console.error('Error contacting the server:', error);
    }
  };

  return (
    <main id="main-content">
      <div className="container">
        <h1>Moving Quote Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="movingFrom" className="form-label">{t('forms.from_location')}</label>
            <input
              type="text"
              className="form-control"
              id="movingFrom"
              value={movingFrom}
              onChange={(e) => setMovingFrom(e.target.value)}
              required
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
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {t('cta.get_quote')}
          </button>
        </form>

        {quote && (
          <div className="alert alert-info mt-3">
            <strong>Your quote:</strong> {quote}
          </div>
        )}
      </div>
    </main>
  );
};

export default MovingForm;
