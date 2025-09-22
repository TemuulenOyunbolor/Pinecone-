"use client";

import { stringifyCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { FormInput } from "../_components/from-input";

import { useState } from "react";

const checkIfInputHasSpecialCharacters = (string) => {
  return /[!@#$%^&*()_+|}{":><~]/.test(string);
};
const checkIfInputHasNumbers = (string) => {
  return /\d/.test(string);
};

const addPageOneValuesToLocalStorage = (values) => {
  localStorage.setItem("pageOne", JSON.stringify(values));
};

export const PageOne = (props) => {
  const { handleNextPage } = props;

  const getPageOneValuesFromLocalStorage = () => {
    const values = localStorage.getItem("pageOne");
    if (values) {
      return JSON.parse(values);
    } else {
      return { firstName: "", lastName: "", userName: "" };
    }
  };

  const [formValues, setFormValues] = useState(
    getPageOneValuesFromLocalStorage()
  );

  const stringObject = JSON.stringify(formValues);

  const object = JSON.parse(stringObject);

  const [errorState, setErrorState] = useState({});

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormValues({ ...formValues, [inputName]: inputValue });
  };

  const validateInput = () => {
    const errors = {};
    if (
      checkIfInputHasNumbers(formValues.firstName) ||
      checkIfInputHasSpecialCharacters(formValues.firstName)
    ) {
      errors.firstName = "asd";
    }
    if (
      checkIfInputHasNumbers(formValues.lastName) ||
      checkIfInputHasSpecialCharacters(formValues.lastName)
    ) {
      errors.lastName = "asd";
    }
    if (
      checkIfInputHasNumbers(formValues.userName) ||
      checkIfInputHasSpecialCharacters(formValues.userName)
    ) {
      errors.userName = "asd";
    }
    return errors;
  };
  const handleContinueButton = () => {
    console.log(formValues);

    const errors = validateInput();
    console.log(errors);

    if (Object.keys(errors).length === 0) {
      setErrorState({});
      addPageOneValuesToLocalStorage(formValues);
      handleNextPage();
    } else {
      setErrorState(errors);
    }
  };

  const shouldDisableButton = () => {
    return (
      formValues.firstName.length === 0 ||
      formValues.lastName.length === 0 ||
      formValues.userName.length === 0
    );
  };

  return (
    <div className="fullcontainer">
      <div className="container">
        <div className="header">
          <img className="img" src="./logo.png"></img>
          <div>
            <h1>Join Us! 😎 </h1>
          </div>
          <div>Please provide all current information accurately.</div>
        </div>
        <div className="input">
          <FormInput
            inputTag={"First Name"}
            handleChange={handleInputChange}
            name={"firstName"}
            value={formValues.firstName}
            error={errorState.firstName}
            errorMessage={
              "First name cannot contain special characters or numbers."
            }
          />
          <FormInput
            inputTag={"Last Name"}
            handleChange={handleInputChange}
            name={"lastName"}
            value={formValues.lastName}
            error={errorState.lastName}
            errorMessage={
              "Last name cannot contain special characters or numbers."
            }
          />
          <FormInput
            inputTag={"User Name"}
            handleChange={handleInputChange}
            name={"userName"}
            value={formValues.userName}
            error={errorState.userName}
            errorMessage={
              "This username is already taken. Please choose another one."
            }
          />

          <div className="continue">
            <button
              disabled={shouldDisableButton()}
              onClick={handleContinueButton}
              type="submit"
              className="continuebutton"
            >
              Continue 1/3 <img className="sum" src="./sum.png"></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
