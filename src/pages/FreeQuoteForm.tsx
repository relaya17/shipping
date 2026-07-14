// src/components/FreeQuoteForm.tsx
import React, { useState } from 'react';

const FreeQuoteForm = () => {
  const [movingFrom, setMovingFrom] = useState('');
  const [movingTo, setMovingTo] = useState('');
  const [quote, setQuote] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!movingFrom || !movingTo) {
      alert('שדות המיקומים לא מלאים');
      return;
    }

    // שליחה ל-API לצורך קבלת הצעת מחיר
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
      console.error('שגיאה בשיחה עם השרת:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>הצעת מחיר חינם</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="movingFrom" className="form-label">מיקום ממנה אתה עובר</label>
          <input
            type="text"
            className="form-control"
            id="movingFrom"
            value={movingFrom}
            onChange={(e) => setMovingFrom(e.target.value)}
            placeholder="הכנס מיקום"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="movingTo" className="form-label">מיקום אליה אתה עובר</label>
          <input
            type="text"
            className="form-control"
            id="movingTo"
            value={movingTo}
            onChange={(e) => setMovingTo(e.target.value)}
            placeholder="הכנס מיקום"
          />
        </div>
        <button type="submit" className="btn btn-primary">שלח</button>
      </form>
      {quote && <p>{quote}</p>}
    </div>
  );
};

export default FreeQuoteForm;
