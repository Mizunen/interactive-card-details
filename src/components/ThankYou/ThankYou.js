import React from "react";
import completeIcon from "../../images/icon-complete.svg";
import styles from "./ThankYou.module.css";
import { cardActions } from "../../store/cardDetails";
import { useDispatch } from "react-redux";
const ThankYou = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(cardActions.reset());
  };
  return (
    <section className={styles["thank-you__container"]}>
      <figure class="thank-you__img">
        <img src={completeIcon} alt="complete icon" />
      </figure>
      <p className={styles["thank-you__header"]}>Thank you!</p>
      <p className={styles["thank-you__details"]}>
        We've added your card details
      </p>
      <button className={styles["thank-you__button"]} onClick={handleClick}>
        Continue
      </button>
    </section>
  );
};

export default ThankYou;
