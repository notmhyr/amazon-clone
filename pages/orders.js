import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import style from "../styles/order.module.css";
import { Auth, axiosAuth } from "../utils/auth";
import Order from "../components/order";
import { Oval } from "react-loader-spinner";
import jwt_decode from "jwt-decode";
import axios from "axios";

function Orders() {
  const { user, dispatch } = useContext(Auth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  console.log(data);

  useEffect(() => {
    async function fetcher() {
      if (user) {
        try {
          setIsLoading(true);
          const res = await axiosAuth.get("/api/orders", {
            headers: {
              authorization: `Bearer ${user?.accessToken}`,
            },
          });

          setData(res.data);
          setIsLoading(false);
        } catch (error) {
          if (error.response.status === 400) {
            setError("We're sorry, but we're unable to serve your request.");
            setIsLoading(false);
          }
          console.log(error);
        }
      }
    }

    fetcher();
  }, [user?.accessToken]);

  async function fetchNewToken(token, email) {
    console.log("new token run");
    try {
      const newAccessToken = await axios.post("/api/auth/refresh-token", {
        token,
        email,
      });

      dispatch({ type: "UPDATE", payload: newAccessToken.data.accessToken });

      return newAccessToken.data;
    } catch (err) {
      console.log(err);
    }
  }

  axiosAuth.interceptors.request.use(
    async (config) => {
      console.log(`interceptors runs`);
      const userInLocalStorage = JSON.parse(localStorage.getItem("user"));

      let currentDate = new Date();
      const decodedToken = jwt_decode(userInLocalStorage.accessToken);
      console.log(decodedToken.exp * 1000 < currentDate.getTime());
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log(`exp is smaller`);
        const data = fetchNewToken(
          userInLocalStorage.refreshToken,
          userInLocalStorage.email
        );
        config.headers["authorization"] = `Bearer ${data.accessToken}`;
      }
      return config;
    },
    (error) => {
      console.log(`promise rejected here with this error ${error}`);
      return Promise.reject(error);
    }
  );

  return (
    <Layout title="Orders">
      <div className={style.container}>
        <div className={style.orders}>
          <h1>Your Orders</h1>
          {isLoading ? (
            <div className={style.orders__loading}>
              <Oval
                height={80}
                width={80}
                color="#fcd200"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#fcd200"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : !user ? (
            <h3>not logged in </h3>
          ) : error ? (
            <h3 className={style.error}>{error}</h3>
          ) : data?.length === 0 ? (
            <h3>you have no orders</h3>
          ) : (
            <div className={style.orders__container}>
              <h3>{data?.length} orders</h3>
              {data?.map((order) => (
                <Order key={order._id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
