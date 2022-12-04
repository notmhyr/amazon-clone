import { useContext, useState } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import Image from "next/image";
import style from "../styles/cart.module.css";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Auth } from "../utils/auth";
import { RotatingLines } from "react-loader-spinner";
const stripePromise = loadStripe(process.env.stripe_public_key);

let numOfOption = [];

for (let i = 1; i < 11; i++) {
  numOfOption.push(i);
}

function Cart() {
  const { user } = useContext(Auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  async function createCheckoutSession() {
    setLoading(true);
    const stripe = await stripePromise;
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart.cartItems,
        email: user.email,
      }),
    });

    const data = await res.json();
    // const checkoutResponse = await axios.post(
    //   "/api/create-checkout-session",
    //   {
    //     items: cart.cartItems,
    //     email: user.email,
    //   }
    // );

    // console.log(
    //   "this is the response " + JSON.stringify(checkoutResponse.data)
    // );
    if (!res.ok) {
      setLoading(false);
      setError(data.error);
      return console.log(data.error);
    }

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    if (result) {
      setLoading(false);
    }
  }

  const removeAll = () => {
    dispatch({ type: "CLEAR_ALL_ITEMS" });
  };

  const removeHandler = (product) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: product });
  };

  const updateCart = (product, qtn) => {
    const quantity = Number(qtn);

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <Layout title="Cart">
      {cart.cartItems.length <= 0 ? (
        <div
          style={{
            textAlign: "center",
            fontSize: "22px",
            color: "#0f1111",
            minHeight: "50vh",
          }}
        >
          <h5>
            Your Cart is empty{" "}
            <Link href="/">
              <a style={{ color: "#007185" }}>go shopping</a>
            </Link>
          </h5>
        </div>
      ) : (
        <div className={style.cart}>
          <div className={style.cart__products}>
            <div className={style.cart__title}>
              <h2>Shopping cart</h2>
              <button onClick={removeAll}>Delete All</button>
              <span>price</span>
            </div>

            {cart.cartItems.map((product) => {
              return (
                <div key={product.id} className={style.cart__eachProduct}>
                  <div className={style.cart__productImg}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      objectFit="contain"
                      layout="responsive"
                      height="140px"
                      width="190px"
                    />
                  </div>
                  <div className={style.cart__productInfo}>
                    <div style={{ marginBottom: "10px" }}>
                      <h5>{product.title}</h5>
                      <span>category: {product.category}</span>
                    </div>
                    <div>
                      <span className={style.cart__productQty}>Qty:</span>
                      <select
                        value={product.quantity}
                        className={style.cart__select}
                        onChange={(e) => updateCart(product, e.target.value)}
                      >
                        {numOfOption.map((i) => (
                          <option key={i}>{i}</option>
                        ))}
                      </select>
                      <button
                        className={style.cart__delete}
                        onClick={() => removeHandler(product)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className={style.cart__productPrice}>
                    <p>${product.price}</p>
                  </div>
                </div>
              );
            })}
            <div className={style.cart__total}>
              <span className={style.subtotal}>
                Subtotal({cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                items): $
                <strong>
                  {cart.cartItems
                    .reduce((a, c) => a + c.quantity * c.price, 0)
                    .toFixed(2)}
                </strong>
              </span>
            </div>
          </div>

          <div className={style.cart__subtotal}>
            <div>
              <span className={style.subtotal}>
                Subtotal({cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                items): $
                <strong>
                  {cart.cartItems
                    .reduce((a, c) => a + c.quantity * c.price, 0)
                    .toFixed(2)}
                </strong>
              </span>
            </div>

            <button disabled={!user || loading} onClick={createCheckoutSession}>
              {user ? (
                loading ? (
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="19"
                    visible={true}
                  />
                ) : (
                  "proceed to checkout"
                )
              ) : (
                "sign in to checkout"
              )}
            </button>
            {error && <p className="error"> {error}</p>}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Cart;
