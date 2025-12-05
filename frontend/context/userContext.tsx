import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useContext } from "react";

export const UserContext = createContext(null);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!user) {
      axios
        .get("/profile", { withCredentials: true })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
