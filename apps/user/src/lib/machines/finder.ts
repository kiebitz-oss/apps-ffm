import { createMachine } from "@xstate/fsm";

interface Question {
  description: string;
  checked: null | boolean;
}

interface FinderContext {
  provider?: number;
  appointment?: Question[];
  date?: Date;
  error?: string;
  vaccine?: string;
}

type FinderEvent =
  | { type: "SET_PROVIDER" }
  | { type: "SET_DATE" }
  | { type: "SET_APPOINTMENT" }
  | { type: "CONFIRM" };

type FinderState =
  | {
      value: "SELECT_PROVIDER";
      context: FinderContext;
    }
  | {
      value: "SELECT_APPOINTMENT";
      context: FinderContext;
    }
  | {
      value: "VERIFY";
      context: FinderContext;
    }
  | {
      value: "SUCCESS";
      context: FinderContext;
    };

export const finderMachine = createMachine<
  FinderContext,
  FinderEvent,
  FinderState
>({
  id: "finderMachine",
  initial: "SELECT_PROVIDER",
  context: {
    vaccine: undefined,
  },
  states: {
    ["SELECT_PROVIDER"]: {
      on: {
        ["SET_PROVIDER"]: {
          target: "SELECT_APPOINTMENT",
        },
      },
    },
    ["SELECT_APPOINTMENT"]: {
      on: {
        ["SET_DATE"]: {
          target: "SELECT_APPOINTMENT",
        },
        ["SET_APPOINTMENT"]: {
          target: "VERIFY",
        },
      },
    },
    ["VERIFY"]: {
      on: {
        ["CONFIRM"]: {
          target: "SUCCESS",
        },
      },
    },
    ["SUCCESS"]: {
      on: {},
    },
  },
});
