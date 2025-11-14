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
        <div className="h-dvh bg-[#0b0b0d] text-gray-200 flex cursor-default">
            {/* Sidebar */}
            <nav className="w-64 md:w-72 p-6 border-r border-white/5 bg-[#0e0e10]/80 backdrop-blur-md relative">

            {/* Header */}
            <div className="flex items-center gap-3 px-2 mt-4 mb-8">
                <IoIosSettings className="text-4xl text-purple-400" />
                <h1 className="text-3xl font-semibold tracking-wide">Settings</h1>
            </div>

            {/* Nav Section */}
            <div className="space-y-2 mt-6">

                {/* Personal Settings */}
                <div
                onClick={() => {
                    setPersonalSettingsOpen(true)
                    setSignInSettingsOpen(false)
                }}
                className={`
                    flex items-center gap-3 p-4 rounded-xl cursor-pointer 
                    transition duration-150
                    ${personalSettingsOpen 
                    ? "bg-purple-600/20 border border-purple-600/40" 
                    : "hover:bg-white/5"
                    }
                `}
                >
                <FaRegUser className="text-xl" />
                <h2 className="text-lg font-medium tracking-wide">Personal Settings</h2>
                </div>

                {/* Sign-In Security */}
                <div
                onClick={() => {
                    setPersonalSettingsOpen(false)
                    setSignInSettingsOpen(true)
                }}
                className={`
                    flex items-center gap-3 p-4 rounded-xl cursor-pointer 
                    transition duration-150
                    ${signInSettingsOpen 
                    ? "bg-purple-600/20 border border-purple-600/40" 
                    : "hover:bg-white/5"
                    }
                `}
                >
                <MdOutlineLock className="text-xl" />
                <h2 className="text-lg font-medium tracking-wide">Sign-in & Security</h2>
                </div>

            </div>
            </nav>

            
            {/* Main Content */}
            <section className="flex-1 p-12 overflow-y-auto">

            {/* PERSONAL SETTINGS */}
            {personalSettingsOpen && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                <h2 className="text-4xl mb-4 font-light tracking-wide">Personal Settings</h2>

                <div className="bg-[#121215] border border-white/10 shadow-lg p-8 rounded-2xl space-y-6 w-fit">
                    <InputField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                </div>
            )}

            {/* SIGN-IN SETTINGS */}
            {signInSettingsOpen && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                <h2 className="text-4xl mb-4 font-light tracking-wide">Sign-in & Security</h2>

                <div className="bg-[#121215] border border-white/10 shadow-lg p-8 rounded-2xl space-y-6 w-fit">
                    <InputField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                    <div className="flex gap-3 items-end">
                    <div className="inputDiv">
                        <input
                        type={showHide ? "text" : "password"}
                        className="inputBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        <span>Password</span>
                    </div>

                    <button
                        className="text-2xl p-2 rounded-lg hover:bg-white/10 transition"
                        onClick={() => setShowHide(!showHide)}
                    >
                        {showHide ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                    </div>
                </div>
                </div>
            )}

            {/* Save / Cancel */}
            <div className="fixed bottom-14 right-20 flex gap-3">
                <button
                    className="bg-purple-600 px-6 py-2 rounded-xl border border-purple-500 cursor-pointer
                                hover:bg-purple-700 transition active:scale-95"
                    onClick={handleSaveSettings}
                >
                Save
                </button>

                <button
                    className="bg-gray-700 px-6 py-2 rounded-xl border border-gray-600 cursor-pointer 
                                hover:bg-gray-800 transition active:scale-95"
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

