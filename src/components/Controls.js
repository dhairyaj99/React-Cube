import React from 'react';

function Controls(props) {
  const { send } = props;

  function handleXInputChange(event){
    const newX = parseInt(event.target.value, 10);
    console.log('X:', newX);
    send({type: 'MOVE', x: newX});
  }
  
  function handleYInputChange(event){
    const newY = parseInt(event.target.value, 10);
    console.log('Y:', newY);
    send({type: 'MOVE', y: newY});
  }
  
  function handleZInputChange(event){
    const newZ = parseInt(event.target.value, 10);
    console.log('Z:', newZ);
    send({type: 'MOVE', z: newZ});
  }
  
  return (
    <div className="controls">
      <label>
        X:
        <input type="range" min="-100" max="100" onInput={handleXInputChange} />
      </label>
      <label>
        Y:
        <input type="range" min="-100" max="100" onInput={handleYInputChange} />
      </label>
      <label>
        Z:
        <input type="range" min="-100" max="100" onInput={handleZInputChange} />
      </label>
    </div>
  );
}

export default Controls;
