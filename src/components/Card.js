import React, { useState } from 'react';

function Card({ x, y, z, rotation, onChange }) {
  const [cardX, setCardX] = useState(x);
  const [cardY, setCardY] = useState(y);
  const [cardZ, setCardZ] = useState(z);
  const [cardRotation, setCardRotation] = useState(rotation);

  const handleXChange = (event) => {
    setCardX(event.target.value);
    onChange({ x: event.target.value });
  };

  const handleYChange = (event) => {
    setCardY(event.target.value);
    onChange({ y: event.target.value });
  };

  const handleZChange = (event) => {
    setCardZ(event.target.value);
    onChange({ z: event.target.value });
  };

  const handleRotationChange = (event) => {
    setCardRotation(event.target.value);
    onChange({ rotation: event.target.value });
  };

  return (
    <div className="card">
      <label>
        X: <input type="number" value={cardX} onChange={handleXChange} />
      </label>
      <label>
        Y: <input type="number" value={cardY} onChange={handleYChange} />
      </label>
      <label>
        Z: <input type="number" value={cardZ} onChange={handleZChange} />
      </label>
      <label>
        Rotation:{' '}
        <input
          type="number"
          value={cardRotation}
          min="-180"
          max="180"
          onChange={handleRotationChange}
        />
      </label>
    </div>
  );
}

export default Card;
