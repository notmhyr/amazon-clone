import style from "../styles/footer.module.scss";

export default function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.footer__item}>
        <h3 className={style.footer__title}>Get to Know Us</h3>
        <a href="#" className={style.footer__option}>
          Careers
        </a>
        <a href="#" className={style.footer__option}>
          Blog
        </a>
        <a href="#" className={style.footer__option}>
          About Amazon
        </a>
      </div>

      <div className={style.footer__item}>
        <h3 className={style.footer__title}>Make Money with Us</h3>
        <a href="#" className={style.footer__option}>
          Sell products on Amazon
        </a>
        <a href="#" className={style.footer__option}>
          Sell on Amazon Business
        </a>
        <a href="#" className={style.footer__option}>
          Sell apps on Amazon
        </a>
        <a href="#" className={style.footer__option}>
          Host an Amazon Hub
        </a>
      </div>

      <div className={style.footer__item}>
        <h3 className={style.footer__title}>Amazon Payment Products</h3>
        <a href="#" className={style.footer__option}>
          Amazon Business Card
        </a>
        <a href="#" className={style.footer__option}>
          Shop with Points
        </a>
        <a href="#" className={style.footer__option}>
          Reload Your Balance
        </a>
        <a href="#" className={style.footer__option}>
          Amazon Currency Converter
        </a>
      </div>

      <div className={style.footer__item}>
        <h3 className={style.footer__title}>Let Us Help You</h3>
        <a href="#" className={style.footer__option}>
          Amazon and COVID-19
        </a>
        <a href="#" className={style.footer__option}>
          Your Account
        </a>
        <a href="#" className={style.footer__option}>
          Your Orders
        </a>
        <a href="#" className={style.footer__option}>
          Shipping Rates & Policies
        </a>
        <a href="#" className={style.footer__option}>
          Help
        </a>
      </div>

      <div className={style.footer__mobile}>
        <div className={style.footer__col}>
          <a href="#" className={style.footer__option}>
            Careers
          </a>
          <a href="#" className={style.footer__option}>
            Blog
          </a>
          <a href="#" className={style.footer__option}>
            About Amazon
          </a>
          <a href="#" className={style.footer__option}>
            Amazon Business Card
          </a>
        </div>

        <div className={style.footer__col}>
          <a href="#" className={style.footer__option}>
            Your Account
          </a>
          <a href="#" className={style.footer__option}>
            Your Orders
          </a>
          <a href="#" className={style.footer__option}>
            Help
          </a>
          <a href="#" className={style.footer__option}>
            Reload Your Balance
          </a>
        </div>
      </div>
    </div>
  );
}
