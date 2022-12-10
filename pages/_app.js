import "../styles/globals.scss";
import StoreProvider from "../utils/Store";
import AuthProvider from "../utils/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingIcon from "../components/Loading";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <AuthProvider>
      <StoreProvider>
        {loading && <LoadingIcon />}
        <Component {...pageProps} />
      </StoreProvider>
    </AuthProvider>
  );
}

export default MyApp;
