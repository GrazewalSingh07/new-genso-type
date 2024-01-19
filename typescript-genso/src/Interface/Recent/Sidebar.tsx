import { MenuList, MenuItem } from '@mui/material';
import React from 'react';

export const Sidebar: React.FC = () => {
  return (
    <div className='max-w-[20%]'>
      <MenuList>
        <MenuItem>Recently opened</MenuItem>
        <MenuItem>Saved</MenuItem>
        {/* Add more menu items as needed */}
      </MenuList>
    </div>
  );
};
