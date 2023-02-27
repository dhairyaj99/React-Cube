import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Mesh } from "three";

const Cube = ({ position = [20, 20, 20], rotation = [0, 0, 0] }) => {
  const meshRef = useRef();
  useFrame(() => {
    if (!meshRef) {
      return;
    }

    //console.log(position, rotation);
    console.log(meshRef.current.position);
    // meshRef.position.x = position.x;
    // meshRef.position.y = position.y;
    // meshRef.position.z = position.z;

    // meshRef.rotation.x = rotation.x;
    // meshRef.rotation.y = rotation.y;
    // meshRef.rotation.z = rotation.z;

    // const progress = Math.min(clock.getElapsedTime() / 2, 1);

    if (meshRef.current.position != position) {
      meshRef.current.position.x += 0.05;
      meshRef.current.position.y += 0.05;
      meshRef.current.position.z += 0.05;
    }
    if (meshRef.current.rotation != rotation) {
      meshRef.current.rotation.x += 0.05;
      meshRef.current.rotation.y += 0.05;
      meshRef.current.rotation.z += 0.05;
    }
  });

  return (
    <mesh
      ref={meshRef}
      // position={[position.x, position.y, position.z]}
      // rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" emissive="white" />
    </mesh>
  );
};

export default Cube;
//<Cube position={[0, 0, 0]} />
