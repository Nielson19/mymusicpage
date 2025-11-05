import { FaRegUser } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { useState, useEffect } from "react";


function SettingsPageView() {
    const [ personalSettingsOpen, setPersonalSettingsOpen ] = useState(false);
    const [ signInSettingsOpen, setSignInSettingsOpen ] = useState(false);
    

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
                {/* SingIn AND Security Settings */}
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
        <section className="absolute left-60 md:left-80 top-0 right-0 bottom-0 p-6">
            {/* Here fecth all the information for each setting option */}
            {personalSettingsOpen && 
                <div>
                    <h2>Personal Settings</h2>
                <div>
                    {/* Make them an input field comemierda */}
                    <div className="relative border border-white rounded-xl w-100 h-12">
                        <p className="absolute top-1 left-2 text-xs text-gray-400">Email</p>
                    </div>
                </div>
                </div>
                
            }

            {signInSettingsOpen && 
                <h2>Sign-In & Security Settings</h2>
            }
        </section>
    </div>
    );
}

export default SettingsPageView;

