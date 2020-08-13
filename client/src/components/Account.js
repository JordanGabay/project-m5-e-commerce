import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Account = ({ currentUser }) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("idle");
  }, []);

  console.log(currentUser);

  return status === "idle" ? (
    <div>
      {currentUser !== "null" && (
        <div>
          <img src={currentUser.imageUrl} alt="user" />
          <h2>
            Welcome {currentUser.givenName} {currentUser.familyName}
          </h2>
          <h2>Email: {currentUser.email}</h2>
          <h3>Google Id: {currentUser.googleId}</h3>
          <h2>Order History</h2>
          <h2>Saved Addresses</h2>
          <h2>Saved Payment Methods</h2>
        </div>
      )}
      {currentUser === "null" && (
        <div>Please sign in to view your account information</div>
      )}
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Account;
