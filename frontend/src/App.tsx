import Input from "./components/Input";
import { IoMdEyeOff } from "react-icons/io";

function App() {
  return (
    <div>
      <Input
        size="MEDIUM"
        label="Email"
        color={{ PRIMARY: "#1E1E1E" }}
        type="email"
        placeholder="Enter Email: "
        icon={<IoMdEyeOff />}
      />
    </div>
  );
}

export default App;
