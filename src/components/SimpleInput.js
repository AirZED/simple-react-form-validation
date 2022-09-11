import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  //UseInput Hook for name Input Validation
  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameValueChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: nameInputReset,
  } = useInput((value) => value.trim() !== "");

  //UseInput Hook for email Input Validation
  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailValueChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));

  //Validating Form
  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  //Function that handles submit of form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    //Creating object for Submitted user details
    const userObj = {
      name: enteredName,
      email: enteredEmail,
    };

    console.log(userObj);

    nameInputReset();
    emailInputReset();
  };

  const nameInputClass = !nameInputHasError
    ? "form-control"
    : "form-control invalid";
  const emailInputClass = !emailInputHasError
    ? "form-control"
    : "form-control invalid";

  return (
    <form onSubmit={handleSubmit}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameValueChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>

      <div className={emailInputClass}>
        <label htmlFor="name">Your Email</label>
        <input
          type="text"
          id="email"
          value={enteredEmail}
          onChange={emailValueChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputHasError && <p className="error-text">Add valid email</p>}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid && true}>Submit</button>
      </div>
      
    </form>
  );
};

export default SimpleInput;
