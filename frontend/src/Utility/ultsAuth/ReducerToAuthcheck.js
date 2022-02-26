//INITIALISE STATE
export const initialState = null;

//CREATE REDUCER FUNCTION FOR useReduce
export const Reducer = (state, application) => {
  switch (application.type) {
    case "USERIN":
      return true;
    case "USEROUT":
      return false;
    default:
      return state;
  }
};
