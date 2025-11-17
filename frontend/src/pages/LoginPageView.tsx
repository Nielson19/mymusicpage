import ButtonComponent from "../components/ButtonComponent";
import Input from "../components/Input";
import Headphoneslogo from "../assets/icons/HeadphonesNoBG.png";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import AuthButtonComp from "../components/LoginFormComp/authButtonComp";
import SpotifyIcon from "../assets/icons/SpotifyWhiteLogo.png";

function LoginPageView() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // avoid that the page reloads
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      console.log("Response received:", response.status);
      console.log("Login successful:", response.data);
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
    // Implement login logic here
  };

  const { email, password } = data;
  return (
    <div className="flex flex-col items-center justify-center gap-1 min-h-screen bg-black text-white">
      <img
        src={Headphoneslogo}
        alt="Headphones logo"
        className="w-1/8 h-1/8 mb-1"
      />

      <form
        onSubmit={loginUser}
        className="flex p-8 flex-col justify-center items-center gap-1"
      >
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        <div className="mb-4">
          <Input
            size="MEDIUM"
            type="email"
            label="Email"
            placeholder="user@example.com"
            value={data.email}
            color={{ PRIMARY: "#111111" }}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>

        <div className="mb-2">
          <Input
            size="MEDIUM"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={data.password}
            color={{ PRIMARY: "#111111" }}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>

        <a href="#" className="text-sm text-gray-400 hover:text-white mb-6">
          Forgot password?
        </a>

        <ButtonComponent label="Login" type="submit" size="large" />
        <div className="my-4 flex items-center gap-2">
          <hr className="w-24 border-gray-600" />
          <span className="text-gray-400">or</span>
          <hr className="w-24 border-gray-600" />
        </div>
        <AuthButtonComp
          label="Continue with Spotify"
          icon={SpotifyIcon}
          size="LARGE"
          link="#"
          color="green-600"
        />
      </form>
    </div>
  );
}

export default LoginPageView;
