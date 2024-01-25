import React, { useRef, useContext, useEffect } from "react";
import { PivotControls } from "./PivotContols";
import _ from "lodash";
import { Outlines } from "@react-three/drei";
import * as THREE from "three";

import { MyContext } from "../context";
import { generateUniqueId } from "../Redux/ModelInteraction/action";
// import { useDispatch } from "react-redux";

// import { changeActive } from "../../Redux/glbInteraction/action";
// import { useSnapshot } from "valtio";

// import { useContext } from "react";
// import { MyContext } from "../../../MyContext";

interface glbPreviewProps {
  glb: THREE.Object3D<THREE.Object3DEventMap>; // Update with the correct type
  name: string;
  selected: boolean;
  type: string;
}

export const ModelPreview: React.FC<glbPreviewProps> = ({
  glb,
  name,
  selected,
  type,
}) => {
  const gltfRef = useRef<
    THREE.Object3D | React.MutableRefObject<THREE.Object3D>
  >(null);

  const {
    models,
    handleDeleteData,
    handleUpdateData,
    setCopiedModel,
    copiedModel,
    handleChangeData,
  } = useContext<any>(MyContext);

  const handleClick = (e: any) => {
    e.stopPropagation();

    handleUpdateData({ type: "selected", value: name });
  };

  const handleDelete = () => {
    if (selected) {
      let newModels = models?.filter(
        (el: { name: String; file: any; selected: boolean }) => {
          if (el.selected == false || el.selected == undefined) {
            return true;
          }
        }
      );
      handleDeleteData(newModels);
    }
  };

  const handleCopy = () => {
    let newModels = models?.filter(
      (el: { name: String; file: any; selected: boolean }) => {
        
       
        if (el.selected == true) {

          return {
            ...el,
            selected:false,
            file: el.file.clone(),
          };
        }
      }
    );
    setCopiedModel(newModels);
  };
  const handlePaste =  () => {
    
    if (copiedModel.length > 0) {
      let x = copiedModel?.map((el: any) => {
        
        return {
          name: el.name.split("_")[0] + "_" + generateUniqueId(),
          file:   el.file.clone(),
          type: el.type,
          selected:false
        };
      });

      handleChangeData(x);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Delete") {
      handleDelete();
    } else if (event.shiftKey) {
    } else if (event.key === "c" && event.ctrlKey) {
      handleCopy();
    } else if (event.key === "v" && event.ctrlKey) {
      handlePaste();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [glb, selected, copiedModel]);

 

  const wireframeRef = useRef<THREE.LineSegments>();
const meshref=useRef<any>();
  useEffect(() => {
    if (
      glb &&
      !wireframeRef.current &&
      type == "imported" &&selected==true
     
    ) {
      const boxHelper = new THREE.BoxHelper(glb, 0xffff00);
      const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
      const wireframe = new THREE.LineSegments(
        boxHelper.geometry as THREE.BufferGeometry,
        material
      );
      wireframeRef.current = wireframe;
      meshref.current.add(wireframe);
    }

    if (wireframeRef.current && type == "imported") {
      wireframeRef.current.visible = selected;
    }
    if(wireframeRef.current && type == "imported"&&selected == false) {
      wireframeRef.current.visible=false;
    }
  }, [glb, selected,copiedModel]);

  return (
    <group
    >
      <PivotControls
        rotation={[0, -Math.PI / 2, 0]}
        anchor={[0, 0, 0]}
        scale={75}
        depthTest={false}
        fixed
        lineWidth={2}
        visible={selected == true}
      >
        <mesh
        onClick={handleClick}
        ref={meshref}
          castShadow
          receiveShadow={true}
          // onPointerMissed={(e) => {e.type === "click"
          //  setAttach(false) }}
          // onContextMenu={(e) => snap.current === name && (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))}
          // onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
          // onPointerOut={(e) => setHovered(false)}
          name={name}
        >
          {glb && (
            <>
              <primitive
                
                ref={gltfRef}
                wireframe
                object={glb}
              />

              {/* <skinnedMesh castShadow receiveShadow geometry={nodes.Mesh?.geometry} material={materials.MeshStandardMaterial} skeleton={nodes?.Mesh?.skeleton||null}> */}
              {type == "default" && glb && selected && (
                <Outlines color="yellow" />
              )}
              {/* </skinnedMesh> */}
            </>
          )}

          <meshStandardMaterial />
        </mesh>
      </PivotControls>
    </group>
  );
};
