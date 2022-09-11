import { useReducer } from "react";

const initialInputState = {
  value: "",
  fieldIsTouched: false,
};

const inputReducer = (state, action) => {
  if (action.type === "SET_VALUE") {
    return {
      value: action.val,
      fieldIsTouched: state.fieldIsTouched,
    };
  } else if (action.type === "BLUR") {
    return {
      value: state.value,
      fieldIsTouched: !state.fieldIsTouched,
    };
  } else if (action.type === "RESET") {
    return initialInputState;
  }

  return initialInputState;
};

const useBasicForm = (validateInput) => {
  const [inputState, dispatchInputStateFn] = useReducer(
    inputReducer,
    initialInputState
  );

  const enteredValueIsValid = validateInput(inputState.value);
  const enteredValueHasError =
    !enteredValueIsValid && inputState.fieldIsTouched;

  const changeValueHandler = (event) => {
    dispatchInputStateFn({ type: "SET_VALUE", val: event.target.value });
  };

  const valueBlurHandler = () => {
    dispatchInputStateFn({ type: "BLUR" });
  };

  const reset = () => {
    dispatchInputStateFn({ type: "RESET" });
  };

  return {
    value: inputState.value,
    fieldIsTouched: inputState.fieldIsTouched,
    isValid: enteredValueIsValid,
    hasError: enteredValueHasError,
    changeValueHandler,
    valueBlurHandler,
    reset,
  };
};

export default useBasicForm;
