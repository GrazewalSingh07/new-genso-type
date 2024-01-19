import React, { useContext } from "react";
 
import { AddObjectDropdown } from "./AddObjectDroDown";
import { MyContext } from "../context";
import { Sketchfab } from "./sketchfab";
 

interface InterfaceProps {
//   handleChange: (glbFiles: FileList | null) => void;
}

export const Interface: React.FC<InterfaceProps> = () => {
//   const { state } = useContext(MyContext);
//   const activeTransformMode = useSelector(
//     (state: RootState) => state.ModelInteraction.activeTransform
//   );
 

//   const handleChangeTool = (name: string) => () => {
//     dispatch(activeTransform(name));
//     state.mode = name;
//   };

  // const models = useSelector((state: RootState) => state.models.models);
const {models}= useContext<any>(MyContext);
  return (
    <div className="absolute top-0 w-full">
      
      <div className=" rounded-none glass w-full" >
        <div className="flex items-center p-2 gap-2 ">
          <AddObjectDropdown />
         
        </div>
      </div>
      <div className="max-w-[260px] absolute  w-full ">
        <div className="rounded-none h-[220px] glass"></div>
        {models.length > 0 && (
          <div className="p-2 glass rounded-none">
            {models.map((el:any) => {
              return <p key={el?.name} className="p-2">{el?.name}</p>;
            })}
          </div>
        )}
      </div>
      <Sketchfab />
      
    </div>
  );
};

 