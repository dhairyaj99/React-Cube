import { createMachine, assign } from "xstate";

const cubeMachine = createMachine({
  id: "cube",
  initial: "idle",
  context: {
    goalPosition: {
      x: 0,
      y: 0,
      z: 0,
    },
    goalRotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    currentPosition: {
      x: 0,
      y: 0,
      z: 0,
    },
    currentRotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  states: {
    idle: {
      on: {
        SETPOS: {
          actions: assign((context, event) => {
            const { x, y, z } = event;
            return {
              goalPosition: {
                x: x !== undefined ? x : context.goalPosition.x,
                y: y !== undefined ? y : context.goalPosition.y,
                z: z !== undefined ? z : context.goalPosition.z,
              },
              goalRotation: context.goalRotation,
            };
          }),
        },
        SETROT: {
          actions: assign((context, event) => {
            const { x, y, z } = event;
            return {
              goalPosition: context.goalPosition,
              goalRotation: {
                x: x !== undefined ? x : context.goalRotation.x,
                y: y !== undefined ? y : context.goalRotation.y,
                z: z !== undefined ? z : context.goalRotation.z,
              },
            };
          }),
        },
        EXECUTE: {
          target: "inProgress",
        },
      },
    },
    inProgress: {
      on: {
        MOVING: {
          actions: assign((context, event) => {
            const { x, y, z } = event;
            return {
              currentPosition: {
                x: x !== undefined ? x : context.currentPosition.x,
                y: y !== undefined ? y : context.currentPosition.y,
                z: z !== undefined ? z : context.currentPosition.z,
              },
              currentRotation: context.currentRotation,
            };
          }),
        },
        ROTATING: {
          actions: assign((context, event) => {
            const { x, y, z } = event;
            return {
              currentPosition: context.currentPosition,
              currentRotation: {
                x: x !== undefined ? x : context.currentRotation.x,
                y: y !== undefined ? y : context.currentRotation.y,
                z: z !== undefined ? z : context.currentRotation.z,
              },
            };
          }),
        },
        FINISHED: {
          target: "idle",
        },
      },
    },
  },
});

export default cubeMachine;
