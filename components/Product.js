import style from "../styles/product.module.css";
import { IoStar } from "react-icons/io5";
import { useContext } from "react";
import { Store } from "../utils/Store";
import Link from "next/link";

function Product({ product }) {
  const { id, title, price, description, image, rating } = product;
  const { state, dispatch } = useContext(Store);

  const addToHandler = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.id === product.id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  const { rate, count } = rating;
  const roundedRating = Math.floor(rate);
  const ratingArray = Array(roundedRating).fill();
  return (
    <div className={style.product}>
      <Link href={`products/${id}`}>
        <a>
          <img src={image} alt={title} />
        </a>
      </Link>
      <div className={style.product__info}>
        <Link href={`products/${id}`} passHref>
          <a>
            <p className={style.product__title}>{title}</p>
          </a>
        </Link>
        <div>
          {ratingArray.map((_, i) => (
            <span key={i} className={style.product__stars}>
              <IoStar />
            </span>
          ))}

          <span className={style.product__rateCount}>{count}</span>
        </div>
        <p className={style.product__price}>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <button className={style.product__btn} onClick={addToHandler}>
          add to cart
        </button>
      </div>
    </div>
  );
}

export default Product;
