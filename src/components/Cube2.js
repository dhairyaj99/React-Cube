import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";

const Cube = (props) => {
  const { send, machineState } = props;
  const meshRef = useRef();

  useFrame((state, delta) => {
    var initialState = {
      position: [
        machineState.context.startPosition.x,
        machineState.context.startPosition.y,
        machineState.context.startPosition.z,
      ],
      rotation: [
        machineState.context.startRotation.x,
        machineState.context.startRotation.y,
        machineState.context.startRotation.z,
      ],
    };
    var goalState = {
      position: [
        machineState.context.goalPosition.x,
        machineState.context.goalPosition.y,
        machineState.context.goalPosition.z,
      ],
      rotation: [
        machineState.context.goalRotation.x,
        machineState.context.goalRotation.y,
        machineState.context.goalRotation.z,
      ],
    };

    console.log("GOAL STATE ", goalState, "INITIAL STATE ", initialState);

    if (!meshRef) {
      return;
    }

    const elapsedTime = state.clock.getElapsedTime();
    const t = Math.min(elapsedTime / 15, 1); // Animation duration is 15 seconds

    if (t >= 1) {
      send({
        type: "SETSTARTPOS",
        x: goalState.position.x,
        y: goalState.position.y,
        z: goalState.position.z,
      });
      send({
        type: "SETSTARTROT",
        x: goalState.rotation.x,
        y: goalState.rotation.y,
        z: goalState.rotation.z,
      });
      send({ type: "FINISHED" });
      return;
    }

    console.log("TIME ", t);

    if (t == 1) {
      send({
        type: "SETSTARTPOS",
        x: goalState.position.x,
        y: goalState.position.y,
        z: goalState.position.z,
      });
      send({
        type: "SETSTARTROT",
        x: goalState.rotation.x,
        y: goalState.rotation.y,
        z: goalState.rotation.z,
      });
      send({ type: "FINISHED" });
      return;
    }

    const position = [
      (1 - t) * initialState.position[0] + t * goalState.position[0],
      (1 - t) * initialState.position[1] + t * goalState.position[1],
      (1 - t) * initialState.position[2] + t * goalState.position[2],
    ];

    const rotation = [
      (1 - t) * initialState.rotation[0] + t * goalState.rotation[0],
      (1 - t) * initialState.rotation[1] + t * goalState.rotation[1],
      (1 - t) * initialState.rotation[2] + t * goalState.rotation[2],
    ];

    meshRef.current.position.set(position[0], position[1], position[2]);
    meshRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);

    send({
      type: "MOVING",
      x: position[0],
      y: position[1],
      z: position[2],
    });

    send({
      type: "ROTATING",
      x: rotation[0],
      y: rotation[1],
      z: rotation[2],
    });
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
