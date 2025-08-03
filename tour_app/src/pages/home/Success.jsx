import React from 'react'
import { PATH } from '../../constants/Path';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold mb-4 text-green-600">Enquiry Submitted!</h2>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your enquiry. We will contact you soon.
      </p>
      <button
        onClick={() => navigate(PATH.HOME)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Home
      </button>
    </div>
  

  );
}
