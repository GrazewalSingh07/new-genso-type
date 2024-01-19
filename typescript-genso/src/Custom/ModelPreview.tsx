import React, { useRef, useContext, useEffect } from "react";
import { PivotControls } from "./PivotContols";
import _ from 'lodash';
import {
 
  Edges,
 
  Outlines,
  
} from '@react-three/drei'
import * as THREE from 'three'
 
import { MyContext } from "../context";
import { generateUniqueId } from "../Redux/ModelInteraction/action";
// import { useDispatch } from "react-redux";
 
// import { changeActive } from "../../Redux/glbInteraction/action";
// import { useSnapshot } from "valtio";
 
// import { useContext } from "react";
// import { MyContext } from "../../../MyContext";
 
interface glbPreviewProps {
  glb: any; // Update with the correct type
  name: string;
  selected: boolean;
  type: string;
  
}

export const ModelPreview: React.FC<glbPreviewProps> = ({ glb, name,selected,type }) => {
  const gltfRef = useRef<THREE.Object3D|React.MutableRefObject<THREE.Object3D>>(null);
  
  
  const { models,handleDeleteData,handleUpdateData,setCopiedModel,copiedModel, handleChangeData}=useContext<any>(MyContext)
  
 
  const handleClick = (e: any) => {
    e.stopPropagation();
    
   handleUpdateData({type: 'selected',value:name})
  
   
 
  };
  
  
  const handleDelete=()=>{
  
    if( selected) {
       let newModels=models?.filter((el:{name:String,file:any,selected:boolean})=>{
        if(el.selected==false|| el.selected==undefined) {
          return true;
        }
       })
       handleDeleteData(newModels)
    }
  }
 

  const handleCopy = async () => {
   
   let x=glb.clone()
   
    console.log({name:name.split('_')[0]+"_"+generateUniqueId(),file:x})
    setCopiedModel(x);
     
  };
  const handlePaste = async () => {
    if(copiedModel){
      handleChangeData([{name:name.split('_')[0]+"_"+generateUniqueId(),file:copiedModel}])
    }
   
  };

  const handleKeyDown = (event: any) => {
   
    if (event.key === 'Delete') {
      
      handleDelete();
    }
 
    
    else if  (event.shiftKey) {
        
    }else if(event.key === 'c' && event.ctrlKey) {
     handleCopy()
    }else if(event.key === 'v' && event.ctrlKey) {
      handlePaste()
     }
    

  };

  useEffect(() => {
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [glb,selected,copiedModel]);

  return (

    <group
    onClick={handleClick}>
      <PivotControls
        
        visible={selected ==true}
        rotation={[0, -Math.PI / 2, 0]}
        depthTest={false}
        lineWidth={2}
        anchor={ [0, 0, 0]}
      >
      <mesh
       
        castShadow
        receiveShadow={true}
        
        // onPointerMissed={(e) => {e.type === "click"
        //  setAttach(false) }}
        // onContextMenu={(e) => snap.current === name && (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))}
        // onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        // onPointerOut={(e) => setHovered(false)}
        name={name}
      >
        {glb && (
         <>
          <primitive
            ref={gltfRef}
            wireframe
            object={ glb}
          />
        
        {/* <skinnedMesh castShadow receiveShadow geometry={nodes.Mesh?.geometry} material={materials.MeshStandardMaterial} skeleton={nodes?.Mesh?.skeleton||null}> */}
        {  (type =='default' &&glb  && selected)&& <Outlines color="yellow" />}
      {/* </skinnedMesh> */}
        
     
      </>)}

        <meshStandardMaterial />
      </mesh>
      </PivotControls>
      <Edges  scale={1.1} renderOrder={1000} >
        <meshBasicMaterial transparent color="#333" depthTest={false} />
      </Edges>
    </group>
  );
};
