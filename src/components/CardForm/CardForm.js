import React, { useMemo, useState, useRef } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import styles from "./CardForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cardActions } from "../../store/cardDetails";
const CardForm = () => {
  const [testInput, setTestInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const dispatch = useDispatch();
  const nameRef = useRef();
  const numberRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const cvcRef = useRef();

  let allRefs = [nameRef, numberRef, monthRef, yearRef, cvcRef];
  let backspacePressed = false;
  const inputChangeHandler = (event) => {
    setTestInput(event.target.value);
  };

  const numberOnKeyHandler = (event) => {
    if (event.key === "Backspace") {
      backspacePressed = true;
    }
  };

  const numberInputHandler = (event) => {
    let numberValue = numberInput.replace(/\s/g, "");

    if (numberValue.length % 4 === 0 && numberInput.length !== 0) {
      //formats numberInput into credit card
      let newNumberInput = `${numberInput} ${
        event.target.value[event.target.value.length - 1]
      }`;

      if (backspacePressed) {
        newNumberInput = event.target.value;
      }
      setNumberInput(newNumberInput);
    } else {
      setNumberInput(event.target.value);
    }
  };

  const checkForError = (value) => {
    let hasError = false;
    for (let ref of allRefs) {
      if (ref.current.value === "") {
        hasError = true;
        ref.current.addError();
      }
      if (ref.current.hasError) {
        hasError = true;
      }
    }
    return hasError;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let cardDetails = {};
    if (checkForError()) {
      return;
    } else {
      cardDetails = {
        name: nameRef.current.value,
        cardNumber: numberRef.current.value,
        expDate: `${
          monthRef.current.value.length < 2
            ? `0${monthRef.current.value}`
            : monthRef.current.value
        }/${yearRef.current.value}`,
        cvc: cvcRef.current.value,
      };
      console.log(cardDetails);
      dispatch(cardActions.update(cardDetails));
    }
  };

  return (
    <section className={styles["form__container"]}>
      <form onSubmit={handleSubmit}>
        <Input
          ref={nameRef}
          name="name"
          placeholder="e.g. Jane Appleseed"
          labelText="Cardholder name"
          type="text"
        ></Input>
        <Input
          ref={numberRef}
          name="card number"
          placeholder="e.g. 1234 5678 9123 0000"
          labelText="CARD NUMBER"
          type="text"
          errorMessage="Must be a number"
        ></Input>
        <div className={styles["date-and-cvc__labels"]}>
          <label htmlFor="date-month">{"EXP DATE (MM/YY)"}</label>
          <label htmlFor="cvc">cvc</label>
        </div>

        <div className={styles["date-and-cvc__inputs"]}>
          <Input
            ref={monthRef}
            name="date-month"
            placeholder="MM"
            type="number"
          ></Input>
          <Input
            ref={yearRef}
            name="date-year"
            placeholder="YY"
            type="Number"
            className={styles["year"]}
          ></Input>
          <Input
            className={styles["cvc-input"]}
            ref={cvcRef}
            name="cvc"
            placeholder="e.g. 123"
            type="number"
          ></Input>
        </div>

        <Button>Confirm</Button>
      </form>
    </section>
  );
};

export default CardForm;
