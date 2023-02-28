import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";

const Cube = (props) => {
  const { pos, rot, send } = props;
  const meshRef = useRef();
  var goalPos = pos;
  var goalRot = rot;

  useFrame(() => {
    if (!meshRef) {
      return;
    }
    const speed = 0.03;

    // To make the cube translate along the diagonal, we need to standardize the amount
    // of distance left for each axis, and multiply the tranlation rates by each corresponding rate
    // same for rotation
    const normalizedP = new Vector3(
      goalPos.x - meshRef.current.position.x,
      goalPos.y - meshRef.current.position.y,
      goalPos.z - meshRef.current.position.z
    ).normalize();

    meshRef.current.position.x += speed * normalizedP.x;
    meshRef.current.position.y += speed * normalizedP.y;
    meshRef.current.position.z += speed * normalizedP.z;

    send({ type: "MOVING", x: meshRef.current.position.x });
    send({ type: "MOVING", y: meshRef.current.position.y });
    send({ type: "MOVING", z: meshRef.current.position.z });

    const normalizedR = new Vector3(
      goalRot.x - meshRef.current.rotation.x,
      goalRot.y - meshRef.current.rotation.y,
      goalRot.z - meshRef.current.rotation.z
    ).normalize();

    meshRef.current.rotation.x += 0.01 * normalizedR.x;
    meshRef.current.rotation.y += 0.01 * normalizedR.y;
    meshRef.current.rotation.z += 0.01 * normalizedR.z;

    send({ type: "ROTATING", x: meshRef.current.rotation.x });
    send({ type: "ROTATING", y: meshRef.current.rotation.y });
    send({ type: "ROTATING", z: meshRef.current.rotation.z });
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="white"
        emissive="turquoise"
        wireframe
        wireframeLinewidth={100}
        wireframeLinejoin="round"
      />
    </mesh>
  );
};

export default Cube;
//<Cube position={[0, 0, 0]} />
