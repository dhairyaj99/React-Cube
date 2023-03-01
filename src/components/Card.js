import React, { useState } from 'react';

function Card({ px, py, pz, rx, ry, rz, onChange }) {
  const [cardPX, setCardPX] = useState(px);
  const [cardPY, setCardPY] = useState(py);
  const [cardPZ, setCardPZ] = useState(pz);
  const [cardRX, setCardRX] = useState(rx);
  const [cardRY, setCardRY] = useState(ry);
  const [cardRZ, setCardRZ] = useState(rz);

  const handleXPositionChange = (event) => {
    setCardPX(event.target.value);
    onChange({ px: event.target.value });
  };

  const handleYPositionChange = (event) => {
    setCardPY(event.target.value);
    onChange({ py: event.target.value });
  };

  const handleZPositionChange = (event) => {
    setCardPZ(event.target.value);
    onChange({ pz: event.target.value });
  };

  const handleXRotationChange = (event) => {
    setCardRX(event.target.value);
    onChange({ rx: event.target.value });
  };

  const handleYRotationChange = (event) => {
    setCardRY(event.target.value);
    onChange({ ry: event.target.value });
  };

  const handleZRotationChange = (event) => {
    setCardRZ(event.target.value);
    onChange({ rz: event.target.value });
  };

  return (
    <div className="card">
      <div className="control">
        <h2>Translate</h2>
        <label className="labelX">
          X:{' '}
          <input
            type="number"
            value={cardPX}
            onChange={handleXPositionChange}
            min="-100"
            max="100"
          />
        </label>
        <label className="labelY">
          Y:{' '}
          <input
            type="number"
            value={cardPY}
            onChange={handleYPositionChange}
            min="-100"
            max="100"
          />
        </label>
        <label className="labelZ">
          Z:{' '}
          <input
            type="number"
            value={cardPZ}
            onChange={handleZPositionChange}
            min="-100"
            max="100"
          />
        </label>
      </div>
      <div className="control">
        <h2>Rotate</h2>
        <label className="labelX">
          X:{' '}
          <input
            type="number"
            value={cardRX}
            onChange={handleXRotationChange}
            min="-180"
            max="180"
          />
        </label>
        <label className="labelY">
          Y:{' '}
          <input
            type="number"
            value={cardRY}
            onChange={handleYRotationChange}
            min="-180"
            max="180"
          />
        </label>
        <label className="labelZ">
          Z:{' '}
          <input
            type="number"
            value={cardRZ}
            onChange={handleZRotationChange}
            min="-180"
            max="180"
          />
        </label>
      </div>
    </div>
  );
}

export default Card;
