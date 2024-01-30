import   { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { SiSketchfab } from 'react-icons/si';
import { SketchFabParentComponent } from './ModelSection';
import { AuthContext, User } from '../../context/AuthContext';
import { getLocalStorageData } from '../../utils/localStorage';
import { Avatar } from '@mui/material';
 
import { CgProfile } from 'react-icons/cg';
 

export const Sketchfab = () => {
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);
  const {setAuthCode} = useContext<any>(AuthContext)
  
const user:User|null=getLocalStorageData('user')
  const openExternalPopup = () => {
    const newExternalPopup = window.open(
      'https://sketchfab.com/oauth2/authorize/?response_type=code&client_id=AC8xndaenPXQcYmcC1yOVKSWVHI0NHpg3lSKQHx2&redirect_uri=https://new-genso-type.vercel.app/',
      'sketchfab',
      'height=500,width=700'
    );
    setExternalPopup(newExternalPopup);
  };

  useEffect(() => {
    if (!externalPopup) {
      return;
    }

    const timer = setInterval(() => {
      if (!externalPopup) {
        timer && clearInterval(timer);
        return;
      }
      const currentUrl = externalPopup.location.href;
      if (!currentUrl) {
        return;
      }
      const searchParams = new URL(currentUrl).searchParams;
      const code = searchParams.get('code');
      if (code) {
        setAuthCode(code)
        externalPopup.close();
        clearInterval(timer);
      }
    }, 500);

    return () => {
      // Cleanup the interval when the component unmounts
      clearInterval(timer);
    };
  }, [externalPopup]);

  const onButtonClick = () => {
    if (!externalPopup || externalPopup.closed) {
      openExternalPopup();
    } else {
      externalPopup.focus();
    }
  };
  

  return (
    <div className='absolute right-0 h-[100vh] w-[250px] text-center  '>
      <div className='bg-white h-full p-2'>
        <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} className='flex max-xl:flex-col justify-between items-center p-2'>
          <div className='flex items-center'>
            <IconButton>
              <SiSketchfab color='rgb(21 94 117)' />
            </IconButton>
            <h2 className='text-cyan-800 font-semibold'>SketchFab</h2>
          </div>
        {user?.access_token? <Avatar sx={{ m: 1, bgcolor: 'rgb(21 94 117)' }}>
          <CgProfile/>
        </Avatar> :  <Button
            onClick={onButtonClick}
            sx={{ background: 'rgb(21 94 117)', '&:hover': { background: 'rgb(21 94 117)' }, color: 'white' }}
          >
            Login
          </Button>}
        </div>

        <div className='flex-col  max-xl:flex-col justify-between items-center p-2'>
          <SketchFabParentComponent />
         
        </div>
         
      </div>
    </div>
  );
};
 
