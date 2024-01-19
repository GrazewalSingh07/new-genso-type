// import React from "react";

import "./App.css";

import {
  GizmoHelper,
  GizmoViewport,
  PerspectiveCamera,
  
} from "@react-three/drei";
import { CustomGrid } from "./Custom/CustomGrid";

 
import { ModelPreview } from "./Custom/ModelPreview";
import { useContext } from "react";
import { MyContext } from "./context";
 
// import { CustomGrid } from "./components/custom/CustomGrid";

  const Scene = () => {
const {models}=useContext<any>(MyContext)
    // const model = useSelector((state: RootState) => state.models.models)
// console.log(models)
  return (
    <>
      <PerspectiveCamera position={[-4, 4, -5]} makeDefault />
      <directionalLight castShadow position={[2.5, 8, 2]} intensity={4} />
      <ambientLight/>
      {/* <Select multiple box onChange={setSelected}> */}
        <group>
          {models?.map((el:any) => {
            
            return <ModelPreview key={el.name} selected={el.selected} type={el.type} name={el.name} glb={el.file} />;
          })}
        </group>
        

      {/* </Select> */}
     
      <GizmoHelper alignment="top-right" margin={[80, 120]}>
        <GizmoViewport
          axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
          labelColor="white"
        />
      </GizmoHelper>
      <axesHelper args={[100]} />
      <CustomGrid />
    </>
  );
};

// Assuming RootState is the type of your Redux store state, update it accordingly
// interface RootState {
//   ModelInteraction: {
//     models: { name: string; file: string }[];
//   };
//   // Add other slices of your store as needed
// }

export default Scene