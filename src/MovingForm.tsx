// src/components/MovingForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMovingData, setQuote } from '../src/redux/moveSlice';
import { RootState } from '../src/redux/store';
import { useSelector } from 'react-redux';

const MovingForm: React.FC = () => {
  const [movingFrom, setMovingFrom] = useState('');
  const [movingTo, setMovingTo] = useState('');
  const [quote, setQuoteState] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!movingFrom || !movingTo) {
      alert('שדות המיקומים לא מלאים');
      return;
    }

    // שליחת הנתונים ל-Redux
    dispatch(setMovingData({ movingFrom, movingTo }));

    // חישוב הצעת המחיר
    const calculatedQuote = `ההצעה שלך: ${Math.floor(Math.random() * 1000)} דולר`;
    dispatch(setQuote(calculatedQuote));

    setQuoteState(calculatedQuote);

    // שליחה לשרת
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
        console.log('הנתונים נשלחו בהצלחה');
      } else {
        console.error('אירעה שגיאה בשמירה');
      }
    } catch (error) {
      console.error('שגיאה בשיחה עם השרת:', error);
    }
  };

  return (
    <div className="container">
      <h1>טופס הצעת מחיר להובלה</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="movingFrom" className="form-label">מיקום יוצא</label>
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
          <label htmlFor="movingTo" className="form-label">מיקום הגעה</label>
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
          קבל הצעת מחיר
        </button>
      </form>

      {quote && (
        <div className="alert alert-info mt-3">
          <strong>הצעת המחיר שלך:</strong> {quote}
        </div>
      )}
    </div>
  );
};

export default MovingForm;
