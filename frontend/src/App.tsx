import Slider from "./components/Slider";
import Toggle from "./components/Toggle";
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
        </div>
    );
}

export default App;
