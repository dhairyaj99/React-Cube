import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";

const Cube = (props) => {
  const { pos, rot, send } = props;
  const meshRef = useRef();
  var startPos = pos;
  var goalPos = pos;
  var goalRot = rot;

  useFrame(() => {
    if (!meshRef) {
      return;
    }
    const speedFactor = 0.03;

    const xPDiff = goalPos.x - meshRef.current.position.x;
    const yPDiff = goalPos.y - meshRef.current.position.y;
    const zPDiff = goalPos.z - meshRef.current.position.z;

    const xRDiff = goalRot.x - meshRef.current.rotation.x;
    const yRDiff = goalRot.y - meshRef.current.rotation.y;
    const zRDiff = goalRot.z - meshRef.current.rotation.z;

    // If we are within 0.1 units of range of goal, set current position to goalPos and send "finished" trigger to state machine,
    // Not doing this results in the cube oscillating at the goal position
    if (
      Math.abs(xPDiff) < 0.1 &&
      Math.abs(yPDiff) < 0.1 &&
      Math.abs(zPDiff) < 0.1 &&
      Math.abs(xRDiff) < 0.1 &&
      Math.abs(yRDiff) < 0.1 &&
      Math.abs(zRDiff) < 0.1
    ) {
      meshRef.current.position.x = goalPos.x;
      meshRef.current.position.y = goalPos.y;
      meshRef.current.position.z = goalPos.z;
      meshRef.current.rotation.x = goalRot.x;
      meshRef.current.rotation.y = goalRot.y;
      meshRef.current.rotation.z = goalRot.z;

      send({ type: "MOVING", x: goalPos.x, y: goalPos.y, z: goalPos.z });
      send({ type: "ROTATING", x: goalRot.x, y: goalRot.y, z: goalRot.z });
      send({ type: "FINISHED" });
      return;
    }

    // calculate the current position
    const normalizedP = new Vector3(xPDiff, yPDiff, zPDiff).normalize();

    meshRef.current.position.x += speedFactor * normalizedP.x;
    meshRef.current.position.y += speedFactor * normalizedP.y;
    meshRef.current.position.z += speedFactor * normalizedP.z;

    send({
      type: "MOVING",
      x: meshRef.current.position.x,
      y: meshRef.current.position.y,
      z: meshRef.current.position.z,
    });

    // Using the percentage of completion of the position of the cube, calculate the rotation so that the cube
    // slowly rotates while the cube is translating. The percentage of completion will be the normalized version of
    // the vector containing the distances left to traverse (normalizedP above)

    meshRef.current.rotation.x = xRDiff * Math.abs(normalizedP.x);
    meshRef.current.rotation.y = yRDiff * Math.abs(normalizedP.y);
    meshRef.current.rotation.z = zRDiff * Math.abs(normalizedP.z);

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
