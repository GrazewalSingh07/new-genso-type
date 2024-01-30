import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { getLocalStorageData, setLocalStorageData } from "../utils/localStorage";
import {ObjectId} from 'mongodb'
interface MyContextProps {
  children: ReactNode;
}
export interface User {
  _id: ObjectId;
  username: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  access_token?: string;
  expires_in?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
}

export interface MyContextValue {
  setAuthCode: any;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<MyContextValue | null>(null);

export const AuthContextProvider: React.FC<MyContextProps> = ({ children }) => {
  const [AuthCode, setAuthCode] = useState<any>();
  const [isAuth,setIsAuth]=useState<boolean>(getLocalStorageData("auth")?true:false)
let [token,_setToken]=useState<string|null>(getLocalStorageData("auth"))
 
useEffect(()=>{
if(token) {
  setIsAuth(true)
}
},[token])



  const sketchfabLogin = async (code: string) => {
    const url = "http://localhost:8080/sketchfab_login";
    const user: User | null = getLocalStorageData('user');
    axios
      .post(url, JSON.stringify({ code,userId:user?._id }), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getLocalStorageData('auth')}`, // Add the Bearer token
        },
      })
      .then((response) => {
        // console.log(response.data.user)
       setLocalStorageData('user',response.data.user)
      })
      .catch((_err) => {
        alert('something went wrong, Please try again Later')
      });
  };
 

  useEffect(() => {
   if(AuthCode){
    sketchfabLogin(AuthCode);
   }
  }, [AuthCode]);

  return (
    <AuthContext.Provider value={{isAuth,setIsAuth, setAuthCode }}>
      {children}
    </AuthContext.Provider>
  );
};
