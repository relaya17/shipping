import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'; // Import of RootState
import { setProcessInfo } from '../redux/customsSlice'; // Import of the action

const CustomsInspection: React.FC = () => {
  const dispatch = useDispatch();
  const processInfo = useSelector((state: RootState) => state.customs.processInfo);

  // אם תרצה לעדכן את המידע ברידוק בהתחלה
  useEffect(() => {
    dispatch(setProcessInfo('The customs inspection process is underway.'));
  }, [dispatch]);

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card" style={{ width: '80%', maxWidth: '800px' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Customs Inspection Preparation</h2>
          <p className="card-text">{processInfo}</p>
          <p>Once your shipment arrives in the USA, it will undergo a customs inspection process. The steps include:</p>
          <ul>
            <li>Review of all documentation to ensure it is completed properly.</li>
            <li>Physical inspection of your shipment (if selected for random screening).</li>
            <li>Assessment of any duties and taxes (if applicable).</li>
          </ul>
          <p>To avoid delays, make sure your packing list is accurate and avoid including restricted items.</p>
        </div>
      </div>
    </div>
  );
};

export default CustomsInspection;
