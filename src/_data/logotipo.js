// Logotipo gerado a partir de empresa.json: a sigla (logo.sigla) em letras inclinadas 12°, com os três
// traços de velocidade na cor principal. O complemento (logo.complemento) vai em texto ao lado, no HTML.
// Para usar um logo próprio em SVG, troque o retorno de desenho() pelo desenho da empresa.
import loja from "./loja.js";

const SIGLA = String(loja.marca.sigla).toUpperCase();
const LARGURA_LETRA = 84; // por caractere, a 120 de corpo
const LARGURA_TEXTO = Math.max(1, SIGLA.length) * LARGURA_LETRA;
const LARGURA = LARGURA_TEXTO + 30;
const TRACOS = "M-46 14H-8V28H-46Z M-36 43H-8V57H-36Z M-26 72H-8V86H-26Z";
const INCLINACAO = "translate(52 0) skewX(-12)";
const FONTE = `font-family="Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif" font-weight="800"`;

const principal = loja.cores.principalEscura || loja.cores.principal || "#B2251D";
const noEscuro = loja.cores.principalNoEscuro || principal;
const CORES = {
  claro: { sigla: "#1D1E22", tracos: principal },
  escuro: { sigla: "#D7D6D9", tracos: noEscuro },
};

const escapar = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function desenho(variante, cor = CORES[variante] || CORES.claro) {
  return `<g transform="${INCLINACAO}"><path class="logo__tracos" fill="${cor.tracos}" d="${TRACOS}"/><text class="logo__sigla" x="0" y="100" fill="${cor.sigla}" ${FONTE} font-size="138" textLength="${LARGURA_TEXTO}" lengthAdjust="spacingAndGlyphs">${escapar(SIGLA)}</text></g>`;
}

function logo(variante = "claro", altura = 28) {
  return `<svg class="logo__marca logo__marca--${variante}" viewBox="0 0 ${LARGURA} 100" width="${Math.round((altura * LARGURA) / 100)}" height="${altura}" aria-hidden="true" focusable="false">${desenho(variante)}</svg>`;
}

// Ícone do site: a primeira letra da sigla com os traços, sobre quadrado grafite.
function icone(lado = 64) {
  const letra = escapar(SIGLA.charAt(0) || "A");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${lado}" height="${lado}" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#1D1E22"/><g transform="translate(14 18) scale(.28)"><g transform="${INCLINACAO}"><path fill="${noEscuro}" d="${TRACOS}"/><text x="0" y="100" fill="#FFFFFF" ${FONTE} font-size="138">${letra}</text></g></g></svg>`;
}

// Prévia de link (1200 × 630), sem imagem de veículo.
function compartilhamento() {
  const texto = 'font-family="Helvetica, Arial, sans-serif"';
  const escala = Math.min(1.6, 900 / LARGURA);
  const linha = `${loja.descricao} · ${loja.endereco.cidade}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#1D1E22"/><g transform="translate(96 190) scale(${escala})">${desenho("escuro")}</g><text x="100" y="408" fill="#D7D6D9" ${texto} font-size="30" font-weight="700" letter-spacing="10">${escapar(String(loja.marca.complemento).toUpperCase())}</text><text x="100" y="470" fill="#BFBEC0" ${texto} font-size="28">${escapar(linha)}</text>${loja.demonstracao ? `<text x="100" y="560" fill="#8E9097" ${texto} font-size="22">Projeto de demonstração</text>` : ""}<rect y="622" width="1200" height="8" fill="${principal}"/></svg>`;
}

export default { logo, icone, compartilhamento };
