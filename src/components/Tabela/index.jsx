import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { requisicaoApiSemToken } from "../../helpers/api";
import { UpdateContext } from "../../container/UpdateProvider";
import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Componente a lista de legendas abaixo da tabela.
 */
const Legenda = () => {
  return (
    <div className="legenda">
      <ul>
        <li>
          <span style={{ backgroundColor: "#7bed9f" }}></span> Fase de grupos da
          Copa Libertadores
        </li>
        <li>
          <span style={{ backgroundColor: "#70a1ff" }}></span> Qualificatórias
          da Copa Libertadores
        </li>
        <li>
          <span style={{ backgroundColor: "#eccc68" }}></span> Fase de grupos da
          Copa Sul-Americana
        </li>
        <li>
          <span style={{ backgroundColor: "#ff6b81" }}></span> Rebaixamento
        </li>
      </ul>
    </div>
  );
};

/**
 * Estado inicial das colunas, defidas de acordo com banco de dados.
 */
const colunas = [
  "posicao",
  "nome",
  "pontos",
  "vitorias",
  "empates",
  "derrotas",
  "golsFeitos",
  "golsSofridos",
  "saldoDeGols",
];

/**
 * Componente principal cria a tabela de classificação.
 */
export default function Tabela() {
  const [loading, setLoading] = useState(true);
  const [ordem, setOrdem] = useState("asc");
  const [dados, setDados] = useState(undefined);
  const [colunaAtiva, setColunaAtiva] = useState("posicao");
  const [atualizarTabela] = useContext(UpdateContext);

  /**
   * Função carrega os dados da API
   */
  const carregarDadosDaApi = async () => {
    const requisicao = await requisicaoApiSemToken("GET", `/classificacao`);
    const dadosApi = await requisicao.json();

    const dadosTratados = dadosApi.dados.map((time, index) => {
      return {
        posicao: index + 1,
        nome: time.nome,
        pontos: time.pontos,
        vitorias: time.vitorias,
        empates: time.empates,
        derrotas: time.derrotas,
        golsFeitos: time.golsFeitos,
        golsSofridos: time.golsSofridos,
        saldoDeGols: time.golsFeitos - time.golsSofridos,
        escudoImagem: "http://localhost:3000" + time.escudoImagem,
      };
    });

    setLoading(false);
    setDados(dadosTratados);
    // setColunas(Object.keys(dadosTratados[0]));
  };

  /**
   * Função para ordenar a tabela em ordem decrescente e ordem crescente.
   */
  const ordenar = (cl) => {
    const dadosOrdenados = [...dados].sort((a, b) => {
      if (typeof a[cl] === "number" && typeof b[cl] === "number") {
        if (parseInt(a[cl]) < parseInt(b[cl])) {
          return ordem === "desc" ? -1 : 1;
        }
        if (parseInt(a[cl]) > parseInt(b[cl])) {
          return ordem === "desc" ? 1 : -1;
        }
        return 0;
      }
      return ordem === "desc"
        ? a[cl].localeCompare(b[cl])
        : b[cl].localeCompare(a[cl]);
    });

    setDados(dadosOrdenados);
    setOrdem((ordem) => (ordem === "desc" ? "asc" : "desc"));
  };

  /**
   * Carrega os dados da API e caso um jogo seja atualizado recarrega os dados.
   */
  useEffect(() => {
    carregarDadosDaApi();
  }, [atualizarTabela]);

  /**
   * Função retorna a cor da borda baseado na posição.
   */
  const corDaPosicao = (posicao) => {
    if (posicao <= 4) {
      return "#7bed9f";
    } else if (posicao > 4 && posicao <= 6) {
      return "#70a1ff";
    } else if (posicao > 6 && posicao <= 12) {
      return "#eccc68";
    } else if (posicao > 16 && posicao <= 20) {
      return "#ff6b81";
    }
    return "#f1f2f6";
  };

  return (
    <>
      <div className="tabela">
        <table>
          <thead>
            <tr>
              {colunas.map((coluna) => (
                <th key={coluna}>
                  {(coluna === "posicao" && "Posição") ||
                    (coluna === "nome" && "Time") ||
                    (coluna === "pontos" && "PTS") ||
                    (coluna === "vitorias" && "V") ||
                    (coluna === "empates" && "E") ||
                    (coluna === "derrotas" && "D") ||
                    (coluna === "golsFeitos" && "GF") ||
                    (coluna === "golsSofridos" && "GS") ||
                    (coluna === "saldoDeGols" && "SD")}
                  <button
                    className="botaoOrdenar"
                    onClick={() => {
                      ordenar(coluna);
                      setColunaAtiva(coluna);
                    }}
                  >
                    {colunaAtiva !== coluna ? (
                      <FontAwesomeIcon icon={faSort} color="white" size="lg" />
                    ) : ordem === "asc" ? (
                      <FontAwesomeIcon
                        icon={faSortUp}
                        color="white"
                        size="lg"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSortDown}
                        color="white"
                        size="lg"
                      />
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td>Carregando...</td>
              </tr>
            )}
            {!loading &&
              dados &&
              dados.map((time, index) => (
                <tr key={index}>
                  {colunas.map((coluna, index) => (
                    <td
                      style={{
                        borderLeftColor: corDaPosicao(time.posicao),
                      }}
                      key={index}
                    >
                      {coluna === "nome" ? (
                        <div className="nomeTime">
                          <img src={time.escudoImagem} alt={time[coluna]} />
                          <span> {time[coluna]} </span>
                        </div>
                      ) : (
                        time[coluna]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {!loading && <Legenda />}
      </div>
    </>
  );
}
