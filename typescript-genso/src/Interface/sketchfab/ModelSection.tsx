import React, { useContext, useEffect, useState } from 'react';
import ModelCard from './DownloadedGLBCard';
import { SketchFabContext } from '../../context/SketchFabContext';
import { Button, IconButton, TextField } from '@mui/material';
import DetailedModelCard from './DetailedCard';
import { IoChevronBack } from "react-icons/io5";
import Loader from '../../Custom/Loader';

export const SketchFabParentComponent: React.FC = () => {
  const { sketchfab_data, fetchData,setQueryParams,queryParams ,loading} = useContext<any>(SketchFabContext);
  const [searchValue, setSearchValue] = useState('');
const [viewDetails,setViewDetails] = useState<boolean>(false);
const [currData,setCurrData]= useState<any>();


  useEffect(() => {
    const handleEnterKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setQueryParams({...queryParams,q:searchValue});
      }
    };

    // Attach the event listener
    document.addEventListener('keydown', handleEnterKeyPress);

    // Cleanup function
    return () => {
      // Remove the event listener to avoid memory leaks
      document.removeEventListener('keydown', handleEnterKeyPress);
    };
  }, [fetchData, searchValue]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleBack=()=>{
   
    setCurrData(null)
    setViewDetails(false);
  }
const handlePagination=()=>{
 setQueryParams({...queryParams,cursor:queryParams.cursor+15});
}
  return (

   <>
   {viewDetails==true?<div>
    <div onClick={handleBack} className='flex items-center'>
        <IconButton>
        <IoChevronBack/>
        </IconButton>
        <p className='text-cyan-800 font-semibold text-left' >Back to search</p>
    </div>
    <DetailedModelCard modelData={currData}/>
   </div>: <div  className=' max-h-[90vh] p-4 overflow-scroll 'style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}   >
      <TextField
        placeholder="Search for assets by name"
        fullWidth
        sx={{ width: '100%' }}
        value={searchValue}
        onChange={handleSearchInputChange}
      />
       
      {loading?<div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
        <Loader size={32} />
      </div>

        : <>
        {sketchfab_data?.map((modelData: any, index: number) => (
        <ModelCard setCurrData={setCurrData} setViewDetails={setViewDetails} key={index} modelData={modelData} />
      ))}
      <Button  onClick={handlePagination} sx={{
          background: "rgb(21 94 117)",
          "&:hover": {
            background: "rgb(21 94 117)",
          },
          color: "white",
          width: "100%",
        }}  >
            Load more
        </Button> </>}

    </div>}
    </>
  );
};
