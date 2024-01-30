 
import { useState } from "react"
 
 
import Register from "./Auth/Register"
import Login from "./Auth/Login"
 
export const Home = () => {
 
  const [currState,setcurrState]= useState<string>('login')
 

  const handleButton=(name:string)=>{
    if(name=='login'){
      setcurrState('login')
    }
    else if(name=='register'){
      setcurrState('register')
    }
  }


  return (
    <div className='absolute top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[50%]' >
      {currState=="login"?<Login/> :<Register/>}
      {currState=="register"? <button className="my-4" onClick={()=>handleButton('login')}>Login</button>:
       <button className="my-4" onClick={()=>handleButton('register')}>Register</button>}
        {/* <button onClick={handleButtonClick} > Start the application</button> */}
    </div>
  )
}
