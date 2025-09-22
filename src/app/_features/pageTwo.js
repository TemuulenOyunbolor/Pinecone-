"use client";

import { FormInputPassword } from "../_components/form-inputpassword";
import { FormInput } from "../_components/from-input";

import { useState } from "react";

const checkIfInputHasSpecialCharacters = (string) => {
  return /[!#$%^&*()_+|}{":><~]/.test(string);
};
const checkIfInputHasNumbers = (string) => {
  return /\d/.test(string);
};
const checkIfInputHasLetters = (string) => {
  return /[a-zA-Z]/.test(string);
};

const addPageTwoValuesToLocalStorage = (values) => {
  localStorage.setItem("pageOne", JSON.stringify(values));
};

export const PageTwo = (props) => {
  const { handleBackPage, handleNextPage } = props;

  const getPageTwoValuesFromLocalStorage = () => {
    const values = localStorage.getItem("pageOne");
    if (values) {
      return JSON.parse(values);
    } else {
      return { email: "", phoneNumber: "", password: "", confirmPassword: "" };
    }
  };

  const [formValues, setFormValues] = useState(
    getPageTwoValuesFromLocalStorage()
  );
  const [errorState, setErrorState] = useState({});

  const stringObject = JSON.stringify(formValues);

  const object = JSON.parse(stringObject);

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormValues({ ...formValues, [inputName]: inputValue });
  };

  const validateInput = () => {
    const errors = {};
    if (checkIfInputHasSpecialCharacters(formValues.email)) {
      errors.email = "asd";
    }
    if (
      checkIfInputHasLetters(formValues.phoneNumber) ||
      formValues.phoneNumber.length !== 8
    ) {
      errors.phoneNumber = "asd";
    }
    if (checkIfInputHasSpecialCharacters(formValues.password)) {
      errors.password = "asd";
    }
    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "asd";
    }
    return errors;
  };
  const handleContinueButton = () => {
    const errors = validateInput();

    if (Object.keys(errors).length === 0) {
      setErrorState({});
      addPageTwoValuesToLocalStorage;
      handleNextPage();
    } else {
      setErrorState(errors);
    }
  };

  const shouldDisableButton = () => {
    return (
      formValues.email.length === 0 ||
      formValues.phoneNumber.length === 0 ||
      formValues.password.length === 0 ||
      formValues.confirmPassword.length === 0
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
            inputTag={"Email"}
            handleChange={handleInputChange}
            name={"email"}
            value={formValues.email}
            error={errorState.email}
            errorMessage={"Please provide a valid email address."}
          />
          <FormInput
            inputTag={"Phone Number"}
            handleChange={handleInputChange}
            name={"phoneNumber"}
            value={formValues.phoneNumber}
            error={errorState.phoneNumber}
            errorMessage={"Please enter a valid phone number."}
          />
          <FormInputPassword
            inputTag={"Password"}
            handleChange={handleInputChange}
            name={"password"}
            value={formValues.password}
            error={errorState.password}
            errorMessage={"Password must include letters and numbers."}
          />
          <FormInputPassword
            inputTag={"Confirm password"}
            handleChange={handleInputChange}
            name={"confirmPassword"}
            value={formValues.confirmPassword}
            error={errorState.confirmPassword}
            errorMessage={"Passwords do not match. Please try again."}
          />

          <div className="continue">
            <button onClick={handleBackPage} className="backbutton">
              <img className="sum" src="./sum1.png"></img> Back
            </button>

            <button
              disabled={shouldDisableButton()}
              onClick={handleContinueButton}
              className="continuebutton"
              style={{ width: 280 }}
            >
              Continue 2/3 <img className="sum" src="./sum.png"></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
