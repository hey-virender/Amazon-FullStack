import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import io from "socket.io-client";

const AmazonContext = createContext();

const AmazonProvider = ({ children }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [productId, setProductId] = useState(null);

  // Establishing a singleton instance of Socket
  const Socket = io("http://localhost:3000", {
    withCredentials: true,
  });

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  useEffect(() => {
    Socket.on("connection", () => {
      console.log("connected to server");
    });
  });

  useEffect(() => {
    // Fetch access token from cookies
    const accessTokenCookie = Cookies.get("accessToken");
    if (accessTokenCookie) {
      setAccessToken(accessTokenCookie);
    } else {
      setAccessToken(null);
    }
  }, []);

  return (
    <AmazonContext.Provider
      value={{
        showSignUp,
        toggleSignUp,
        accessToken,
        setAccessToken,
        setProductId,
        productId,
        Socket, // Providing the socket instance
      }}
    >
      {children}
    </AmazonContext.Provider>
  );
};

AmazonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AmazonContext, AmazonProvider };
