


import { createContext, ReactNode, useEffect, useState } from "react";
 

interface SketchFabProps {
  children: ReactNode;
}
 
export interface SketchFabValue {
  
    setQueryParams:any;
    fetchData:()=>void;
    sketchfab_data:any;
    queryParams:QueryParams;
    loading:boolean;
}

interface QueryParams {
    q: string;
    type: string;
    downloadable: boolean;
    animated: boolean;
    is_rigged: boolean;
    sort_by: string;
    cursor:number
  }
 


export const SketchFabContext = createContext<SketchFabValue | null>(null);
 

export const SketchFabContextProvider: React.FC<SketchFabProps> = ({ children }) => {
  
   const [sketchfab_data,setsketchfab_data]= useState<any>(null)
const [loading,setLoading]= useState<boolean>(false)
  const [queryParams, setQueryParams] = useState<QueryParams>({
    q: 'bed',
    type: 'models',
    downloadable: true,
    animated: false,
    is_rigged: false,
    sort_by: '-pertinence',
    cursor: 10,
  });
  const objectToQueryString = (params: Record<string, any>): string =>
  Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  const fetchData = async () => {
    setLoading(true)
    const baseUrl = 'https://api.sketchfab.com/v3/search';
   const queryString = objectToQueryString(queryParams);
    const apiUrl = `${baseUrl}?${queryString}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        setLoading(false)
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      // Handle the data from the successful response
      setLoading(false)
      setsketchfab_data(data.results);
    } catch (error:any) {
      // Handle errors 
      setLoading(false)
      console.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
   
    fetchData();
  }, [queryParams]);

  
   
  return (
    <SketchFabContext.Provider
       value={{queryParams,loading, setQueryParams,fetchData,sketchfab_data}}

    >
      {children}
    </SketchFabContext.Provider>
  );
};
