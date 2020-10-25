import React, { useState, useContext } from "react";
import "./style.css";
import { AuthContext } from "../../container/AuthProvider";
import { requisicaoApiSemToken } from "../../helpers/api";

import {
  faFutbol,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 *  Componente formulário de login.
 */
const FormularioDeLogin = ({ onLogarUsuario, onSetEmail, onSetSenha }) => {
  return (
    <div className="login">
      <form onSubmit={(e) => onLogarUsuario(e)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Seu email..."
          autoComplete="email"
          onInput={(e) => onSetEmail(e.target.value)}
        />
        <label>Senha</label>
        <input
          name="password"
          type="password"
          placeholder="Sua senha..."
          autoComplete="new-password"
          onInput={(e) => onSetSenha(e.target.value)}
        />
        <button>
          <FontAwesomeIcon icon={faSignInAlt} color="white" size="1x" /> Logar
        </button>
      </form>
    </div>
  );
};

/**
 *  Componente botão de deslogar.
 */
const BotaoDeslogar = ({ onDeslogar }) => {
  return (
    <button className="botaoDeslogar" onClick={onDeslogar}>
      <FontAwesomeIcon icon={faSignOutAlt} color="white" size="1x" /> Deslogar
    </button>
  );
};

/**
 *  Componente principal cabeçalho
 */
export default function Cabecalho() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [token, setToken] = useContext(AuthContext);

  /**
   *  Função faz uma requisição de autentificação com API
   */
  const fazerLogin = async (email, senha) => {
    const conteudo = {
      email: email,
      senha: senha,
    };
    const requisicao = await requisicaoApiSemToken("POST", "/auth", conteudo);
    const resposta = await requisicao.json();

    if (resposta.dados.token) {
      setToken(() => resposta.dados.token);
    }
    setLoading(false);
  };

  /**
   *  Função para logar o usuário na página.
   */
  const logarUsuario = (e) => {
    e.preventDefault();
    setLoading(true);
    fazerLogin(email, senha);
  };

  /**
   *  Função para deslogar o usuário na página.
   */
  const deslogarUsuario = () => {
    setToken(null);
  };

  return (
    <div className="cabecalho">
      <div className="container">
        <div className="logo">
          <FontAwesomeIcon icon={faFutbol} color="white" size="2x" />
          <h2>Brasileirão</h2>
        </div>
        {!token && !loading && (
          <FormularioDeLogin
            onLogarUsuario={logarUsuario}
            onSetEmail={setEmail}
            onSetSenha={setSenha}
          />
        )}
        {loading && <p>Conferindo informações...</p>}
        {token && <BotaoDeslogar onDeslogar={deslogarUsuario} />}
      </div>
    </div>
  );
}
