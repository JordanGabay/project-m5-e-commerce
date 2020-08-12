import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import CircularProgress from "@material-ui/core/CircularProgress";

export let currentUserId = "";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setClientId(data);
        setStatus("idle");
      });
  }, []);

  const responseGoogle = (res) => {
    const { name, email, imageUrl, googleId } = res.profileObj;
    setName(name);
    setEmail(email);
    setGoogleId(googleId);
    setUrl(imageUrl);
    currentUserId = googleId;
  };

  return status === "idle" ? (
    <>
      {clientId && (
        <div className="App">
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />

          <h1>Login with Google</h1>
          <h2>Welcome: {name}</h2>
          <h2>Email: {email}</h2>
          <h3>Google Id: {googleId}</h3>
          <img src={url} alt="user" />
        </div>
      )}
    </>
  ) : (
    <CircularProgress />
  );
};

export default Login;
