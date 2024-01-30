


import axios, { AxiosRequestConfig } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getLocalStorageData } from "../utils/localStorage";
import { User } from "./AuthContext";
import JSZip from 'jszip';
import { handleArrayBufferLoad } from "../Redux/ModelInteraction/action";
import { MyContext } from "../context";


interface SketchFabProps {
  children: ReactNode;
}
 
export interface SketchFabValue {
    setQueryParams:any;
    fetchData:()=>void;
    sketchfab_data:any;
    queryParams:QueryParams;
    loading:boolean;
    handleImport:any;
    downloading:boolean;
    downloadData:any;
}

interface QueryParams {
    q: string;
    type: string;
    downloadable: boolean;
    animated: boolean;
    is_rigged: boolean;
    sort_by?: string;
    cursor?:number
  }
 
export const SketchFabContext = createContext<SketchFabValue | null>(null);
 

export const SketchFabContextProvider: React.FC<SketchFabProps> = ({ children }) => {
  
const [sketchfab_data,setsketchfab_data]= useState<any>(null)
const [loading,setLoading]= useState<boolean>(false)
const [downloading,setDownloading]= useState<boolean>(false)
const [downloadData,setDownloadData]= useState(null)
 
const user:User|null=getLocalStorageData('user')
const {handleChangeData} =useContext<any>(MyContext)
  const [queryParams, setQueryParams] = useState<QueryParams>({
    q: 'Apple',
    type: 'models',
    downloadable: true,
    animated: false,
    is_rigged: false,
    
    cursor: 24,
  });


  useEffect(() => {

    const handleDownloadAndDecompress = async (url: string,name:string): Promise<void> => {
      setDownloading(true)
      try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
    setDownloading(false)
        console.log('Full Response:', response);
    
        if (response.status === 200) {
          // Assuming response.data is the GLB file content
          const glbData = response.data;
    
          // Now you can use the GLB data as needed
        let res= await handleArrayBufferLoad(glbData,name)
        handleChangeData([res])
        } else {
          setDownloading(false)
          console.error('Failed to download the GLB file. Status:', response.status);
        }
      } catch (error:any) {
        setDownloading(false)
        console.error('Error:', error.message);
      }
    };
    if(downloadData?.data) {
      handleDownloadAndDecompress(downloadData?.data,downloadData?.name)
    }
  },[downloadData])

  
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

  const handleImport = async (url: string,name:string) => {
    setDownloading(true);
    let URL=`${url}/download`
    const options: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
  
    try {
      const response = await axios(URL, options);
     // console.log(response.data);
      setDownloadData({name:name,data:response.data.glb.url});
      setDownloading(false)
    } catch (error:any) {
      setDownloading(false)
      // console.error('Error:', error.message);
    }
  };
  

  useEffect(() => {
   
    fetchData();
  }, [queryParams]);

  
   
  return (
    <SketchFabContext.Provider
       value={{queryParams,loading,downloadData, handleImport, downloading, setQueryParams,fetchData,sketchfab_data}}

    >
      {children}
    </SketchFabContext.Provider>
  );
};
