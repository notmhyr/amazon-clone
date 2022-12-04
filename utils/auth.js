import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
export const Auth = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return { user: action.payload };
    }
    case "UPDATE": {
      const userInLocalStorage = JSON.parse(localStorage.getItem("user"));
      userInLocalStorage.accessToken = action.payload;
      localStorage.setItem("user", JSON.stringify(userInLocalStorage));
      return { user: { ...state.user, accessToken: action.payload } };
    }
    case "LOGOUT": {
      return { user: null };
    }

    default:
      return state;
  }
}

export const axiosAuth = axios.create();

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <Auth.Provider value={{ ...state, dispatch }}>{children}</Auth.Provider>
  );
}

export default AuthProvider;
