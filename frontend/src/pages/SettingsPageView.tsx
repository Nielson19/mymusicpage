import { FaRegUser } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { useState, useEffect } from "react";
import InputField from "../components/InputField";


function SettingsPageView() {
    const [ personalSettingsOpen, setPersonalSettingsOpen ] = useState(true);
    const [ signInSettingsOpen, setSignInSettingsOpen ] = useState(false);
    const [ showHide, setShowHide ] = useState(false);
    const [ username, setUsername ] = useState("Bartolo");
    const [ phone, setPhone ] = useState("(787) 123-1234");
    const [ email, setEmail ] = useState("bartolo@email.com");
    const [ password, setPassword ] = useState("qwerty");
    

    // Fetch all settings from DB on Page Load
    // useEffect(() => {
    //     const fetchSettings = async () => {
    //         try {
    //             const response = await fetch("./api/settingInfo");
    //             if(!response.ok){
    //                 throw new Error("Failed to fetch settings!");
    //             }

    //             const data = await response.json();
    //              setPhone(data.phone);
    //              setUsername(data.username);
    //             console.log("Fetched settings", data);

    //         } catch (error) {
    //             console.error("Error fetching settings:", error);

    //         }
    //     }
        
    //     fetchSettings();
    // },[]);


    function handleSaveSettings() {
        confirm("Save Settings");
        // Run a PATCH to save settings
    }

    function handleCancel() {
        confirm("Cancel Changes?");
        // Cancel Settings
    }

  return (
    <div className="h-dvh bg-black text-white">
        {/* Left Side Nav */}
        <nav className="absolute top-0 left-0 bottom-0 w-60 md:w-80 p-6 border-r border-slate-600">
            <div className="flex flex-row justify-center items-center gap-4 mt-4">
                <IoIosSettings className="text-4xl"/>
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
        {/* Main area with setting options */}
        <section className="absolute left-80 md:left-80 top-0 right-0 bottom-0 p-12">
            {/* Personal Settings*/}
            {personalSettingsOpen && 
                <div className="flex flex-col gap-6">
                    <h2 className="mb-6 text-4xl">Personal Settings</h2>
                    <InputField 
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField 
                        label="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                
            }
            {/* SignIn & Security Settings */}
            {signInSettingsOpen && 
                <div className="flex flex-col gap-6">
                    <h2 className="mb-6 text-4xl">Change Username</h2>
                    <InputField 
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <div className="inputDiv">
                            <input 
                             type={showHide ? 'text' : 'password'} 
                             className="inputBox" 
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             required/>
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

            {/* Save / Cancel */}
            <div className="fixed bottom-20 right-20 flex flex-row gap-2">
                <button 
                    className="border border-purple-700 p-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-950"
                    onClick={handleSaveSettings}
                >

                        Save
                    </button>
                <button 
                    className="border border-purple-700 p-2 px-4 rounded-xl bg-gray-600 hover:bg-gray-900"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </section>
    </div>
    );
}

export default SettingsPageView;

