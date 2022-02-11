// put to halt for now
// import { assign, createMachine } from "@xstate/fsm";

// type Age = "AGE_BELOW_5" | "AGE_BETWEEN_5_AND_12";
// type Vaccine = string;

// interface Question {
//   description: string;
//   checked: null | boolean;
// }

// interface QuestionaireContext {
//   questionIndex: number;
//   questions: Question[];
//   age?: string;
//   vaccine?: string;
//   error?: string;
// }

// type QuestionaireEvent =
//   | { type: "SET_AGE"; age: Age }
//   | { type: "SET_VACCINE"; vaccine: Vaccine }
//   | { type: "YES" }
//   | { type: "NO" };

// type QuestionaireState =
//   | {
//       value: "AGE_SELECTOR";
//       context: QuestionaireContext & {
//         age: undefined;
//         error: undefined;
//         vaccine: undefined;
//       };
//     }
//   | {
//       value: "IS_BOOSTER";
//       context: QuestionaireContext & {
//         age: Age;
//         error: undefined;
//         vaccine: undefined;
//       };
//     }
//   | {
//       value: "BOOSTER_MORE_THAN_3_MONTH_AGO";
//       context: QuestionaireContext & {
//         age: Age;
//         error: undefined;
//         vaccine: undefined;
//       };
//     }
//   | {
//       value: "ARE_YOU_PREGNANT";
//       context: QuestionaireContext & {
//         age: Age;
//         error: undefined;
//         vaccine: undefined;
//       };
//     }
//   | {
//       value: "ERROR";
//       context: QuestionaireContext & {
//         error: string;
//       };
//     }
//   | {
//       value: "VACCINE_FOUND";
//       context: QuestionaireContext & {
//         error: undefined;
//         vaccine: Vaccine;
//       };
//     };

// export const questionaireMachine = createMachine<
//   QuestionaireContext,
//   QuestionaireEvent,
//   QuestionaireState
// >(
//   {
//     id: "questionaireMachine",
//     initial: "AGE_SELECTOR",
//     context: {
//       questions: [],
//       questionIndex: 0,
//       vaccine: undefined,
//     },
//     states: {
//       ["AGE_SELECTOR"]: {
//         on: {
//           ["SET_AGE"]: [
//             {
//               cond: (_context, event) =>
//                 event.type === "SET_AGE" && event.age === "AGE_BELOW_5",
//               target: "ERROR",
//               actions: ["setAge"],
//             },
//             {
//               cond: (_context, event) =>
//                 event.type === "SET_AGE" &&
//                 event.age === "AGE_BETWEEN_5_AND_12",
//               target: "VACCINE_FOUND",
//               actions: ["setAge", "setVaccine"],
//             },
//             {
//               cond: (_context, event) =>
//                 event.type === "SET_AGE" &&
//                 event.age === "AGE_BETWEEN_5_AND_12",
//               target: "IS_BOOSTER",
//               actions: ["setAge"],
//             },
//           ],
//         },
//       },
//       ["IS_BOOSTER"]: {
//         on: {
//           ["YES"]: {
//             target: "BOOSTER_MORE_THAN_3_MONTH_AGO",
//           },
//           ["NO"]: {
//             target: "ARE_YOU_PREGNANT",
//           },
//         },
//       },
//       ["BOOSTER_MORE_THAN_3_MONTH_AGO"]: {
//         on: {
//           ["NO"]: {
//             target: "ERROR",
//             actions: ["setError"],
//           },
//           ["YES"]: {
//             target: "ARE_YOU_PREGNANT",
//           },
//         },
//       },
//       ["ARE_YOU_PREGNANT"]: {
//         on: {
//           ["YES"]: {
//             target: "VACCINE_FOUND",
//             actions: ["setVaccineBiontech"],
//           },
//           ["NO"]: {
//             target: "VACCINE_FOUND",
//             actions: ["setVaccineMrna"],
//           },
//         },
//       },
//       ["ERROR"]: {},
//       ["VACCINE_FOUND"]: {},
//     },
//   },
//   {
//     actions: {
//       setAge: assign({
//         age: (ctx, event) => (event.type === "SET_AGE" ? event.age : ctx.age),
//       }),
//       setVaccine: assign({
//         age: (ctx, event) =>
//           event.type === "SET_VACCINE" ? event.vaccine : ctx.vaccine,
//       }),
//       setError: assign({
//         error: (ctx, event) => ctx.error,
//       }),
//       // prevQuestionIndex: assign({
//       //   questionIndex: (ctx, event) => ctx.questionIndex - 1,
//       // }),
//       // nextQuestionIndex: assign({
//       //   questionIndex: (ctx, event) => ctx.questionIndex + 1,
//       // }),
//     },
//   }
// );
export default null;
