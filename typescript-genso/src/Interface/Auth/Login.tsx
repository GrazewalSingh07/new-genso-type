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
import { TbProgress } from "react-icons/tb";
  
import axios from 'axios';
import { setLocalStorageData } from '../../utils/localStorage';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';

// Define Login component
const Login: React.FC = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {isAuth,setIsAuth}= useContext<any>(AuthContext)
  const [isLoading,setLoading] = useState<boolean>(false)
  const [error,setError]= useState<string|null>(null)
const navigate=useNavigate()
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
  const handleLogin = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post('http://13.233.48.128:8080/user/login', formData);

      // Assuming your server sends a success status
      console.log(response)
      
    setLocalStorageData("user",response.data.user);
    setLocalStorageData("auth",response.data.token);
    setIsAuth(true)
      if (response.status === 200) {
        setLoading(false)
        navigate("/recents")
        // Successful login
        // console.log('Login successful');
      } else {
        setLoading(false)
        // Handle error
       setError(response.data.error[0].msg)
      }
    } catch (error:any) {
        setLoading(false)
        setError(error.response.data.error[0].msg)
        // setError('Login failed')
        console.log(error)
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
    // Add your login logic here
    handleLogin();
    console.log('Login data:', formData);
  };
if(isAuth){
    return <Navigate to="/recents"/>
}
  return (
    <Container component="main" className='bg-white' maxWidth="xs">
      <CssBaseline />
      <div className="flex flex-col items-center mt-8">
        <Avatar sx={{ m: 1, bgcolor: 'rgb(21 94 117)' }}>
          <CgProfile/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className="mt-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleInputChange}
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
            
          >
            Login
          </Button>}
          {error!=null&& <p className='text-red-500 font-semibold py-2 !z-10'>{error}</p>}
        </form>
       
      </div>
     
    </Container>
  );
};

export default Login;
