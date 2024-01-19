import React from 'react';
import { Canvas } from '@react-three/fiber';
 
import {  OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Scene from './Scene';
import { handleChange } from './Redux/ModelInteraction/action';
 
import { Interface } from './Interface/Interface';
 
 import { useContext } from "react";
import { MyContext } from './context';
 
 
// import  Scene  from './Scene';
// import { handleChange } from './Redux/ModelInteraction/action';
  
// const ControlsMap = {
//   forward: 'forward',
//   back: 'back',
//   left: 'left',
//   right: 'right',
//   jump: 'jump',
// };

const CanvasMain: React.FC = () => {
  const {handleChangeData} = useContext<any>(MyContext);
  // const map = useMemo(
  //   () => [
  //     { name: ControlsMap.forward, keys: ['ArrowUp', 'KeyW'] },
  //     { name: ControlsMap.back, keys: ['ArrowDown', 'KeyS'] },
  //     { name: ControlsMap.left, keys: ['ArrowLeft', 'KeyA'] },
  //     { name: ControlsMap.right, keys: ['ArrowRight', 'KeyD'] },
  //     { name: ControlsMap.jump, keys: ['Space'] },
  //   ],
  //   []
  // );
 
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Optionally apply styles or effects when something is being dragged over the canvas
  };

  const handleDrop = async(event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Handle the dropped item here
    const droppedFile = event.dataTransfer.files;
    let arr = Object.entries(droppedFile).map(([_key, value]) => {
      return value;
    });
    // console.log({arr})
     let data=await handleChange(arr) 
     console.log(data)
      handleChangeData(data);
     
    
  };

//   const sceneSetup = (scene: THREE.Scene) => {
//     const xAxisHelper = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 50, 0xff0000, 1, 0.5);
//     const zAxisHelper = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 50, 'blue', 1, 0.5);

//     scene.add(xAxisHelper);
//     scene.add(zAxisHelper);
//   };

  const handleKeyDown = (event: React.KeyboardEvent, _index: number) => {
    if (event.key === 'Delete') {
      'delete is clicked';
    }
  };


  return (
    <div   >
   <div
      onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, 0)}
      style={{ height: '100%', width: '72vw' }}
      className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* <KeyboardControls map={map}> */}

        <Canvas gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} className='canvas' shadows camera={{ position: [1, 1, 1], fov: 30 }}>
          <Physics gravity={[0, 0, 0]} debug>
            
            <Scene />
          </Physics>
          <OrbitControls rotateSpeed={2} minPolarAngle={0} maxPolarAngle={Math.PI / 2.5}  makeDefault />
        </Canvas>
       
        
      {/* </KeyboardControls> */}
    </div>
    <Interface/>
    </div>


   
  );
};

export default CanvasMain;
