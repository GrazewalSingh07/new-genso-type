import { createContext, ReactNode, useEffect, useState } from "react";
 

interface MyContextProps {
  children: ReactNode;
}
 
export interface MyContextValue {
 setAuthCode:any
 
}
 
 


export const AuthContext = createContext<MyContextValue | null>(null);
 

export const AuthContextProvider: React.FC<MyContextProps> = ({ children }) => {
  
   const [AuthCode,setAuthCode]= useState<any>()
   console.log(AuthCode)

   const exchangeCodeForToken = async (authorizationCode:string) => {
    const clientId = 'AC8xndaenPXQcYmcC1yOVKSWVHI0NHpg3lSKQHx2';
    const clientSecret = 'YAEQlvQsIpp023d0JpR3iXj6ANNQUG7uHrYSSHe8dXgCJ0cp0zXqEMoOCLciyNhwyGsnKW3kfBCOQPqsmVkWHd2WIYBxwdD8PouCWAOxFQABEYdv8iNFfMcxwYYfeMSa';
    const redirectUri = 'https://new-genso-type.vercel.app/';
  
    const url = 'https://sketchfab.com/oauth2/token/';
  
    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'authorization_code');
    requestBody.append('code', authorizationCode);
    requestBody.append('client_id', clientId);
    requestBody.append('client_secret', clientSecret);
    requestBody.append('redirect_uri', redirectUri);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody.toString(),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Access Token:', data.access_token);
      console.log('Token Type:', data.token_type);
      console.log('Expires In:', data.expires_in);
      // Handle the received access token
  
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };

  const sketchfabLogin = async (code:string) => {
    const url = 'http://localhost:4000/sketchfab_login';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Response:', data);
      // Handle the response from the server
  
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };
  // Example usage
  
 useEffect(() => {
  sketchfabLogin(AuthCode)
 },[AuthCode]);
   
  return (
    <AuthContext.Provider
       value={{setAuthCode}}

    >
      {children}
    </AuthContext.Provider>
  );
};
