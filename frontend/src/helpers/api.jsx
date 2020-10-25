const API_URL = `http://localhost:8081`;

export async function requisicaoApiSemToken(
  metodo,
  rota = "/",
  conteudo = null
) {
  const body = conteudo ? JSON.stringify(conteudo) : null;
  return fetch(API_URL + rota, {
    method: metodo,
    headers: {
      "content-type": "application/json",
    },
    body,
  });
}

export async function requisicaoApiComToken(
  metodo,
  rota = "/",
  conteudo = null,
  token = null
) {
  const body = conteudo ? JSON.stringify(conteudo) : null;
  return fetch(API_URL + rota, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      Authorization: token && `Bearer ${token}`,
    },
    body,
  });
}
