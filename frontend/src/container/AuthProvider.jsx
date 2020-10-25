import React, { useState } from "react";

export const AuthContext = React.createContext([null, () => {}]);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={[token, setToken]}>
      {children}
    </AuthContext.Provider>
  );
};
