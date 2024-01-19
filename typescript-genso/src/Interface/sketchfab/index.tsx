import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
 
 
import { MdClose } from 'react-icons/md';
import { TextField } from '@mui/material';



export const Sketchfab = () => {
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
        },
      }));
      
       
        const [open, setOpen] = React.useState(false);
      
        const handleClickOpen = () => {
          setOpen(true);
        };
        const handleClose = () => {
          setOpen(false);
        };

  return (
    <div className='absolute right-0 text-center w-[260px]'>
   

    <React.Fragment>
     
      <button onClick={handleClickOpen} className='text-center w-full justify-center bg-orange-600 px-2 py-4 rounded-md' >
        Add assets from Sketchfab
    </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 ,textAlign:"center"}} id="customized-dialog-title">
          Sketchfab 
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <MdClose/>
        </IconButton>
        <DialogContent dividers>
          <TextField placeholder='Search for assets here ...'/>
           

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Add assets to your project
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
    
    </div>
   
  )
}
