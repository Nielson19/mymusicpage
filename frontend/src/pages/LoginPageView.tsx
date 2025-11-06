import React, { useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import Input from "../components/Input";
import Headphoneslogo from "../assets/icons/Headphoneslogo.png";

function LoginPageView() {
  return (
    <div className="login-page">
      <ButtonComponent
        size="large"
        label="Login"
        onClick={() => console.log("Login button clicked!")}
      />
    </div>
  );
}

export default LoginPageView;
