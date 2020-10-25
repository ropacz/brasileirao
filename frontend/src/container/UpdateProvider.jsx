import React, { useState } from "react";

export const UpdateContext = React.createContext([false, () => {}]);

export const UpdateProvider = ({ children }) => {
  const [atualizarTabela, setAtulizarTabela] = useState(false);

  return (
    <UpdateContext.Provider value={[atualizarTabela, setAtulizarTabela]}>
      {children}
    </UpdateContext.Provider>
  );
};
