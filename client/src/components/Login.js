import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import CircularProgress from "@material-ui/core/CircularProgress";

import Account from "./Account";

export let currentUser;

const Login = () => {
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("loading");
  const [currentUserInfo, setCurrentUserInfo] = useState("null");

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setClientId(data);
        setStatus("idle");
      });
  }, []);

  const responseGoogle = (res) => {
    currentUser = res.profileObj;
    setCurrentUserInfo(res.profileObj);
  };

  return status === "idle" ? (
    <>
      {clientId && (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      )}
      <Account currentUser={currentUserInfo} />
    </>
  ) : (
    <CircularProgress />
  );
};

export default Login;
