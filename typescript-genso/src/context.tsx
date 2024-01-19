import { createContext, ReactNode, useState } from "react";
import { proxy } from "valtio";

interface MyContextProps {
  children: ReactNode;
}
interface Model {
  name: string;
  file: any;
  selected: boolean;
  type: string;
}
interface MyContextValue {
  modes: string[];
  state: {
    current: string | null;
    mode: number;
  };
  handleChangeData: any;
  models: Model[];

  handleDeleteData: any;
  handleUpdateData: any;
  copiedModel: any;
  setCopiedModel: any;
}

export const MyContext = createContext<MyContextValue | undefined>(undefined);

export const MyContextProvider: React.FC<MyContextProps> = ({ children }) => {
  const modes = ["translate", "rotate", "scale"];

  
  const state = proxy({ current: null, mode: 0 });
  const [models, setModels] = useState<Model[]>([]);
  const [copiedModel, setCopiedModel] = useState (null);

  console.log({copiedModel})

  const handleUpdateData = (data: { type: String; value: any }) => {
    switch (data.type) {
      case "selected":
        {
          console.log(data);
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
  const handleDeleteData = (data: any) => {
    setModels(data);
  };
  const handleChangeData = (data: any) => {
    // console.log(data)
    setModels([...models, ...data]);
  };

  return (
    <MyContext.Provider
      value={{
        modes,
        handleUpdateData,
        state,
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
