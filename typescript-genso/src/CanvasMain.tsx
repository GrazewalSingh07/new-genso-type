import React from "react";
import { Canvas } from "@react-three/fiber";

import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Scene from "./Scene";
import { handleChange } from "./Redux/ModelInteraction/action";

import { Interface } from "./Interface/Interface";

import { useContext } from "react";
import { MyContext } from "./context";

const CanvasMain: React.FC = () => {
  const { handleChangeData } = useContext<any>(MyContext);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    const droppedFile = event.dataTransfer.files;
    let arr = Object.entries(droppedFile).map(([_key, value]) => {
      return value;
    });

    let data = await handleChange(arr);

    handleChangeData(data);
  };

 

  return (
    <div>
      <div
         
        style={{ height: "100%", width: "70%" }}
        className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      > 

        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="canvas"
          shadows
          camera={{ position: [1, 1, 1], fov: 30 }}
        >
          <Physics gravity={[0, 0, 0]} debug>
            <Scene />
            
          </Physics>
          <OrbitControls rotateSpeed={2} minPolarAngle={0} makeDefault />
        </Canvas>

       
      </div>
      <Interface />
    </div>
  );
};

export default CanvasMain;
