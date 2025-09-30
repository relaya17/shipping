import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setMessage, setMovingDate } from '../redux/moveSlice';

const WorldwideMoving = () => {
  const dispatch = useDispatch<AppDispatch>();
  const message = useSelector((state: RootState) => state.move.message);
  const movingDate = useSelector((state: RootState) => state.move.movingDate);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setMessage('Worldwide moving services are available!'));
      dispatch(setMovingDate('2025-03-15'));
      setLoading(false);
    }, 2000);
  }, [dispatch]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Worldwide Moving Services</h2>
          <p className="card-text">{message}</p>
          <p className="card-text">Moving Date: {movingDate}</p>
          <ul>
            <li>Door-to-door service</li>
            <li>International shipping options</li>
            <li>Customs assistance</li>
            <li>Tracking your shipment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorldwideMoving;
