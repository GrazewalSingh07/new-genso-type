// Import necessary dependencies
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Avatar,
} from '@mui/material';
 

 
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { setLocalStorageData } from '../../utils/localStorage';
import { AuthContext } from '../../context/AuthContext';
import { TbProgress } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

// Define Register component
const Register: React.FC = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const {setIsAuth}= useContext<any>(AuthContext)

  // Handle form field changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const [isLoading,setLoading] = useState<boolean>(false)
  const [error,setError]= useState<string|null>(null)
const navigate=useNavigate()

  const handleSignup = async () => {
    try {
        setLoading(true)
      const response = await axios.post('https://genso-backend.vercel.app/user/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log({response})
      // Assuming your server sends a success status
      if (response.status === 200) {
        setLoading(false)
        // Successful signup
        setLocalStorageData("user",response.data.curr);
        setLocalStorageData("auth",response.data.token);
        setIsAuth(true)
        setLoading(false)
        navigate("/recents")
        // console.log('Signup successful');
      } else {
        setLoading(false)
         
        setError('Signup failed');
      }
    } catch (error:any) {
        setLoading(false)
       setError(error.response.data.error[0].msg)
      console.error('Error during signup:', error);
    }
  };
  useEffect(()=>{
    setTimeout(() => {
        if(error!=null) {
        setError(null)
    }
    }, 3000);
  },[error])
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Registration data:', formData);
    handleSignup();
  };

  return (
    <Container className='bg-white' component="main" maxWidth="xs">
      <CssBaseline />
      <div className="flex flex-col items-center mt-8">
        <Avatar sx={{ m: 1, bgcolor: 'rgb(21 94 117)' }}>
        <CgProfile />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className="mt-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete="current-password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          {isLoading? <Button
            
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
            type="submit"
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
            disabled={formData.password === formData.confirmPassword?false:true}
          >
            Register
          </Button>}
          {error!=null&& <p className='text-red-500 font-semibold py-2 !z-10'>{error}</p>}
        </form>
      </div>
    </Container>
  );
};

export default Register;
