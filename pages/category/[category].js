import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Product from "../../components/Product";
import style from "../../styles/category.module.scss";

function Category({ products }) {
  const router = useRouter();
  const categoryId = router.query.category;
  return (
    <Layout title={categoryId}>
      <div className={style.title_container}>
        <h1 className={style.category__title}>{categoryId}</h1>
      </div>
      <div className={style.category}>
        {products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
}

export default Category;

export async function getStaticPaths() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const data = await res.json();
  const paths = data.map((item) => {
    return {
      params: {
        category: item,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${params.category}`
  );
  const data = await res.json();
  return {
    props: { products: data },
  };
}
