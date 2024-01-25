import { createContext, ReactNode } from "react";
 

interface MyContextProps {
  children: ReactNode;
}
 
export interface MyContextValue {
 
 
}
 
 


export const AuthContext = createContext<MyContextValue | null>(null);
 

export const AuthContextProvider: React.FC<MyContextProps> = ({ children }) => {
  
   
  const handleRequest = () => {
  }
   
  return (
    <AuthContext.Provider
       value={{handleRequest}}

    >
      {children}
    </AuthContext.Provider>
  );
};
