import { FaRegUser } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";



function SettingsPageView() {
    const [ personalSettingsOpen, setPersonalSettingsOpen ] = useState(true);
    const [ signInSettingsOpen, setSignInSettingsOpen ] = useState(false);
    const [showHide, setShowHide] = useState(false);
    

    // Fetch all settings from DB on Page Load
    useEffect(() => {
        console.log("Fetching All Settings Data");
        const fetchSettings = async () => {
            try {
                const response = await fetch("./api/settingInfo");
                if(!response.ok){
                    throw new Error("Failed to fetch settings!");
                }

                const data = await response.json();
                console.log("Fetched settings", data);

            } catch (error) {
                console.error("Error fetching settings:", error);

            }
        }
        
        fetchSettings();
    },[]);

  return (
    <div className="h-dvh bg-black text-white">
        <nav className="absolute top-0 left-0 bottom-0 w-60 md:w-80 border-r border-slate-600">
            <div className="flex flex-row justify-center gap-4 mt-4">
                <div className="h-12 w-12 border-2 border-white rounded-full bg-purple-600/50"></div>
                <div className="font-semibold text-5xl">
                    <h1>Settings</h1>
                </div>
            </div>
            {/* Display Settings Titles */}
            <div className="p-4 mt-4">
                {/* Personal Settings */}
                <div 
                    className="flex flex-row items-center gap-2 p-4 rounded-xl hover:bg-gray-900 hover:cursor-pointer"
                    onClick={() => {
                        setPersonalSettingsOpen(true),
                        setSignInSettingsOpen(false)
                    }}
                >
                    {/* Icon Here */}
                    <FaRegUser />
                    <h2 className="text-xl">
                        Personal Settings
                    </h2>
                </div>
                {/* Sing-In AND Security Settings */}
                <div 
                    className="flex flex-row items-center gap-2 p-4 rounded-xl hover:bg-gray-900 hover:cursor-pointer"
                     onClick={() => {
                        setPersonalSettingsOpen(false),
                        setSignInSettingsOpen(true)
                    }}
                >
                    {/* Icon Here */}
                    <MdOutlineLock />
                    <h2 className="text-xl">
                        Sign-in & Security
                    </h2>
                </div>
                
            </div>
        </nav>
        <section className="absolute left-80 md:left-90 top-10 right-0 bottom-0 p-6">
            {/* Personal Settings*/}
            {personalSettingsOpen && 
                <div className="flex flex-col gap-6">
                    <h2 className="mb-6 text-4xl">Personal Settings</h2>
                    <div className="inputDiv">
                        <input type="text" className="inputBox" required/>
                        <span>Email</span>
                    </div>
                    <div className="inputDiv">
                        <input type="tel" className="inputBox" required/>
                        <span>Phone</span>
                    </div>
                </div>
                
            }
            {/* SignIn & Security Settings */}
            {signInSettingsOpen && 
                <div className="flex flex-col gap-6">
                    <h2 className="mb-6 text-4xl">Change Username</h2>
                    <div className="inputDiv">
                        <input type="tel" className="inputBox" required/>
                        <span>Username</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="inputDiv">
                            <input type={showHide ? 'text' : 'password'} className="inputBox" required/>
                            <span>Password</span>
                        </div>
                        <button 
                            className="text-lg cursor-pointer rounded-lg"
                            onClick={() => {setShowHide(!showHide)}}
                        >
                            {showHide ? <FaRegEyeSlash/> : <FaRegEye/> }
                        </button>
                    </div>
                </div> 
                               
            }
        </section>
    </div>
    );
}

export default SettingsPageView;

