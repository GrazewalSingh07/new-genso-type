import { Button, Grid } from '@mui/material'
import React from 'react'

interface LoginComponent{
  handleClick:()=>void
}

export const Login : React.FC<LoginComponent>=({handleClick}) => {

   


  return (
    <div className='h-[70vh] w-[70vw] relative'>
       <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
        <Grid gap={2} justifyContent={'center'} container>
           
          <Button variant='contained' onClick={handleClick}>
            Login
        </Button>
           
        </Grid>
      
       </div>
    </div>
  )
}
