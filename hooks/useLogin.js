import { useContext, useState } from "react";
import { Auth } from "../utils/auth";

function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(Auth);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setIsLoading(false);
      return { error: data.error, success: false };
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));

      dispatch({ type: "LOGIN", payload: data });

      setIsLoading(false);
      return { error: null, success: true };
    }
  };

  return { login, isLoading };
}

export default useLogin;
