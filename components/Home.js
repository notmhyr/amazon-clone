import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation, EffectFade } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import style from "../styles/home.module.css";
import Image from "next/image";
import data from "../utils/slider";
import Link from "next/link";
import Product from "./Product";
import { TailSpin } from "react-loader-spinner";

function Home({ products, error }) {
  if (error) {
    return (
      <div className={style.errorContainer}>
        <h2 className={style.error}>
          Could not get the data please check your network connection!
        </h2>
      </div>
    );
  }
  // if (!products) {
  //   <Loading />;
  // }
  return (
    <div className={style.home}>
      <Swiper
        modules={[Navigation, EffectFade, Autoplay]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation={true}
        effect="fade"
        speed={800}
        slidesPerView={1}
        loop
        className={style.home__swiper}
      >
        {data.map((item) => (
          <SwiperSlide key={item.img}>
            <Image
              src={item.img}
              alt="banner"
              layout="fill"
              className={style.home__img}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* category container */}
      <div className={style.home__category}>
        <div className={style.home__eachCategory}>
          <h2>Electronics</h2>
          <Link href="/category/electronics">
            <a>
              <img
                src="/images/electronic.webp"
                alt="category image"
                className={style.home__categoryImg}
              />
            </a>
          </Link>
          <Link href="/category/electronics">See more</Link>
        </div>

        <div className={style.home__eachCategory}>
          <h2>Jewelry</h2>
          <Link href="/category/jewelery">
            <a>
              <img
                src="/images/jewelry.jpg"
                alt="category image"
                className={style.home__categoryImg}
              />
            </a>
          </Link>
          <Link href="/category/jewelery">See more</Link>
        </div>

        <div className={style.home__eachCategory}>
          <h2>Men&apos;s clothing</h2>
          <Link href="/category/men's clothing">
            <a>
              <img
                src="/images/men-clothing.jpg"
                alt="category image"
                className={style.home__categoryImg}
              />
            </a>
          </Link>
          <Link href="/category/men's clothing">See more</Link>
        </div>

        <div className={style.home__eachCategory}>
          <h2>Women&apos;s clothing</h2>
          <Link href="category/women's clothing">
            <a>
              <img
                src="/images/women-clothing.jpg"
                alt="category image"
                className={style.home__categoryImg}
              />
            </a>
          </Link>
          <Link href="category/women's clothing">See more</Link>
        </div>
      </div>
      <div className={style.home__product}>
        {products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
        {/* <img
          src="https://links.papareact.com/dyz"
          alt="banner"
          className={style.home__productBanner}
        /> */}
      </div>
    </div>
  );
}

export default Home;
