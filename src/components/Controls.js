import React from "react";

function Controls(props) {
  const { send } = props;

  function handleXPositionChange(event) {
    const newX = parseFloat(event.target.value);
    console.log("X:", newX);
    send({ type: "MOVE", x: newX });
  }

  function handleYPositionChange(event) {
    const newY = parseFloat(event.target.value);
    console.log("Y:", newY);
    send({ type: "MOVE", y: newY });
  }

  function handleZPositionChange(event) {
    const newZ = parseFloat(event.target.value);
    console.log("Z:", newZ);
    send({ type: "MOVE", z: newZ });
  }

  function handleXRotationChange(event) {
    const newX = parseFloat(event.target.value);
    console.log("X:", newX);
    send({ type: "ROTATE", x: newX });
  }

  function handleYRotationChange(event) {
    const newY = parseFloat(event.target.value);
    console.log("Y:", newY);
    send({ type: "ROTATE", y: newY });
  }

  function handleZRotationChange(event) {
    const newZ = parseFloat(event.target.value);
    console.log("Z:", newZ);
    send({ type: "ROTATE", z: newZ });
  }

  return (
    <div className="controls">
      <h2>Position Control</h2>
      <div className="positionControlGroup">
        <div className="xControl">
          <label> X Position </label>
          <input
            type="number"
            min="-100"
            max="100"
            onChange={handleXPositionChange}
            step="any"
          />
        </div>
        <div className="yControl">
          <label> Y Position </label>
          <input
            type="number"
            min="-100"
            max="100"
            onChange={handleYPositionChange}
            step="any"
          />
        </div>
        <div className="zControl">
          <label> Z Position </label>
          <input
            type="number"
            min="-100"
            max="100"
            onChange={handleZPositionChange}
            step="any"
          />
        </div>
      </div>
      <h2>Rotation Control</h2>
      <div className="rotationControlGroup">
        <div className="xControl">
          <label> X Rotation </label>
          <input
            type="number"
            min="-180"
            max="180"
            onInput={handleXRotationChange}
            step="any"
          />
        </div>
        <div className="yControl">
          <label> Y Rotation </label>
          <input
            type="number"
            min="-180"
            max="180"
            onInput={handleYRotationChange}
            step="any"
          />
        </div>
        <div className="zControl">
          <label> Z Rotation </label>
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
