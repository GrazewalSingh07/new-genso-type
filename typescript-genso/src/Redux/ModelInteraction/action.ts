 
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
 
 import * as THREE from 'three'
export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2);
};

const handleFileLoad = (file: File): Promise<{ name: string; file: THREE.Object3D ,type:string}> => {
  
  return new Promise((resolve, reject) => {
    // console.log({file})
    const loader = new GLTFLoader();
    loader.load(URL.createObjectURL(file), (gltf) => {
      const object3DInstance = new THREE.Object3D();
      object3DInstance.add(gltf.scene)
      resolve({ name: file.name.split(".")[0]+"_"+generateUniqueId(), file:object3DInstance ,type:"imported" });
    }, undefined, reject);
  });
};

export const handleChange = async (glbFiles: File[]) => {
  try {
 
console.log(glbFiles)
    const promises = glbFiles?.map((file) => handleFileLoad(file));
    const loadedModels = await Promise.all(promises);
// console.log(loadedModels)
    return loadedModels

  } catch (error) {
    
    console.error('Error loading GLTF:');
  }
};

 