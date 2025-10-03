import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MovingQuoteForm: React.FC = () => {
  const [movingFrom, setMovingFrom] = useState('');
  const [movingTo, setMovingTo] = useState('');
  const [quote, setQuote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder logic to generate a quote (can be expanded)
    if (movingFrom && movingTo) {
      setQuote(`Your moving quote from ${movingFrom} to ${movingTo} is $500.00`);
    } else {
      setQuote('Please fill out both fields.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Fill out the form for your free quote</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="movingFrom" className="form-label">Moving From</label>
          <input
            type="text"
            className="form-control"
            id="movingFrom"
            placeholder="Enter location"
            value={movingFrom}
            onChange={(e) => setMovingFrom(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="movingTo" className="form-label">Moving To</label>
          <input
            type="text"
            className="form-control"
            id="movingTo"
            placeholder="Enter location"
            value={movingTo}
            onChange={(e) => setMovingTo(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Get Quote</button>
      </form>

      {quote && (
        <div className="mt-4">
          <h4>Quote:</h4>
          <p>{quote}</p>
        </div>
      )}
    </div>
  );
};

export default MovingQuoteForm;
