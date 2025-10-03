import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setMessage } from '../redux/trustedMovingCompanySlice';  // ייבוא האקשן

const TrustedMovingCompany: React.FC = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: { trustedMovingCompany: { message: string } }) => state.trustedMovingCompany.message);

  useEffect(() => {
    // חיבור לשרת כדי למשוך את המידע
    axios.get('http://localhost:5000/api/customs')
      .then(response => {
        const responseData = response.data as { message: string };
        dispatch(setMessage(responseData.message));  // עדכון המידע בסטור
      })
      .catch(error => {
        console.error('Error fetching process information:', error);
        dispatch(setMessage('Error fetching process information.'));
      });
  }, [dispatch]);

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card" style={{ width: '80%', maxWidth: '800px' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Working with a Trusted Moving Company</h2>
          <p className="card-text">{message}</p>  {/* הצגת המידע מהסטור */}
          <p>Working with an experienced moving company can ease your customs process:</p>
          <ul>
            <li>Assistance in preparing the documentation correctly.</li>
            <li>Proper packing and labeling to meet customs requirements.</li>
            <li>Customs broker services (if required).</li>
          </ul>
          <p>To avoid delays, ensure your moving company has the necessary experience and expertise.</p>
        </div>
      </div>
    </div>
  );
};

export default TrustedMovingCompany;
