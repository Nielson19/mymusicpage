import React, { useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import Input from "../components/Input";
import Headphoneslogo from "../assets/icons/Headphoneslogo.png";

function LoginPageView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <img
        src={Headphoneslogo}
        alt="Headphones logo"
        className="w-1/4 h-1/ mb-6"
      />

      <h1 className="text-4xl font-bold mb-8">Login</h1>

      <div className="mb-4">
        <Input
          type="email"
          label="Email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          color={{ PRIMARY: "#111111" }}
        />
      </div>

      <div className="mb-2">
        <Input
          type="password"
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          color={{ PRIMARY: "#111111" }}
        />
      </div>

      <a href="#" className="text-sm text-gray-400 hover:text-white mb-6">
        Forgot password?
      </a>

      <ButtonComponent
        size="large"
        label="Login"
        onClick={() => console.log("Login button clicked!")}
      />
    </div>
  );
}

export default LoginPageView;
