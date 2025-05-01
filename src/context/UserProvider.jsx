import { useState } from "react";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null); 

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
}

