import { Button } from "@mui/material";
import React, { useContext } from "react";
import { SketchFabContext } from "../../context/SketchFabContext";
import { TbProgress } from "react-icons/tb";

interface ModelCardProps {
  modelData: {
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
    user: {
      displayName: string;
      avatar: {
        images: {
          size: number;
          width: number;
          url: string;
          height: number;
        }[];
      };
    };
    archives: {
      glb: {
        size: number;
        faceCount: number;
        vertexCount: number;
      };
    };
    license: {
      label: string;
    };
    embedUrl: string;
    viewerUrl: string;
    uri:string
  };
}

const DetailedModelCard: React.FC<ModelCardProps> = ({ modelData }) => {
  const { name, thumbnails, user, archives, license, viewerUrl } = modelData;
  const thumbnailUrl =
    thumbnails.images.length > 0 ? thumbnails.images[0].url : "";
  function bytesToMB(bytes: number): number {
    return +(bytes / (1024 * 1024)).toFixed(2);
  }
  
  const {handleImport,downloading}= useContext<any>(SketchFabContext)
  return (
    <div className="flex-col items-left">
      <div className="py-2">
        <h2 className="text-black font-semibold text-left">{name}</h2>
        <p className="text-black text-sm text-left">By: {user.displayName}</p>
      </div>

      <img className="min-h-[200px]" src={thumbnailUrl} alt={name} />

      <p className="text-black pt-2 text-left">
        License:
        <br /> <b>{license.label}</b> <br />
        Author must be credited. No commercial use. Modified versions must have
        the same license.
      </p>

      <div className="mt-5">
        <p className="text-gray-500 text-left py-2 text-sm">
          Model Information
        </p>
        <div className="flex flex-col w-full">
          <div className="flex justify-between mb-2">
            <p className="text-black text-left">GLB Size:</p>
            <p className="text-black text-right">
              {bytesToMB(archives.glb.size)} MB
            </p>
          </div>

          <div className="flex justify-between mb-2">
            <p className="text-black text-left">Faces:</p>
            <p className="text-black text-right">{archives.glb.faceCount}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-black text-left">Vertices:</p>
            <p className="text-black text-right">{archives.glb.vertexCount}</p>
          </div>
        </div>
      </div>

   {downloading?   <Button
            
            fullWidth
            
            sx={{
                background: "rgb(21 94 117)",
                "&:hover": {
                  background: "rgb(21 94 117)",
                },
                color: "white",
                width: "100%",
                mt: 3, mb: 2
              }}
              className="text-black"
          >
            <TbProgress size={32}/>
          </Button>:  <Button
      onClick={()=>handleImport(modelData?.uri,name)}
        sx={{
          background: "rgb(21 94 117)",
          "&:hover": {
            background: "rgb(21 94 117)",
          },
          color: "white",
          width: "100%",
        }}
        className="text-black"
      >
        Import
      </Button>}

      <p
        className="text-cyan-800 text-left"
        onClick={() => {
          window.open(viewerUrl, "_blank");
        }}
      >
        See more details
      </p>
    </div>
  );
};

export default DetailedModelCard;
