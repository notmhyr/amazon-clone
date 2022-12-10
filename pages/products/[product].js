import Layout from "../../components/Layout";
import style from "../../styles/productDetail.module.scss";
import { IoStar } from "react-icons/io5";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import Header from "../../components/Header";
function Product({ product }) {
  const { rate, count } = product.rating;
  const roundedRating = Math.floor(rate);
  const ratingArray = Array(roundedRating).fill();
  const { state, dispatch } = useContext(Store);

  const addToHandler = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.id === product.id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };
  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.product}>
          <div className={style.product__img}>
            <img src={product.image} alt={product.title} />
          </div>

          <div className={style.product__detail}>
            <h2>{product.title}</h2>
            <div className={style.product__priceContainer}>
              <h5>{product.price}</h5>
              <span>{product.category}</span>
            </div>
            <div className={style.product__rating}>
              Rating:{" "}
              {ratingArray.map((_, i) => (
                <span key={i} className={style.product__stars}>
                  <IoStar />
                </span>
              ))}
              <span className={style.product__rateCount}>{count}</span>
            </div>
            <p>{product.description}</p>
            <button className={style.product__btn} onClick={addToHandler}>
              add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;

export async function getServerSideProps(context) {
  const { params } = context;
  const { product } = params;

  const res = await fetch(`https://fakestoreapi.com/products/${product}`);
  const data = await res.json();

  return {
    props: {
      product: data,
    },
  };
}
