import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDetails } from "../redux/motorcycleToEuropeSlice";
import { Button, Form } from "react-bootstrap";

const MotorcycleToEurope = () => {
  const [details, setDetailsValue] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setDetails(details));
  };

  return (
    <div className="container mt-4">
      <h2>Motorcycle to Europe</h2>
      <Form>
        <Form.Group controlId="formDetails">
          <Form.Label>Enter Motorcycle Details</Form.Label>
          <Form.Control
            type="text"
            value={details}
            onChange={(e) => setDetailsValue(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Details
        </Button>
      </Form>
    </div>
  );
};

export default MotorcycleToEurope;
