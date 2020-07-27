import React from "react";
import { PreLoginContent } from "./style";
import { Link } from "react-router-dom";

const PreLogin = (props) => {
  return (
    <PreLoginContent>
      <h3 className="title">Login If You Want</h3>
      <p className="btn-login">Login</p>
      <Link to="playground">click</Link>
    </PreLoginContent>
  );
};

export default PreLogin;
