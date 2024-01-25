import React from 'react';

interface ModelData {
  uri: string;
  name: string;
  thumbnails: {
    images: {
      uid: string;
      size: number;
      width: number;
      url: string;
      height: number;
    }[];
  };
}

interface ModelCardProps {
  modelData: ModelData;
  setViewDetails:any;
  setCurrData:any
}

const ModelCard: React.FC<ModelCardProps> = ({ modelData,setViewDetails,setCurrData }) => {
  const { name, thumbnails } = modelData;
  const thumbnailUrl = thumbnails.images[0].url; // Assuming the first image is the main thumbnail

  return (
    <div onClick={()=>{
        setViewDetails(true)
        setCurrData(modelData)
    }} className='cursor-pointer !my-2'  style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
      <img src={thumbnailUrl} alt={name} style={{ width: '100%', height: 'auto' }} />
      <h2 className='text-black'>{name}</h2>
    </div>
  );
};

export default ModelCard;
