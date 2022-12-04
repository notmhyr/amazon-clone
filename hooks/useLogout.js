import { useContext } from "react";
import { Auth } from "../utils/auth";

function useLogout() {
  const { user, dispatch } = useContext(Auth);

  const logout = async () => {
    const res = await fetch("/api/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user?.email }),
    });
    dispatch({ type: "LOGOUT" });

    localStorage.removeItem("user");
  };

  return { logout };
}

export default useLogout;
