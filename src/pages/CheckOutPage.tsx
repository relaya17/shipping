// src/components/CheckOutPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RootState } from '../redux/store'; // הייבוא של הסטור
import { clearCart } from '../redux/cartSlice'; // אקשן לנקות את העגלה

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

 // src/components/CheckOutPage.tsx
const customerName = useSelector((state: RootState) => state.cart.customerName);
const customerPhone = useSelector((state: RootState) => state.cart.customerPhone);
const cartItems = useSelector((state: RootState) => state.cart.items);
const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  useEffect(() => {
    if (!customerName || !customerPhone) {
      navigate('/CheckoutPage'); // אם אין פרטי לקוח, מנתב חזרה לדף הקודם
    }
  }, [navigate, customerName, customerPhone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // איפוס השגיאה
  
    // בדיקת שדות חובה
    if (!cardNumber || !expiryDate || !cvv) {
      setError('כל השדות של כרטיס האשראי חייבים להיות מלאים');
      return;
    }
  
    // בדיקת תוקף כרטיס
    const expiryParts = expiryDate.split('/');
    const expiryMonth = parseInt(expiryParts[0], 10);
    const expiryYear = parseInt(expiryParts[1], 10);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;
  
    if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
      setError('תוקף הכרטיס פג');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      // שמירה של פרטי כרטיס האשראי ב-localStorage
      localStorage.setItem('creditCardInfo', JSON.stringify({ cardNumber, expiryDate, cvv }));
  
      // שמירה של ההזמנה והעגלה ב-localStorage (אפשרות לשימוש בעת הצורך)
      localStorage.setItem('orderDetails', JSON.stringify({ cartItems, totalPrice }));
  
      // שליחה של פעולה לנקות את העגלה
      dispatch(clearCart());
  
      alert('ההזמנה הושלמה בהצלחה!');
      navigate('/thank-you');
    } catch (error) {
      setError('אירעה שגיאה בתהליך התשלום, אנא נסה שנית.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '600px' }} dir="rtl">
        <h2 className="text-center mb-4 font-weight-bold" style={{ color: 'rgba(119, 117, 10, 0.8)', fontSize: '2rem' }}>
          דף תשלום בכרטיס אשראי
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {customerName && customerPhone && (
          <div className="alert alert-info mb-4">
            <h4>פרטי הלקוח:</h4>
            <p><strong>שם:</strong> {customerName}</p>
            <p><strong>טלפון:</strong> {customerPhone}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">מספר כרטיס אשראי</label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              placeholder="הכנס את מספר כרטיס האשראי"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              pattern="[\d| ]{16,22}"
              maxLength={19}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="expiryDate" className="form-label">תוקף (MM/YY)</label>
            <input
              type="text"
              className="form-control"
              id="expiryDate"
              placeholder="הכנס את תוקף הכרטיס (MM/YY)"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cvv" className="form-label">CVV</label>
            <input
              type="text"
              className="form-control"
              id="cvv"
              placeholder="הכנס את קוד ה-CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              maxLength={3}
            />
          </div>

          <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
            {isSubmitting ? 'בבקשה המתן...' : 'השלם הזמנה'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
