import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Mesh } from "three";

const Cube = ({ position }) => {
  const meshRef = useRef < Mesh > (null);
  useFrame(() => {
    if (!meshRef) {
      return;
    }
    meshRef.position.x = position.x;
    meshRef.position.y = position.y;
    meshRef.position.z = position.z;
  })
  return (
    <mesh useRef={meshRef} position={[position.x, position.y, position.z]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

export default Cube;
//<Cube position={[0, 0, 0]} />