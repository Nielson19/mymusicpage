import Slider from "./components/Slider";

function App() {
  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <Slider 
        min={0} 
        max={100} 
        defaultValue={50}
      />
    </div>

    

  );
}

export default App;
