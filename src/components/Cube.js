import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";
import { State, matchesState } from "xstate";

const Cube = (props) => {
  const { startpos, pos, startrot, rot, send, state } = props;
  const meshRef = useRef();
  var goalPos = pos;
  var goalRot = rot;
  var startPos = startpos;
  var startRot = startrot;

  useFrame((self) => {
    if (!meshRef) {
      return;
    }

    if (state.value == "idle") {
      return;
    }

    const speedFactor = 0.03;

    const xPDiff = goalPos.x - meshRef.current.position.x;
    const yPDiff = goalPos.y - meshRef.current.position.y;
    const zPDiff = goalPos.z - meshRef.current.position.z;

    const xRDiff = goalRot.x - meshRef.current.rotation.x;
    const yRDiff = goalRot.y - meshRef.current.rotation.y;
    const zRDiff = goalRot.z - meshRef.current.rotation.z;

    console.log(
      "CURRENT POS",
      meshRef.current.position.x,
      meshRef.current.position.y,
      meshRef.current.position.z
    );

    // If we are within 0.1 units of range of goal, set current position to goalPos and send "finished" trigger to state machine,
    // Not doing this results in the cube oscillating at the goal position
    if (
      Math.abs(xPDiff) < 0.2 &&
      Math.abs(yPDiff) < 0.2 &&
      Math.abs(zPDiff) < 0.2 &&
      Math.abs(xRDiff) < 0.2 &&
      Math.abs(yRDiff) < 0.2 &&
      Math.abs(zRDiff) < 0.2
    ) {
      meshRef.current.position.x = goalPos.x;
      meshRef.current.position.y = goalPos.y;
      meshRef.current.position.z = goalPos.z;
      meshRef.current.rotation.x = goalRot.x;
      meshRef.current.rotation.y = goalRot.y;
      meshRef.current.rotation.z = goalRot.z;

      // Since we are finished with this transformation, set the start pos and rot to the current pos and rot,
      // this means we will be able to reference it in the next transformation
      send({ type: "SETSTARTPOS", x: goalPos.x, y: goalPos.y, z: goalPos.z });
      send({ type: "SETSTARTROT", x: goalRot.x, y: goalRot.y, z: goalRot.z });
      send({ type: "FINISHED" });
      return;
    }

    // ---------------------- calculate the current position

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

    //----------------------- calculate the current rotation based on position

    // Using the percentage of completion of the position of the cube, calculate the rotation so that the cube
    // slowly rotates while the cube is translating. The percentage of completion will be the normalized version of
    // the vector containing the distances left to traverse (normalizedP above)

    console.log(
      "START POS",
      state.context.startPosition,
      "START ROT",
      state.context.startRotation
    );
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
