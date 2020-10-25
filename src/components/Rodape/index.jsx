import React from "react";
import "./style.css";

import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Componente principal cria o rodapé do site.
 */
export default function index() {
  return (
    <div>
      <div className="rodape">
        <div className="container">
          <div>
            <FontAwesomeIcon icon={faFutbol} color="white" size="1x" />{" "}
            Brasileirão
          </div>
          <p>Todos direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
