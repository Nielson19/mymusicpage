import React, { useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import Input from "../components/Input";
import Headphoneslogo from "../assets/icons/Headphoneslogo.png";

function SignupPageView() {
  return (
    <div className="signup-page">
      <ButtonComponent
        size="large"
        label="Sign Up"
        onClick={() => console.log("Signup button clicked!")}
      />
    </div>
  );
}

export default SignupPageView;
