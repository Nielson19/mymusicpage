import React, { useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import Input from "../components/Input";
import Headphoneslogo from "../assets/icons/HeadphonesNoBG.png";
import axios from "axios";
import { toast } from "react-hot-toast";
import AuthButtonComp from "../components/LoginFormComp/authButtonComp";
import SpotifyIcon from "../assets/icons/SpotifyWhiteLogo.png";
import { useNavigate } from "react-router-dom";

function SignupPageView() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const signupUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", {
        username,
        email,
        password,
      });
      console.log("Response received:", response.status);
      toast.success("Signup successful:", response.data);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  const { username, email, password } = data;

  return (
    <div className="flex flex-col items-center justify-center gap-1 min-h-screen bg-black text-white">
      <img
        src={Headphoneslogo}
        alt="Headphones logo"
        className="w-1/8 h-1/8 mb-1"
      />

      <form
        onSubmit={signupUser}
        className="flex p-8 flex-col justify-center items-center gap-1"
      >
        <h1 className="text-4xl font-bold mb-8">Sign Up</h1>

        <div className="mb-4">
          <Input
            size="MEDIUM"
            type="text"
            label="Username"
            placeholder="username"
            value={data.username}
            color={{ PRIMARY: "#111111" }}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </div>

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

        <div className="mb-6">
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

        <div className="mb-6">
          <Input
            size="MEDIUM"
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            value={data.password}
            color={{ PRIMARY: "#111111" }}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>

        <ButtonComponent label="Sign Up" type="submit" size="large" />

        <div className="my-4 flex items-center gap-2">
          <hr className="w-24 border-gray-600" />
          <span className="text-gray-400">or</span>
          <hr className="w-24 border-gray-600" />
        </div>

        <AuthButtonComp
          label="Continue with Spotify"
          icon={SpotifyIcon}
          size="LARGE"
          link="https://accounts.spotify.com/en/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Duser-read-email%26response_type%3Dcode%26redirect_uri%3Dhttp%3A%2F%2F127.0.0.1%3A3002%2Fauth%2Fcallback%2Fspotify%26code_challenge_method%3DS256%26client_id%3Db7a1d92d477441edbb42504668be6fbb%26code_challenge%3DItc50Bo7xzQiagYgvU8Uuh90gsTqlSgNT7KIv4tvsQY&client_id=b7a1d92d477441edbb42504668be6fbb"
          color="[#1ED760]"
        />

        <p className="mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-white hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignupPageView;
