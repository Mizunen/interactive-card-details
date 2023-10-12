import React from "react";
import styles from "./CardDetailsContainer.module.css";
import CardDetails from "./CardDetails";
import CardLogo from "../../images/card-logo.svg";
import FrontCardImg from "../../images/bg-card-front.png";
import BackCardImg from "../../images/bg-card-back.png";
import { useSelector } from "react-redux";
const CardDetailsContainer = () => {
  // let CardState = {
  //   name: "Jane Appleseed",
  //   cardNumber: "0000 0000 0000 0000",
  //   expDate: "00/00",
  //   cvc: "000",
  //   logo: CardLogo,
  // };

  const CardState = useSelector((state) => state.cardDetails);
  console.log(CardState);
  return (
    <div className={styles["card-imgs__container"]}>
      {/* <figure className={styles["card-img__container"]}>
        <CardDetails
          className={styles["card__back"]}
          type="back"
          cvc={CardState.cvc}
          img={BackCardImg}
        ></CardDetails>
        <CardDetails
          className={styles["card__front"]}
          type="front"
          card={CardState}
          img={FrontCardImg}
        ></CardDetails>
      </figure> */}
      <figure className={styles["card-img__container"]}>
        <CardDetails
          className={styles["card__back"]}
          type="back"
          cvc={CardState.cvc}
          img={BackCardImg}
        ></CardDetails>
      </figure>
      <figure className={styles["card-img__container"]}>
        <CardDetails
          className={styles["card__front"]}
          type="front"
          card={CardState}
          img={FrontCardImg}
        ></CardDetails>
      </figure>
    </div>
  );
};

export default CardDetailsContainer;
