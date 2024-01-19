import React from 'react';
import { Sidebar } from './Sidebar';
import { Nav } from './Nav';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Recents: React.FC = () => {
  const navigate = useNavigate();

  function generateUniqueID(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  const createNewFile = () => {
    navigate(`/file/${generateUniqueID()}`);
  };

  return (
    <div className="w-[100vw] h-[100vh] fixed bg-zinc-900">
      <Nav />
      <div>
        <Sidebar />
      </div>
      <div className="absolute top-40 right-10">
        <Button sx={{color:"white"}} onClick={createNewFile} variant="contained">
          Create New File
        </Button>
      </div>
    </div>
  );
};
