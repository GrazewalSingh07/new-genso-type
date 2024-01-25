 
import { Grid } from '@react-three/drei';
 

export const  CustomGrid = () => {
  const gridConfig = {
    cellSize: 0.3,
    cellThickness: 0.3,
    cellColor: '#918f8f',
    sectionSize: 5,
    sectionThickness: 1,
    sectionColor: '#3d3d43',
    fadeDistance: 500,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true
  }
  return <Grid  position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
};

 
