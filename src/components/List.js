import { waitFor } from '@testing-library/react';
import React, { useState, useMemo, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { generateUUID } from 'three/src/math/MathUtils';
import Card from './Card';

function Container(props) {
  const { state, send, service } = props;
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    px: 0,
    py: 0,
    pz: 0,
    rx: 0,
    ry: 0,
    rz: 0,
  });

  const handleAddCard = () => {
    setNewCard({
      id: generateUUID(),
      px: 0,
      py: 0,
      pz: 0,
      rx: 0,
      ry: 0,
      rz: 0,
    });
    setCards([...cards, newCard]);
  };

  const handleRemoveCard = (cardId) => {
    const newCards = cards.filter((card) => card.id !== cardId);
    setCards(newCards);
  };

  const handleUpdateCardPosition = useCallback(
    (result) => {
      // Update the position of a card in the list after it is dragged
      const { source, destination } = result;

      if (!destination || source.index === destination.index) {
        return; // Card was dropped outside the list
      }

      const newCards = [...cards];
      const [removed] = newCards.splice(source.index, 1);

      newCards.splice(destination.index, 0, removed);
      setCards(newCards.map((card) => ({ ...card })));
    },
    [cards]
  );

  const handleExecutePosListCommands = async () => {
    // let currTopCard = cards[0];
    // console.log(currTopCard);

    console.log(cards.length);

    // let px = currTopCard.px;
    // let py = currTopCard.py;
    // let pz = currTopCard.pz;
    // let rx = currTopCard.rx;
    // let ry = currTopCard.ry;
    // let rz = currTopCard.rz;

    // send({ type: 'SETPOS', x: px, y: py, z: pz });
    // send({ type: 'SETROT', x: rx, y: ry, z: rz });
    // send({ type: 'EXECUTE' });

    while (true) {
      console.log(cards.length);
      let currTopCard = cards.shift();
      if (!currTopCard) break;
      
      let px = currTopCard.px;
      let py = currTopCard.py;
      let pz = currTopCard.px;
      let rx = currTopCard.px;
      let ry = currTopCard.px;
      let rz = currTopCard.px;

      send({ type: 'SETPOS', x: px, y: py, z: pz });
      send({ type: 'SETROT', x: rx, y: ry, z: rz });
      send({ type: 'EXECUTE' });
      const doneState = await waitFor(service, (state) =>
        state.matches('idle')
      );
      if(cards.length<1)break;
      else setCards(cards);
      console.log(state.value);
    }
  };

  return (
    <div className="controls2">
      <h2>Scheduler</h2>
      <div className="buttons">
        <button onClick={handleAddCard}>Add Card</button>
        <button onClick={handleExecutePosListCommands}>Execute</button>
      </div>

      <DragDropContext onDragEnd={handleUpdateCardPosition}>
        {cards.map((card, index) => (
          <Droppable key={String(card.id)} droppableId={String(card.id)}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Draggable
                  key={String(card.id)}
                  draggableId={String(card.id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="card"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Card
                        px={card.px}
                        py={card.py}
                        pz={card.pz}
                        rx={card.rx}
                        ry={card.ry}
                        rz={card.rz}
                        onChange={(updatedCard) => {
                          const newCards = [...cards];
                          newCards[index] = {
                            ...newCards[index],
                            ...updatedCard,
                          };
                          setCards(newCards);
                        }}
                      />
                      <button onClick={() => handleRemoveCard(card.id)}>
                        X
                      </button>
                    </div>
                  )}
                </Draggable>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default Container;
