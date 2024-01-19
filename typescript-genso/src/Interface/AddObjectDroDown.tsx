import { useState } from "react";
import {
  MenuItem,
  
  Menu,
  Divider,
  Tooltip,
} from "@mui/material";
import { LiaObjectUngroupSolid } from "react-icons/lia";
import { TbConePlus } from "react-icons/tb";
import { ImSphere } from "react-icons/im";
import { TbCylinderPlus } from "react-icons/tb";
import { GiDonut } from "react-icons/gi";
import { MdOutlineTextFields } from "react-icons/md";
import { BsImages } from "react-icons/bs";
import { BiCube } from "react-icons/bi"; // Example icon, you can use any React Icons
import { GiHumanTarget } from "react-icons/gi";
 
 
 import { useContext } from "react";
import { MyContext } from "../context";
import * as THREE from 'three';

export const AddObjectDropdown: React.FC = () => {
    type ObjectTypes = "box" | "sphere" | "cylinder" | "cone" | "donut" | "text" | "image" | "human" | "Directional Light" | "Point Light";
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
   
    const { handleChangeData} = useContext<any>(MyContext);
    const allShapes:any = {
      box: new THREE.BoxGeometry(1, 1, 1),
      cylinder: new THREE.CylinderGeometry(1, 1, 1, 32),
      donut: new THREE.TorusGeometry(0.5, 0.2, 3, 20),
      cone: new THREE.ConeGeometry(2.5, 5, 16),
      sphere: new THREE.SphereGeometry(1, 32, 16),
      // ... Add more shapes as needed
    };
  
     const generateUniqueId = (): string => {
      return Math.random().toString(36).substring(2);
    };
  
    const handleObjectChange = (value: ObjectTypes) => () => {
      let id = generateUniqueId();
 
  let curr=[{ name: value +"_"+ id, file: allShapes[value] ,type:'default'}]
    //  dispatch(setModel(curr));
    handleChangeData(curr)
      setDropdownOpen(false);
    };
  
    const handleButtonClick = (event:any) => {
      setAnchorEl(event.currentTarget);
      setDropdownOpen(!dropdownOpen);
      setTooltipOpen(false);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setDropdownOpen(false);
    };

  return (
    <div className=" ">
      <Tooltip title="Objects"  open={tooltipOpen}>
        
          <LiaObjectUngroupSolid size={40}   onClick={handleButtonClick}
          onMouseEnter={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)} color="white" /> 
         
      </Tooltip>


      <Menu anchorEl={anchorEl} open={dropdownOpen} onClose={handleClose}>
        <MenuItem sx={{ display: "none" }} disabled>
          <em>Select an object</em>
        </MenuItem>

        <MenuItem value="box" onClick={handleObjectChange('box')}>
          <BiCube style={{ marginRight: "8px" }} /> Cube
        </MenuItem>
        <MenuItem value="sphere" onClick={handleObjectChange("sphere")}>
          <ImSphere style={{ marginRight: "8px" }} /> Sphere
        </MenuItem>
        <MenuItem value="cylinder" onClick={handleObjectChange("cylinder")}>
          <TbCylinderPlus style={{ marginRight: "8px" }} /> Cylinder
        </MenuItem>
        <MenuItem value="cone" onClick={handleObjectChange("cone")}>
          <TbConePlus style={{ marginRight: "8px" }} /> Cone
        </MenuItem>
        <MenuItem value="donut" onClick={handleObjectChange("donut")}>
          <GiDonut style={{ marginRight: "8px" }} /> Donut
        </MenuItem>
        <MenuItem value="text" onClick={handleObjectChange("text")}>
          <MdOutlineTextFields style={{ marginRight: "8px" }} /> Text
        </MenuItem>
        <MenuItem value="image" onClick={handleObjectChange("image")}>
          <BsImages style={{ marginRight: "8px" }} /> Image
        </MenuItem>
        <MenuItem value="human" onClick={handleObjectChange("human")}>
          <GiHumanTarget style={{ marginRight: "8px" }} /> Human
        </MenuItem>

        <Divider />
        {/* <MenuItem value="DirectionaL Light" onClick={handleObjectChange("dir_light")}>
          <img
            className="w-5"
            src="https://res.cloudinary.com/des4i2xu7/image/upload/v1703074678/directional_light_chsdmt.png"
            style={{ marginRight: "8px" }}
          />{" "}
          Directional Light
        </MenuItem>
        <MenuItem value="DirectionaL Light" onClick={handleObjectChange}>
          <img
            className="w-5"
            src="https://res.cloudinary.com/des4i2xu7/image/upload/v1703074678/spotlight_fh1rse.png"
            style={{ marginRight: "8px" }}
          />{" "}
          Spot Light
        </MenuItem>
        <MenuItem value="Point Light" onClick={handleObjectChange}>
          <FaLightbulb style={{ marginRight: "8px" }} /> Point Light
        </MenuItem> */}
        {/* Add more MenuItem components for other 3D objects */}
      </Menu>
    </div>
  );
};
