import { useContext, useEffect, useState } from "react";
import style from "../styles/header.module.scss";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import { Store } from "../utils/Store";
import Link from "next/link";
import { Auth } from "../utils/auth";
import useLogout from "../hooks/useLogout";

function Header() {
  const [itemsCount, setItemsCount] = useState(0);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { user } = useContext(Auth);
  const { logout } = useLogout();
  useEffect(() => {
    if (cart.cartItems) {
      setItemsCount(cart?.cartItems.reduce((a, c) => a + c.quantity, 0));
    }
  }, [cart.cartItems]);

  return (
    <header className={style.container}>
      <div className={style.header}>
        <Link href="/">
          <a>
            <img
              className={style.header__logo}
              src="/images/logo.png"
              alt="logo"
            />
          </a>
        </Link>

        <div className={style.header__search}>
          <input type="text" className={style.header__searchInput} />
          <button className={style.header__searchBtn}>
            <AiOutlineSearch className={style.header__searchIcon} />
          </button>
        </div>

        <div className={style.header__nav}>
          {user ? (
            <div className={style.header__option} onClick={() => logout()}>
              <span className={style.header__optionLineOne}>
                Hello {user.name}
              </span>
              <span className={style.header__optionLineTwo}>Log out</span>
            </div>
          ) : (
            <Link href="/signin">
              <div className={style.header__option}>
                <span className={style.header__optionLineOne}>Hello Guest</span>
                <span className={style.header__optionLineTwo}>Sign In</span>
              </div>
            </Link>
          )}

          <Link href="/orders">
            <div
              className={`${style.header__option} ${style.header__option__hide}`}
            >
              <span className={style.header__optionLineOne}>Returns</span>
              <span className={style.header__optionLineTwo}>Orders</span>
            </div>
          </Link>

          <Link href="/cart" passHref>
            <div className={style.header__optionBasket}>
              <AiOutlineShoppingCart className={style.header__basket} />
              <span className={style.header__basketCount}>{itemsCount}</span>
              <span className={style.header__basketCart}> Cart</span>
            </div>
          </Link>
        </div>
      </div>

      <div className={style.header__section2}>
        <div className={style.header__all}>
          <HiOutlineMenu className={style.header__allBars} />
          <span>all</span>
        </div>

        <div className={style.header__right}>
          <span>today&apos;s deals</span>
          <span className={style.header__hiddenNav}>buy again</span>
          <span className={style.header__hiddenNav}>customer service</span>
          <span className={style.header__hiddenNav}>gift cards</span>
          <span>registry</span>
          <span>sell</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
