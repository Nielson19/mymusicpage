import ButtonComponent from "./components/ButtonComponent";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <ButtonComponent
        label="Click Me"
        onClick={() => console.log("Button clicked!")}
        size="small"
      />
    </div>
  );
}

export default App;
