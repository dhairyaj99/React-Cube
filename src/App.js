import "./App.css";
import React, { useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import "./styles.css";
import { Line } from "three";

import Cube from "./components/Cube";
import Axis from "./components/Axis";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import cubeMachine from "./components/CubeStateMachine";
import { useMachine } from "@xstate/react";

function App() {
  const [state, send] = useMachine(cubeMachine);
  console.log(state.context.position.x);
  return (
    <>
      <Canvas camera={{ position: [10, 25, 100] }}>
        {/* Canvas Controls */}
        <OrbitControls />
        {/* Lighting */}
        <directionalLight intensity={0.5} position={[6, 2, 1]} />
        <ambientLight intensity={0.05} />
        <Stars />
        {/* View Components */}
        <Cube
          position={{
            x: state.context.position.x,
            y: state.context.position.y,
            z: state.context.position.z,
          }}
          rotation={{
            x: state.context.rotation.x,
            y: state.context.rotation.y,
            z: state.context.rotation.z,
          }}
        />
        {/* <Grid size={100} /> */}
        {/*Line from origin to cube*/}
        <Axis
          start={{
            x: 0,
            y: 0,
            z: 0,
          }}
          end={{
            x: state.context.position.x,
            y: state.context.position.y,
            z: state.context.position.z,
          }}
        />
        <Axis
          start={{
            x: 0,
            y: 0,
            z: 0,
          }}
          end={{
            x: state.context.position.x,
            y: 0,
            z: 0,
          }}
          type="x"
        />
        <Axis
          start={{
            x: state.context.position.x,
            y: 0,
            z: 0,
          }}
          end={{
            x: state.context.position.x,
            y: state.context.position.y,
            z: 0,
          }}
          type="y"
        />
        <Axis
          start={{
            x: state.context.position.x,
            y: state.context.position.y,
            z: 0,
          }}
          end={{
            x: state.context.position.x,
            y: state.context.position.y,
            z: state.context.position.z,
          }}
          type="z"
        />
      </Canvas>
      <div className="controls">
        <Controls send={send} />
      </div>
    </>
  );
}

export default App;
