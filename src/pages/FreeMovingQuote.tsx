import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuote } from "../redux/freeMovingQuoteSlice";
import { Button, Form } from "react-bootstrap";

const FreeMovingQuote = () => {
  const [quote, setQuoteValue] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setQuote(quote));
  };

  return (
    <div className="container mt-4">
      <h2>Free Moving Quote</h2>
      <Form>
        <Form.Group controlId="formQuote">
          <Form.Label>Enter your moving quote</Form.Label>
          <Form.Control
            type="text"
            value={quote}
            onChange={(e) => setQuoteValue(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Quote
        </Button>
      </Form>
    </div>
  );
};

export default FreeMovingQuote;
