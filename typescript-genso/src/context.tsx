import { createContext, ReactNode, useState } from "react";
import { Object3D, Object3DEventMap } from "three";
 

interface MyContextProps {
  children: ReactNode;
}
interface Model {
  name: string;
  file: Object3D<Object3DEventMap>;
  selected?: boolean;
  type: string;
}
interface UpdateModel{
  type: String; value: String
}
export interface MyContextValue {
 

  handleChangeData: (data: Model[]) => void;
  models: Model[];
  handleDeleteData: (data: Model[]) => void;
  handleUpdateData: (data: UpdateModel) =>void;
  copiedModel: Object3D<Object3DEventMap>|null;
  setCopiedModel: (data: Object3D<Object3DEventMap>) => void;
}

export const MyContext = createContext<MyContextValue | null>(null);

export const MyContextProvider: React.FC<MyContextProps> = ({ children }) => {
  
  const [models, setModels] = useState<Model[]>([]);
  const [copiedModel, setCopiedModel] = useState<Object3D<Object3DEventMap> | null>(null);

  console.log({copiedModel})

  const handleUpdateData = (data: UpdateModel) => {
    switch (data.type) {
      case "selected":
        {
           
          let newData = models?.map((el) => {
            if (data.value == el.name) {
              if (el.selected == true) {
                el.selected = false;
              } else {
                el.selected = true;
              }
            }
            return el;
          });
          setModels(newData);
        }
        break;
      default: {
        return;
      }
    }
  };
  const handleDeleteData = (data: Model[]) => {
    setModels(data);
  };
  const handleChangeData = (data: Model[]) => {
    // console.log(data)
    setModels([...models, ...data]);
  };

  return (
    <MyContext.Provider
      value={{
        
        handleUpdateData,
       
        handleChangeData,
        models,
        handleDeleteData,
        copiedModel,
        setCopiedModel,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
