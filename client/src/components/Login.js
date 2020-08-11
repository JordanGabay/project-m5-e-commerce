import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [googleId, setGoogleId] = useState("");

  const responseGoogle = (res) => {
    const { name, email, imageUrl, googleId } = res.profileObj;
    setName(name);
    setEmail(email);
    setGoogleId(googleId);
    setUrl(imageUrl);
  };

  return (
    <div className="App">
      <GoogleLogin
        clientId={process.env.CLIENT_ID} // How to insert API key hidden in .env?
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />

      <h1>Login with Google</h1>
      <h2>Welcome: {name}</h2>
      <h2>Email: {email}</h2>
      <h3>Google Id: {googleId}</h3>
      <img src={url} />
    </div>
  );
}
