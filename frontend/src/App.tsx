import Slider from "./components/Slider";
import Toggle from "./components/Toggle";
import { Profile } from "./components/ProfilePicture";

function App() {
  return (
    <div className="content-center bg-black h-screen">
      <Slider
        min={0}
        max={100}
        defaultValue={50}
        onChange={(value) => console.log("Slider value:", value)}
      />
      <div className="p-8">
        <Toggle
          defaultVal={false}
          onChange={(val) => console.log("Toggle is:", val)}
        />
      </div>
      <div className="p-8">
        <Profile
          imageUrl="https://toronto.citynews.ca/wp-content/blogs.dir/sites/10/2022/12/09/IKEA-monkey-Toronto.jpg"
          alt="My profile picture"
        />
      </div>
    </div>
  );
}

export default App;
