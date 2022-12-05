import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import style from "../styles/auth.module.css";
import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Auth } from "../utils/auth";
import { RotatingLines } from "react-loader-spinner";
function Signin() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [eye, setEye] = useState(false);
  const { login, error, isLoading } = useLogin();
  const { user } = useContext(Auth);

  const submitHandler = async ({ email, password }) => {
    await login(email, password);
    router.replace("/");
  };
  if (user) {
    router.replace("/");
    return <h3 style={{ textAlign: "center" }}>you are logged in</h3>;
  }
  return (
    <div className={style.container}>
      <div className={style.login}>
        <img src="images/amazon-logo.png" alt="amazon logo" />
        <form
          className={style.login__form}
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1>Sign in</h1>
          <div className={style.login__input}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "please enter your email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "please enter valid email",
                },
              })}
            />
            {errors?.email && (
              <span className={style.login__error}>{errors.email.message}</span>
            )}
          </div>

          <div className={style.login__input}>
            <label htmlFor="password">Password</label>
            <input
              type={eye ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "please enter your password",
              })}
            />
            <div className={style.login__eye}>
              {eye ? (
                <FaEyeSlash
                  onClick={() => setEye((prev) => !prev)}
                ></FaEyeSlash>
              ) : (
                <FaEye onClick={() => setEye((prev) => !prev)}></FaEye>
              )}
            </div>
            {errors?.password && (
              <span className={style.login__error}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className={style.login__btnContainer}>
            <button disabled={isLoading} className={style.login__btn}>
              {isLoading ? (
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="19"
                  visible={true}
                />
              ) : (
                "Sign in"
              )}
            </button>
            {error && <span className={style.login__error}>{error}</span>}
          </div>
          <p className={style.login__condition}>
            By continuing, you agree to <strong>fake Amazon&apos;s</strong>{" "}
            Conditions of Use and Privacy Notice.
          </p>
        </form>
        <div className={style.login__newToAmazon}>
          <h5>New to Amazon?</h5>
        </div>
        <Link href="/signup">
          <button className={style.login__createAccount}>
            create your amazon account
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Signin;
