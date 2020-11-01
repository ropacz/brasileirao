import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { AuthContext } from "../../container/AuthProvider";
import { UpdateContext } from "../../container/UpdateProvider";
import {
  requisicaoApiComToken,
  requisicaoApiSemToken,
} from "../../helpers/api";

import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faEdit,
  faSave,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Componente cria o cabeçalho da tabela rodada.
 */
const Cabecalho = ({ rodada, anterior, proxima }) => {
  return (
    <div className="cabecalho">
      <button
        style={rodada === 1 ? { opacity: 0.5 } : {}}
        className="botaoAnterior"
        onClick={anterior}
      >
        <FontAwesomeIcon icon={faArrowAltCircleLeft} color="white" size="2x" />
      </button>
      <h2>{rodada}ª Rodada</h2>
      <button
        style={rodada === 38 ? { opacity: 0.5 } : {}}
        className="botaoProxima"
        onClick={proxima}
      >
        <FontAwesomeIcon icon={faArrowAltCircleRight} color="white" size="2x" />
      </button>
    </div>
  );
};

/**
 * Componente para edição do placar do jogo.
 */
const PlacarEditavel = ({
  dados,
  setGolsCasaEditados,
  setGolsVisitanteEditados,
}) => {
  const { golsCasa, golsVisitante } = dados;

  useEffect(() => {
    setGolsCasaEditados(golsCasa);
    setGolsVisitanteEditados(golsVisitante);
  }, []);

  return (
    <>
      <td>
        <input
          defaultValue={golsCasa}
          type="number"
          onChange={(event) => {
            setGolsCasaEditados(event.target.value);
          }}
        ></input>
      </td>
      <td>x</td>
      <td>
        <input
          defaultValue={golsVisitante}
          type="number"
          onChange={(event) => {
            setGolsVisitanteEditados(event.target.value);
          }}
        ></input>
      </td>
    </>
  );
};

/**
 * Componente de exibição do placar do Jogo.
 */
const PlacarExibicao = ({ golsCasa, golsVisitante }) => {
  return (
    <>
      <td>{golsCasa}</td>
      <td>x</td>
      <td>{golsVisitante}</td>
    </>
  );
};

/**
 * Componente cria o botão de edição do placar.
 */
const BotaoEditar = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      <FontAwesomeIcon icon={faEdit} color="black" size="lg" />
    </button>
  );
};

/**
 * Componente botão par salvar plcar do jogo.
 */
const BotaoSalvar = ({ salvarJogo }) => {
  return (
    <button onClick={salvarJogo}>
      <FontAwesomeIcon icon={faSave} color="black" size="lg" />
    </button>
  );
};

/**
 * Componente principal cria a tabela rodada.
 */
export default function Rodada() {
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState(undefined);
  const [rodada, setRodada] = useState(1);
  const [editarId, setEditarId] = useState(undefined);
  const [golsCasaEditados, setGolsCasaEditados] = useState("");
  const [golsVisitanteEditados, setGolsVisitanteEditados] = useState("");

  const [token] = useContext(AuthContext);
  const [atualizarTabela, setAtulizarTabela] = useContext(UpdateContext);

  /**
   * Função carrega os dados da API
   */
  const carregaDadosDaApi = async () => {
    const requisicao = await requisicaoApiSemToken("GET", `/jogos/${rodada}`);
    const dadosApi = await requisicao.json();

    const dadosTratados = dadosApi.dados.map((time) => {
      return {
        id: time.id,
        timeCasa: time.time_casa,
        golsCasa: time.gols_casa,
        golsVisitante: time.gols_visitante,
        timeVisitante: time.time_visitante,
      };
    });

    setLoading(false);
    setDados(dadosTratados);
  };

  useEffect(() => {
    setEditarId(undefined);
  }, [token]);

  useEffect(() => {
    setLoading(true);
    carregaDadosDaApi();
    setEditarId(undefined);
  }, [rodada]);

  /**
   * Função muda o state "rodada" para rodada anterior.
   */
  const rodaAnterior = () => {
    if (rodada === 1) return;
    setRodada((prevState) => prevState - 1);
  };

  /**
   * Função muda o state "rodada" para a proxima rodada.
   */
  const proximaRoda = () => {
    if (rodada === 38) return;
    setRodada((prevState) => prevState + 1);
  };

  /**
   * Função salva o novo placar do Jogo no banco de dados.
   */
  const salvarJogo = async (id, golsCasa, golsVisitante) => {
    const conteudo = {
      id: id,
      golsCasa: parseInt(golsCasa, 10),
      golsVisitante: parseInt(golsVisitante, 10),
    };

    const requisicao = await requisicaoApiComToken(
      "PUT",
      "/jogos",
      conteudo,
      token
    );

    setEditarId(undefined);
    carregaDadosDaApi();
    setAtulizarTabela(!atualizarTabela);
  };

  return (
    <div className="rodada">
      <Cabecalho
        rodada={rodada}
        anterior={rodaAnterior}
        proxima={proximaRoda}
      />
      {loading && <p>Carregando...</p>}
      <table>
        <tbody>
          {!loading &&
            dados &&
            dados.map(
              (
                { id, timeCasa, timeVisitante, golsCasa, golsVisitante },
                index
              ) => (
                <tr key={id}>
                  <td>{timeCasa}</td>
                  {token && editarId === id ? (
                    <PlacarEditavel
                      dados={dados[index]}
                      setGolsCasaEditados={setGolsCasaEditados}
                      setGolsVisitanteEditados={setGolsVisitanteEditados}
                    />
                  ) : (
                    <PlacarExibicao
                      golsCasa={golsCasa}
                      golsVisitante={golsVisitante}
                    />
                  )}
                  <td>{timeVisitante}</td>
                  {token && (
                    <td>
                      {editarId === id ? (
                        <BotaoSalvar
                          salvarJogo={() => {
                            if (
                              golsCasa === golsCasaEditados &&
                              golsVisitante === golsVisitanteEditados
                            ) {
                              setEditarId(undefined);
                            } else {
                              salvarJogo(
                                id,
                                golsCasaEditados,
                                golsVisitanteEditados
                              );
                            }
                          }}
                        />
                      ) : (
                        <BotaoEditar
                          handleClick={() => {
                            setEditarId(id);
                          }}
                        />
                      )}
                    </td>
                  )}
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
}
