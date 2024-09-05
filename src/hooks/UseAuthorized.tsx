import { useState } from "react";

const useAuthorized = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [localToken, setLocalToken] = useState<string>("");

  const checkIsAuthorized = () => {
    const rememberMeData = localStorage.getItem("rememberMe");
    const tokenData = localStorage.getItem("token");

    if (rememberMeData === "true") {
      if (tokenData) {
        setLocalToken(tokenData);
        setIsAuthorized(true);
      }
    } else if (rememberMeData === "false" || !rememberMeData) {
      if (tokenData) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    }
  };

  return {
    localToken,
    isAuthorized,
    checkIsAuthorized,
  };
};

export default useAuthorized;
