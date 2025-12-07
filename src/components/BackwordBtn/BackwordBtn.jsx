import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const BackwordBtn = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className={`size-8 flex items-center justify-center  bg-main-green text-main-gold rounded-lg hover:bg-main-green/90 transition-colors duration-200 font-medium ${className}`}
    >
      <IoArrowBack size={20} />
    </button>
  );
};

export default BackwordBtn