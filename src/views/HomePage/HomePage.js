import { useState, useEffect } from 'react';
import Loader from 'components/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomePage() {
  const [status, setStatus] = useState(Status.IDLE);

  return(
    <div>
      <h1>Trending today</h1>
      {/* {status === Status.PENDING && <Loader />} */}
    </div>
  )
}
