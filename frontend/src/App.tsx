import Slider from "./components/Slider";

function App() {
  return (
    <div className="content-center bg-black h-screen">
      <Slider 
        min={0} 
        max={100} 
        defaultValue={50}
        onChange={(value) => console.log('Slider value:', value)}
      />
      </div>

    

  );
}

export default App;
