import { useState } from "react";
import { useDispatch } from "react-redux";
import { setComparison } from "../redux/comparingQuotesSlice";
import { Button, Form } from "react-bootstrap";

const ComparingQuotes = () => {
  const [comparison, setComparisonValue] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setComparison(comparison));
  };

  return (
    <div className="container mt-4">
      <h2>Comparing Quotes</h2>
      <Form>
        <Form.Group controlId="formComparison">
          <Form.Label>Enter your comparison details</Form.Label>
          <Form.Control
            type="text"
            value={comparison}
            onChange={(e) => setComparisonValue(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Comparison
        </Button>
      </Form>
    </div>
  );
};

export default ComparingQuotes;
