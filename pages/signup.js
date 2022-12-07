import React, { useContext, useState } from "react";
import style from "../styles/auth.module.css";
import { useForm } from "react-hook-form";
import useSignup from "../hooks/useSignup";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Auth } from "../utils/auth";
import { RotatingLines } from "react-loader-spinner";

function Signup() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  // for showing the password
  const [eye, setEye] = useState(false);
  const { signUp, isLoading } = useSignup();
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user } = useContext(Auth);
  const { redirect } = router.query;

  const submitHandler = async ({ name, email, password }) => {
    const res = await signUp(name, email, password);
    if (res.success) {
      router.replace(redirect || "/");
    }
    if (res.error) {
      setError(res.error);
    }
  };

  if (user) {
    router.replace(redirect || "/");
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "please enter your email",
              })}
            />
            {errors.name && (
              <span className={style.login__error}>{errors.name.message}</span>
            )}
          </div>

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
            {errors.email && (
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
                minLength: {
                  value: 8,
                  message: "password be more than 8 chars",
                },
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

          <div className={style.login__input}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={eye ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "please enter confirm password",
                validate: (value) => value === getValues("password"),
                minLength: {
                  value: 8,
                  message: "password be more than 8 chars",
                },
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
            {errors?.confirmPassword && (
              <span className={style.login__error}>
                {errors?.password?.message}
              </span>
            )}
            {errors?.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <span className={style.login__error}>
                  Passwords do not match
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
                "create an account"
              )}
            </button>
            {error && <span className={style.login__error}>{error}</span>}
          </div>
          <p className={style.login__condition}>
            By continuing, you agree to <strong>fake Amazon&apos;s</strong>{" "}
            Conditions of Use and Privacy Notice.
          </p>

          <div className={style.login__shadow}></div>

          <p className={style.login__signIN}>
            Already have an account?
            <Link href="/signin">
              <a> Sign in</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
