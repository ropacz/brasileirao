import React from "react";
import "./App.css";
import Cabecalho from "../components/Cabecalho";
import Rodada from "../components/Rodada";
import Tabela from "../components/Tabela";
import Rodape from "../components/Rodape";
import { AuthProvider } from "./AuthProvider";
import { UpdateProvider } from "./UpdateProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Cabecalho />
        <div className="colunas">
          <div className="container">
            <UpdateProvider>
              <Rodada />
              <Tabela />
            </UpdateProvider>
          </div>
        </div>
        <Rodape />
      </AuthProvider>
    </div>
  );
}

export default App;
