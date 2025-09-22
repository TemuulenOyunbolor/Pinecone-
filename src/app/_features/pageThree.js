"use client";

import { useState } from "react";

const addPageThreeValuesLocalStorage = (values) => {
  localStorage.setItem("pageThree", JSON.stringify(values));
};

export const PageThree = (props) => {
  const { handleBackPage, handleNextPage } = props;

  const getPageThreeValuesFromLocalStorage = () => {
    const values = localStorage.getItem("pageThree");

    console.log(values, "haha");

    if (values) {
      return JSON.parse(values);
    } else {
      return { image: "", date: "" };
    }
  };

  const [formValues, setFormValues] = useState(
    getPageThreeValuesFromLocalStorage()
  );
  console.log("hehe", formValues);

  const [errorState, setErrorState] = useState({});

  const stringObject = JSON.stringify(formValues);

  const handleInputChange = (e) => {
    const dateValue = e.target.value;
    const dateName = e.target.name;
    setFormValues({ ...formValues, [dateName]: dateValue });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues({ ...formValues, image: URL.createObjectURL(file) });
    }
  };

  console.log(formValues);

  const validateInput = () => {
    const errors = {};
    if (formValues.image === "") {
      errors.image = "asd";
    }
    if (formValues.date === "") {
      errors.date = "asd";
    }

    return errors;
  };

  const handleContinueButton = () => {
    const errors = validateInput();

    if (Object.keys(errors).length === 0) {
      setErrorState({});
      addPageThreeValuesLocalStorage(formValues);
      handleNextPage();
    } else {
      setErrorState(errors);
    }
  };

  //    const handleImage= ()=> { }

  //   const shouldDisableButton = () => {
  //     return formValues.image === 0 || formValues.date === 0;
  //   };

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
        <div className="dateandimg">
          <div>
            Date of birth<span style={{ color: "red" }}>* </span>
            <input
              value={formValues.date}
              type="date"
              name="date"
              className={errorState.date ? "input-error" : ""}
              onChange={handleInputChange}
            />
            {errorState.date && (
              <p style={{ color: "red" }}>Please select a date.</p>
            )}
          </div>
          <div>
            <p>
              Profile image <span style={{ color: "red" }}>* </span>
            </p>
            <label
              htmlFor="id-upload"
              className="picture"
              style={
                formValues.image
                  ? { border: "none" }
                  : { border: "2px dashed grey" }
              }
            >
              {formValues.image ? (
                <img className="picture" src={formValues.image} />
              ) : (
                <>
                  <span>
                    <img src="./Vector.png" />{" "}
                  </span>{" "}
                  <p>Add image</p>{" "}
                </>
              )}
            </label>
            <input
              id="id-upload"
              accept="image/*"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            {errorState.image && (
              <p style={{ color: "red" }}>Image cannot be blank</p>
            )}
          </div>
        </div>
        <div className="continuethree">
          <button onClick={handleBackPage} className="backbutton">
            <img className="sum" src="./sum1.png"></img> Back
          </button>

          <button
            // disabled={shouldDisableButton()}
            onClick={handleContinueButton}
            className="continuebutton"
            style={{ width: 280 }}
          >
            Submit 3/3 <img className="sum" src="./sum.png"></img>
          </button>
        </div>
      </div>
    </div>
  );
};
