 
import Button from '@mui/material/Button';
 
import IconButton from '@mui/material/IconButton';
import { SiSketchfab } from "react-icons/si";
 
import {SketchFabParentComponent} from './ModelSection';


export const Sketchfab = () => {

    
     
  function popitup(url: string, windowName: string): boolean {
    let newwindow = window.open(url, windowName, 'height=500,width=700');
    if (newwindow && newwindow.focus) {
        newwindow.focus();
    }
    return false;
}
const handleLogin = () => {
//  setShow(true);

popitup('https://sketchfab.com/oauth2/authorize/?response_type=code&client_id=AC8xndaenPXQcYmcC1yOVKSWVHI0NHpg3lSKQHx2&redirect_uri=https://new-genso-type.vercel.app/', 'sketchfab')

 
}
  return (

    <div className='absolute right-0 h-[100vh] text-center  w-[15%]'>
   
<div className='bg-white h-full  p-2'>
<div style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}  className='flex max-xl:flex-col  justify-between items-center p-2' >
    <div className='flex items-center'>
      <IconButton>
      <SiSketchfab color='rgb(21 94 117)'  />
      </IconButton>
      <h2 className='text-cyan-800 font-semibold'>SketchFab</h2>

    </div>
      <Button onClick={handleLogin} sx={{background:'rgb(21 94 117)',"&:hover":{
                background: 'rgb(21 94 117)'
            }, color:"white"}}   >
       Login
    </Button>
     
    </div>
    <div   className='flex max-xl:flex-col justify-between items-center p-2'  >
      <SketchFabParentComponent/>
    </div>
</div>
    
    
    </div>
   
  )
}
