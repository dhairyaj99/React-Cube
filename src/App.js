import './App.css';
import React, { useState } from 'react';
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import "./styles.css";

import Cube from "./components/Cube";
import Grid from './components/Grid';
import Controls from './components/Controls';
import cubeMachine from './components/CubeStateMachine';
import { useMachine } from '@xstate/react'

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
        <Cube position={{ x: state.context.position.x, y: state.context.position.y, z: state.context.position.z }} />
        <Grid size={100} />
      </Canvas>
      <div className="controls">
        <Controls send={send} />
        
      </div>
    </>
  );
}

export default App;
