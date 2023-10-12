import React, { useEffect, useState, useImperativeHandle, useRef } from "react";
import styles from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  const [wasTouched, setWasTouched] = useState(false);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef();
  let currentYear = new Date().getFullYear().toString().slice(-2);

  useImperativeHandle(ref, () => {
    return {
      value: inputRef.current.value,
      hasError: error,
      addError: () => {
        setWasTouched(true);
        setError("Can't be blank");
      },
    };
  });

  const checkBlank = (valueToCheck) => {
    return valueToCheck.trim().length === 0;
  };
  let valid = null;
  //////////////////////////////
  ////////EVENT HANDLERS///////
  ////////////////////////////
  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  let backspacePressed = false;
  let spacebarPressed = false;

  const numberOnKeyHandler = (event) => {
    if (event.key === "Backspace") {
      backspacePressed = true;
    }
    if (event.code === "Space") {
      spacebarPressed = true;
    }
  };

  const numberInputHandler = (event) => {
    let numberValue = inputValue.replace(/\s/g, "");
    if (numberValue.length % 4 === 0 && inputValue.length !== 0) {
      //formats numberInput into credit card
      //creates new string with empty space between old inputValue and new value
      let newNumberInput = `${inputValue} ${
        event.target.value[event.target.value.length - 1]
      }`;

      if (backspacePressed) {
        //Lets user backspace to prevent backspaces from causing an extra space to appear
        newNumberInput = event.target.value.trim();
      }
      if (spacebarPressed) {
        //stops extra space from appearing
        newNumberInput = inputValue;
        spacebarPressed = false;
      }
      setInputValue(newNumberInput);
    } else {
      setInputValue(event.target.value.trim());
    }
  };

  useEffect(() => {
    const checkBlank = () => {
      return inputValue.trim().length === 0;
    };
    if (checkBlank() && wasTouched) {
      setError("Can't be blank");
      valid = false;
    } else {
      switch (props.name) {
        case "card number":
          let checkableValue = Number(inputValue.replace(/\s/g, ""));
          let isNum = /^\d+$/.test(checkableValue) && checkableValue !== NaN;

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
          if (
            (inputValue > 12 && wasTouched) ||
            (inputValue <= 0 && wasTouched)
          ) {
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
          if (inputValue < currentYear && wasTouched) {
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
          if (
            (inputValue.length < 3 && wasTouched) ||
            (inputValue.length > 3 && wasTouched)
          ) {
            setError("Must be a valid number (3 digits)");
            valid = false;
          } else {
            valid = true;
            if (error) {
              setError("");
            }
          }
          break;
        default:
          if (error) {
            setError("");
            valid = true;
          }
      }
    }
  }, [inputValue, wasTouched]);

  const handleBlur = (event) => {
    setWasTouched(true);
  };

  let errorClass = "";
  if (props.name === "date-month") {
    errorClass = styles["month-error"];
  }
  if (props.name === "date-year") {
    errorClass = styles["year-error"];
  }
  let noLabel =
    props.name == "date-month" ||
    props.name == "date-year" ||
    props.name == "cvc";

  return (
    <>
      {!noLabel && <label htmlFor={props.name}>{props.labelText}</label>}

      <div className={styles["input-container"]}>
        <input
          ref={inputRef}
          type={props.type}
          className={`${props.className} ${error && styles.error}`}
          value={inputValue}
          id={props.name}
          placeholder={props.placeholder}
          onBlur={handleBlur}
          onKeyDown={props.name === "card number" ? numberOnKeyHandler : null}
          onChange={
            props.name === "card number"
              ? numberInputHandler
              : inputChangeHandler
          }
        ></input>
        {!valid && wasTouched && (
          <p className={`${styles["error-message"]} ${errorClass}`}>{error}</p>
        )}
      </div>
    </>
  );
});

export default Input;
