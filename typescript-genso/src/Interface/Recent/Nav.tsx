import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Nav: React.FC = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="p-4 overflow-hidden bg-zinc-800 w-full h-20">
      <img
        onClick={handleHome}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/2048px-Home-icon.svg.png"
        className="cursor-pointer h-full w-auto"
        alt="Home"
      />
    </div>
  );
};
