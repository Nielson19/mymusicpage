import ButtonComponent from "../components/ButtonComponent";
import Input from "../components/Input";
import Headphoneslogo from "../assets/icons/HeadphonesNoBG.png";
import { useState } from "react";
import axios from "axios";

function LoginPageView() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault(); // avoid that the page reloads
    try {
      const response = await axios.get("/");
      console.log("Response received:", response.status);
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    // Implement login logic here
  };

  const { email, password } = data;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <img
        src={Headphoneslogo}
        alt="Headphones logo"
        className="w-1/4 h-1/4 mb-6"
      />

      <h1 className="text-4xl font-bold mb-8">Login</h1>

      <div className="mb-4">
        <Input
          type="email"
          label="Email"
          placeholder="user@example.com"
          value={email}
          color={{ PRIMARY: "#111111" }}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </div>

      <div className="mb-2">
        <Input
          type="password"
          label="Password"
          placeholder="••••••••"
          value={password}
          color={{ PRIMARY: "#111111" }}
          onChange={(e) => setData({ ...data, password: e.target.value })}
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
