import React, { useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import Input from "../components/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function SignupPageView() {
{
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", {
        email,
        password,
      });
      console.log("Login successful:", response.data);
      navigate("/login");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
    // Implement login logic here
  };
  const { email, password } = data; 
  return (
    <div className="flex flex-col items-center justify-center gap-1 min-h-screen bg-black text-white">
      <form
        onSubmit={registerUser}
        className="flex p-8 flex-col justify-center items-center gap-1"
      >
        <h1 className="text-4xl font-bold mb-8">Register</h1>
        <div className="mb-6">
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

        <div className="mb-7">
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

        <ButtonComponent label="Register" type="submit" size="large" />
        <div className="my-4 flex items-center gap-2">
          <hr className="w-24 border-gray-600" />
          <span className="text-gray-400">or</span>
          <hr className="w-24 border-gray-600" />
        </div>
        
      </form>
    </div>
  );
  }
}
export default SignupPageView;
