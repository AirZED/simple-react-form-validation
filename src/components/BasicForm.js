import useBasicForm from "../hooks/basic-form-hook";

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    changeValueHandler: changeNameHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useBasicForm((value) => value.trim() !== "" && !value.includes(" "));

  const {
    value: enteredLastName,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    changeValueHandler: changelNameHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useBasicForm((value) => value.trim() !== "" && !value.includes(" "));

  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    changeValueHandler: changeEmailHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useBasicForm(
    (value) => value.trim() !== "" && value.includes("@") && value.includes(".")
  );

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!firstNameIsValid && !lastNameIsValid && !emailIsValid) {
      return;
    }

    console.log(enteredFirstName, enteredLastName, enteredEmail);

    resetName();
    resetLastName();
    resetEmail();
  };

  //Validates form to add class Name
  const addInvalidClassName = (value) => {
    if (value) {
      return "form-control invalid";
    } else {
      return "form-control";
    }
  };

  const nameClassName = addInvalidClassName(firstNameHasError);
  const lastNameClassName = addInvalidClassName(lastNameHasError);
  const emailClassName = addInvalidClassName(emailHasError);

  return (
    <form onSubmit={submitFormHandler}>
      <div className="control-group">
        <div className={nameClassName}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={enteredFirstName}
            onChange={changeNameHandler}
            onBlur={nameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text">Name cannot be left blank</p>
          )}
        </div>
        <div className={lastNameClassName}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={enteredLastName}
            onChange={changelNameHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text">Last Name cannot be left black</p>
          )}
        </div>
      </div>
      <div className={emailClassName}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="email"
          id="name"
          value={enteredEmail}
          onChange={changeEmailHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <p className="error-text">Input Valid Email</p>}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!formIsValid && true}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
