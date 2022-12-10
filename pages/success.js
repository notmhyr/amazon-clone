import React, { useContext, useEffect } from "react";
import style from "../styles/success.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import Header from "../components/Header";
import Link from "next/link";
import { Store } from "../utils/Store";
function Success() {
  const { dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({ type: "CLEAR_ALL_ITEMS", payload: "" });
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.success}>
          <div className={style.success__row1}>
            <FaCheckCircle className={style.success__icon} />
            <h1>Thank you, your order has been confirmed!</h1>
          </div>
          <div className={style.success__row2}>
            <p>
              Thank you for shopping with us. We&apos;ll send a confirmation
              once your item has shipped, if you would like to check the status
              of your order(s) please press the link below
            </p>
            <Link href="/orders" replace passHref>
              <button>Go to my orders</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
