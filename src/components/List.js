import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { generateUUID } from 'three/src/math/MathUtils';
import Card from './Card';

function Container() {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ x: 0, y: 0, z: 0, rotation: 0 });

  const handleAddCard = () => {
    setNewCard({ id: generateUUID(), x: 0, y: 0, z: 0, rotation: 0 });
    setCards([...cards, newCard]);
  };

  const handleRemoveCard = (index) => {
    // Remove a card from the list at the given index
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  };

  const handleUpdateCardPosition = (result) => {
    // Update the position of a card in the list after it is dragged
    const { source, destination } = result;
    if (!destination) return; // Card was dropped outside the list
    const newCards = [...cards];
    const [removed] = newCards.splice(source.index, 1);
    newCards.splice(destination.index, 0, removed);
    setCards(newCards.map((card) => ({ ...card })));
  };

  const handleExecutePosListCommands = () => {
    console.log(cards.length);
    for (let cardIdx = 0; cardIdx < cards.length; cardIdx++) {
      console.log(cards[cardIdx]);
    }
  };

  return (
    <div className="container">
      <div>
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
                        x={card.x}
                        y={card.y}
                        z={card.z}
                        rotation={card.rotation}
                        onChange={(updatedCard) => {
                          const newCards = [...cards];
                          newCards[index] = {
                            ...newCards[index],
                            ...updatedCard,
                          };
                          setCards(newCards);
                        }}
                      />
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
