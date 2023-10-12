import React, { useState, useRef, useImperativeHandle, useEffect } from "react";
import styles from "./Input.module.css";
import { current } from "@reduxjs/toolkit";

const NewInput = React.forwardRef((props, ref) => {
  ///////////////////
  ///////State//////
  /////////////////
  const [wasTouched, setWasTouched] = useState(false);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  //   let error = "";
  let valid = false;
  ////////////////////////////
  ////Refs and variables/////
  //////////////////////////
  const inputRef = useRef();
  useImperativeHandle(ref, () => {
    return { value: inputRef.current.value };
  });
  let currentYear = new Date().getFullYear().toString().slice(-2);
  console.log("current year type");
  console.log(typeof currentYear);
  console.log(currentYear);
  //   currentYear = currentYear.slice(-2);
  let backspacePressed = false;
  /////////////////////////
  /////EVENT LISTENERS/////
  /////////////////////////

  const changeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const cardNumberOnKeyHandler = (event) => {
    if (event.key === "Backspace") {
      backspacePressed = true;
    }
  };

  const cardNumberChangeHandler = (event) => {
    let numberValue = inputValue.replace(/\s/g, "");
    console.log("calling from numberInputHandler");
    if (numberValue.length % 4 === 0 && inputValue.length !== 0) {
      //formats numberInput into credit card
      let newNumberInput = `${inputValue} ${
        event.target.value[event.target.value.length - 1]
      }`;

      if (backspacePressed) {
        newNumberInput = event.target.value;
      }
      setInputValue(newNumberInput);
    } else {
      setInputValue(event.target.value);
    }
  };

  const onBlurHandler = (event) => {
    if (wasTouched === false) {
      setWasTouched(true);
    }
  };

  /////////////////
  ///VALIDATION////
  /////////////////

  useEffect(() => {
    console.log("running useEffect");
    const checkBlank = () => {
      return inputValue.trim().length === 0;
    };
    if (checkBlank() && wasTouched) {
      setError("Can't be blank");
      valid = false;
    } else {
      switch (props.name) {
        case "card number":
          let checkableValue = parseInt(inputValue.replace(/\s/g, ""));
          let isNum = /^\d+$/.test(checkableValue);

          if (!isNum && wasTouched) {
            setError("Wrong format, numbers only");
            valid = false;
          } else if (
            (wasTouched && inputValue.trim().length < 19) ||
            inputValue.trim().length > 19
          ) {
            setError("Must enter a valid card number (16 digits)");
            valid = false;
          } else {
            valid = true;
            if (error !== "") {
              setError("");
            }
          }
          break;
        case "date-month":
          if (inputValue > 12 || inputValue <= 0) {
            setError("Must be a valid month");
            valid = false;
          } else {
            valid = true;
            if (error) {
              setError("");
            }
          }
          break;
        case "date-year":
          if (inputValue < currentYear) {
            setError("Must be a valid year");
            valid = false;
          } else {
            valid = true;
            if (error) {
              setError("");
            }
          }
          break;
        case "cvc":
          if (inputValue.length < 3 || inputValue.length > 3) {
            setError("Must be a valid number (3 digits)");
            valid = false;
          } else {
            valid = true;
            if (error) {
              setError("");
            }
          }
          break;
      }
    }
  }, [inputValue, error, wasTouched]);

  return (
    <>
      {props.name !== "date-year" && (
        <label htmlFor={props.name}>{props.labelText}</label>
      )}
      <div className={styles["input-container"]}>
        <input
          ref={inputRef}
          type={props.type}
          className={`${props.class} ${error && styles["error"]}`}
          value={inputValue}
          id={props.name}
          placeholder={props.placeholder}
          onBlur={onBlurHandler}
          onKeyDown={
            props.name === "card number" ? cardNumberOnKeyHandler : null
          }
          onChange={
            props.name === "cardNumber"
              ? cardNumberChangeHandler
              : changeHandler
          }
        ></input>
        {!valid && wasTouched && (
          <p className={styles["error-message"]}>{error}</p>
        )}
      </div>
    </>
  );
});

export default NewInput;
