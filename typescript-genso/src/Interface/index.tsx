 
import {useNavigate} from "react-router-dom"
export const Home = () => {
  const navigate= useNavigate()
  const handleButtonClick=()=>{
    
    navigate("/recents")
  }
  return (
    <div className='absolute top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[50%]' >
  
        <button onClick={handleButtonClick} > Start the application</button>
    </div>
  )
}
