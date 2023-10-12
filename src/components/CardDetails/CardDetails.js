import React from "react";

import styles from "./CardDetails.module.css";

const CardDetails = (props) => {
  let figureClass = `${styles["card-img__back"]}`;
  const type = props.type;
  const card = props.card;

  if (props.type === "front") {
    figureClass = `${styles["card-img__front"]}`;
  }

  let cardContent = (
    <>
      <p className={`${styles["card__cvc"]}`}>{props.cvc}</p>
    </>
  );

  if (type === "front") {
    cardContent = (
      <>
        <img id={`${styles["card__logo"]}`} src={card.logo} alt="card logo" />
        <p className={`${styles["card__number"]}`}>{card.cardNumber}</p>
        <p className={`${styles["card__name"]}`}>{card.name}</p>
        <p className={`${styles["card__date"]}`}>{card.expDate}</p>
      </>
    );
  }
  return (
    <figure className={`${styles["card-img__container"]} ${figureClass}`}>
      <img
        src={props.img}
        alt={props.type === "back" ? "Back of card" : "Front of card"}
      />
      {cardContent}
    </figure>
  );
};

export default CardDetails;
