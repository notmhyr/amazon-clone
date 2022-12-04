import Layout from "../components/Layout";
import Home from "../components/Home";

export default function Index({ products, error }) {
  return (
    <Layout title="Home">
      <Home products={products} error={error} />
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return {
      props: { products: data },
    };
  } catch (error) {
    return {
      props: {
        error: JSON.stringify(error),
      },
    };
  }
}
