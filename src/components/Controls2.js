import React, { useState } from "react";

function Controls(props) {
  const { send } = props;
  const [PX, setPX] = useState(0);
  const [PY, setPY] = useState(0);
  const [PZ, setPZ] = useState(0);
  const [RX, setRX] = useState(0);
  const [RY, setRY] = useState(0);
  const [RZ, setRZ] = useState(0);

  function handleXPositionChange(event) {
    if (!event.target.value) {
      setPX(0);
    }
    setPX(parseFloat(event.target.value));
  }

  function handleYPositionChange(event) {
    if (!event.target.value) {
      setPY(0);
    }
    setPY(parseFloat(event.target.value));
  }

  function handleZPositionChange(event) {
    if (!event.target.value) {
      setPZ(0);
    }
    setPZ(parseFloat(event.target.value));
  }

  function handleXRotationChange(event) {
    if (!event.target.value) {
      setRX(0);
    }
    setRX((parseFloat(event.target.value) * Math.PI) / 180);
  }

  function handleYRotationChange(event) {
    if (!event.target.value) {
      setRY(0);
    }
    setRY((parseFloat(event.target.value) * Math.PI) / 180);
  }

  function handleZRotationChange(event) {
    if (!event.target.value) {
      setRZ(0);
    }
    setRZ((parseFloat(event.target.value) * Math.PI) / 180);
  }

  const handleExecuteTransformation = () => {
    send({ type: "SETPOS", x: PX, y: PY, z: PZ });
    send({ type: "SETROT", x: RX, y: RY, z: RZ });
    send({ type: "EXECUTE" });
  };

  return (
    <div className="controls">
      <h2>Direct Control</h2>
      <div className="buttons">
        <button onClick={handleExecuteTransformation}>Execute</button>
      </div>
      <h2>Position</h2>
      <div className="positionControlGroup">
        <div className="control">
          <label className="labelX"> X Position </label>
          <input
            type="number"
            min="-100"
            max="100"
            onChange={handleXPositionChange}
            step="any"
            value={PX}
          />
        </div>
        <div className="control">
          <label className="labelY"> Y Position </label>
          <input
            type="number"
            min="-100"
            max="100"
            onChange={handleYPositionChange}
            step="any"
            value={PY}
          />
        </div>
        <div className="control">
          <label className="labelZ"> Z Position </label>
          <input
            type="number"
            min="-100"
            max="100"
            onChange={handleZPositionChange}
            step="any"
            value={PZ}
          />
        </div>
      </div>
      <h2>Rotation</h2>
      <div className="rotationControlGroup">
        <div className="control">
          <label className="labelX"> X Rotation </label>
          <input
            type="number"
            min="-180"
            max="180"
            onInput={handleXRotationChange}
            step="any"
          />
        </div>
        <div className="control">
          <label className="labelY"> Y Rotation </label>
          <input
            type="number"
            min="-180"
            max="180"
            onInput={handleYRotationChange}
            step="any"
          />
        </div>
        <div className="control">
          <label className="labelZ"> Z Rotation </label>
          <input
            type="number"
            min="-180"
            max="180"
            onInput={handleZRotationChange}
            step="any"
          />
        </div>
      </div>
    </div>
  );
}

export default Controls;
