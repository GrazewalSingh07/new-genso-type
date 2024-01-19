import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { Home } from "./Interface";
import { Recents } from "./Interface/Recent/Recents";
import CanvasMain from "./CanvasMain";
 
function App() {
  
  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/recents' element={<Recents />} />
        <Route path='/file/:id' element={<CanvasMain />} />
      </Routes>
    </>
  )
}

export default App
