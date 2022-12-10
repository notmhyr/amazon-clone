import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import style from "../styles/order.module.scss";
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

  useEffect(() => {
    async function fetcher() {
      if (user) {
        try {
          setIsLoading(true);
          const res = await axiosAuth.get("/api/orders");

          setData(res.data);
          setIsLoading(false);
        } catch (error) {
          if (error?.response?.status === 400) {
            setError("We're sorry, but we're unable to serve your request.");
            setIsLoading(false);
          }
        }
      }
    }

    fetcher();
  }, [user?.accessToken]);

  // for getting data from local storage

  function getLocalStorage() {
    if (typeof window !== "undefined") {
      const userInLocalStorage = JSON.parse(localStorage.getItem("user"));

      return {
        email: userInLocalStorage.email,
        accessToken: userInLocalStorage.accessToken,
        refreshToken: userInLocalStorage.refreshToken,
      };
    }
  }

  async function fetchNewToken() {
    try {
      const { email, refreshToken } = getLocalStorage();
      const newAccessToken = await axios.post("/api/auth/refresh-token", {
        token: refreshToken,
        email,
      });

      dispatch({ type: "UPDATE", payload: newAccessToken.data.accessToken });

      return newAccessToken.data;
    } catch (err) {
      console.log(err);
      Promise.reject(err);
    }
  }

  axiosAuth.interceptors.request.use(
    (config) => {
      const { accessToken } = getLocalStorage();
      if (accessToken) {
        config.headers["authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axiosAuth.interceptors.response.use(
    async (res) => {
      return res;
    },
    async (error) => {
      const originalConfig = error.config;
      if (error.response) {
        //access token expired
        if (error.response.status === 403 && !originalConfig._retry) {
          // handle infinite loop
          originalConfig._retry = true;

          fetchNewToken();
          return axiosAuth(originalConfig);
        }
      }

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
