// Logotipo da TopCar: "TOPCAR" em letras pesadas inclinadas 12°, no vermelho da loja, com a linha do teto
// de um carro passando por cima (lembra o carro do logo original). Medidas pela largura real da fonte
// Inter 900 (4,26 × o corpo para "TOPCAR"), sem esticar nem espremer as letras.
// "Automóveis" (logo.complemento) vai em texto ao lado, no HTML.
import loja from "./loja.js";

const SIGLA = String(loja.marca.sigla).toUpperCase();
const CORPO = 92; // tamanho da letra no desenho de 100 de altura
const ESPACO = -2; // aperto entre as letras
const LARGURA_TEXTO = Math.round(4.26 * CORPO * (SIGLA.length / 6) + ESPACO * (SIGLA.length - 1));
const INCLINA = 0.2126; // tan 12°
const LARGURA = Math.ceil(LARGURA_TEXTO + 68 * INCLINA + 6);
const FONTE = `font-family="Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif" font-weight="900"`;
// Teto do carro: sobe no para-brisa, corre pelo teto e cai na traseira; mais grosso no meio.
const fim = LARGURA - 14;
const TETO = `M8 30C${fim * 0.16} 24 ${fim * 0.27} 6 ${fim * 0.47} 4C${fim * 0.67} 2 ${fim * 0.83} 12 ${fim} 26C${fim * 0.84} 17 ${fim * 0.68} 11 ${fim * 0.48} 12C${fim * 0.3} 13 ${fim * 0.18} 23 8 30Z`;

const principal = loja.cores.principal || "#C8101A";
const noEscuro = loja.cores.principalNoEscuro || principal;
const CORES = {
  claro: { sigla: principal, teto: "#1D1E22" },
  escuro: { sigla: noEscuro, teto: "#D7D6D9" },
};

const escapar = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function desenho(variante, cor = CORES[variante] || CORES.claro) {
  return `<path class="logo__teto" fill="${cor.teto}" d="${TETO}"/><text class="logo__topcar" transform="translate(0 96) skewX(-12)" x="2" y="0" fill="${cor.sigla}" ${FONTE} font-size="${CORPO}" letter-spacing="${ESPACO}">${escapar(SIGLA)}</text>`;
}

function logo(variante = "claro", altura = 28) {
  return `<svg class="logo__marca logo__marca--${variante}" viewBox="0 0 ${LARGURA} 100" width="${Math.round((altura * LARGURA) / 100)}" height="${altura}" aria-hidden="true" focusable="false">${desenho(variante)}</svg>`;
}

// Ícone do site: o "T" vermelho com o teto, sobre quadrado grafite.
function icone(lado = 64) {
  const letra = escapar(SIGLA.charAt(0) || "T");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${lado}" height="${lado}" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#1D1E22"/><path fill="#D7D6D9" d="M10 22C18 19 24 11 33 10.5C42 10 49 14 54 20C48 17 42 15.5 33 16C25 16.5 18 19.5 10 22Z"/><text transform="translate(18 54) skewX(-12)" fill="${noEscuro}" ${FONTE} font-size="40">${letra}</text></svg>`;
}

// Prévia de link (1200 × 630), sem imagem de veículo.
function compartilhamento() {
  const texto = 'font-family="Helvetica, Arial, sans-serif"';
  const escala = Math.min(2, 900 / LARGURA);
  const linha = `${loja.descricao} · ${loja.endereco.cidade}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#1D1E22"/><g transform="translate(96 150) scale(${escala})">${desenho("escuro")}</g><text x="100" y="408" fill="#D7D6D9" ${texto} font-size="30" font-weight="700" letter-spacing="10">${escapar(String(loja.marca.complemento).toUpperCase())}</text><text x="100" y="470" fill="#BFBEC0" ${texto} font-size="28">${escapar(linha)}</text>${loja.demonstracao ? `<text x="100" y="560" fill="#8E9097" ${texto} font-size="22">Projeto de demonstração</text>` : ""}<rect y="622" width="1200" height="8" fill="${principal}"/></svg>`;
}

export default { logo, icone, compartilhamento };
