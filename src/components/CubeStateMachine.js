import { createMachine, assign } from 'xstate';

const cubeMachine = createMachine({
  id: "cube",
  initial: "idle",
  context: {
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  states: {
    idle: {
      on: {
        MOVE: {
          actions: assign((context, event) => {
            const { x, y, z } = event;
            return {
              position: {
                x: x !== undefined ? x : context.position.x,
                y: y !== undefined ? y : context.position.y,
                z: z !== undefined ? z : context.position.z
              },
              rotation: context.rotation
            };
          })
        },
        ROTATE: {
          actions: assign((context, event) => {
            const { x, y, z } = event;
            return {
              position: context.position,
              rotation: {
                x: x !== undefined ? x : context.rotation.x,
                y: y !== undefined ? y : context.rotation.y,
                z: z !== undefined ? z : context.rotation.z
              }
            };
          })
        }
      }
    }
  }
});

export default cubeMachine;
