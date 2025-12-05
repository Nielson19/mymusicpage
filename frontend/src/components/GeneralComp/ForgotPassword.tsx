import React, { useState } from "react";
import Input from "../Input";
import ButtonComponent from "../ButtonComponent";
import Headphoneslogo from "../../assets/icons/HeadphonesNoBG.png";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/forgot-password", { email });
      toast.success("Password reset link sent to your email.");
    } catch (error) {
      toast.error("Error sending reset link.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <img
        src={Headphoneslogo}
        alt="Headphones logo"
        className="w-1/8 h-1/8 mb-4"
      />

      <form
        onSubmit={handleForgotPassword}
        className="flex flex-col items-center p-8 gap-4"
      >
        <h1 className="text-4xl font-bold mb-2">Forgot Password</h1>

        <p className="text-gray-400 text-center w-80 -mt-2">
          Enter your email and we’ll send you a password reset link.
        </p>

        <Input
          size="MEDIUM"
          type="email"
          label="Email"
          placeholder="user@example.com"
          value={email}
          color={{ PRIMARY: "#111111" }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <ButtonComponent label="Send Reset Link" type="submit" size="large" />

        <a
          href="#"
          className="text-sm text-gray-400 hover:text-white mt-4"
        >
          Back to Login
        </a>
      </form>
    </div>
  );
}
