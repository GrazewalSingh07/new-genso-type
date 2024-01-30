import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { Home } from "./Interface";
import { Recents } from "./Interface/Recent/Recents";
import CanvasMain from "./CanvasMain";
import PrivateRoute from "./utils/PrivateRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
 
function App() {
  const {isAuth}= useContext<any>(AuthContext)
  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path='/recents' element={ <PrivateRoute   children={<Recents />} isAuthenticated={isAuth}/>} />
        <Route path='/file/:id' element={ <PrivateRoute children={<CanvasMain />} isAuthenticated={isAuth}/>} />
      </Routes>
    </>
  )
}

export default App
