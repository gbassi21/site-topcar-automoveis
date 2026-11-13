// Dados da empresa para os modelos. Lê empresa.json (o único arquivo a editar) e deriva o resto:
// números de WhatsApp, links do Instagram, do Google Maps e de "como chegar", e as mensagens prontas.
import fs from "node:fs";

const e = JSON.parse(fs.readFileSync(new URL("../../empresa.json", import.meta.url), "utf8"));

const digitos = (t) => String(t || "").replace(/\D/g, "");
const numeroWa = (t) => {
  const d = digitos(t);
  if (!d) return "";
  return d.startsWith("55") && d.length > 11 ? d : `55${d}`;
};
const whatsapp = (t) => ({ numero: numeroWa(t), exibicao: String(t || "") });
const instagram = (usuario, seguidores) => {
  const u = String(usuario || "").trim().replace(/^@/, "");
  return u ? { usuario: `@${u}`, link: `https://www.instagram.com/${u}/`, seguidores: seguidores || "" } : null;
};
const busca = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const rota = (q) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
const nota = (g, nome, endereco) => {
  const valor = Number(String(g?.nota ?? "").replace(",", "."));
  const qtd = Number(g?.avaliacoes) || 0;
  if (!valor || !qtd) return null; // sem nota real, o site esconde a nota
  return {
    valor,
    nota: valor.toFixed(1).replace(".", ","),
    avaliacoes: qtd,
    link: g.link || busca(`${nome} ${endereco}`),
    temas: g.temas || [],
  };
};

const end = e.endereco;
const enderecoCompleto = `${end.logradouro}, ${end.bairro}, ${end.cidade}, ${end.cep}`;

const of = e.oficina || {};
const temOficina = Boolean(of.ativa && of.nome);
const enderecoOficina = temOficina ? `${of.endereco}, ${end.cidade}, ${of.cep || end.cep}` : "";

const entrega = {
  titulo: e.entrega?.titulo || "Retire o seu carro",
  texto: e.entrega?.texto || "Com tudo certo, é assinar o contrato e sair dirigindo.",
  especial: Boolean(e.entrega?.titulo && e.entrega?.texto),
};

export default {
  demonstracao: e.demonstracao !== false,
  nome: e.nome,
  marca: { sigla: e.logo?.sigla || e.nome, complemento: e.logo?.complemento || "" },
  cores: e.cores || {},
  descricao: e.descricao,
  endereco: end,
  whatsapp: whatsapp(e.whatsapp),
  horario: e.horario || "a confirmar",
  instagram: instagram(e.instagram, e.instagramSeguidores),
  cnpj: e.cnpj || "",
  google: nota(e.google, e.nome, enderecoCompleto),
  notasEm: e.google?.consultadoEm || "",
  googleMaps: {
    chave: e.googleMapsChave || "",
    comentariosPorUnidade: 3,
    buscaLoja: `${e.nome}, ${enderecoCompleto}`,
    buscaOficina: temOficina ? `${of.nome}, ${enderecoOficina}` : "",
  },
  depoimentos: e.depoimentos || [],
  valoresEm: e.valoresEm,
  entrega,
  repasse: Boolean(e.repasse),
  mapa: rota(enderecoCompleto),
  oficina: temOficina
    ? {
        nome: of.nome,
        endereco: of.endereco,
        referencia: of.referencia || "",
        cep: of.cep || end.cep,
        desde: of.desde || "",
        horario: of.horario || "a confirmar",
        whatsapp: whatsapp(of.whatsapp || e.whatsapp),
        instagram: instagram(of.instagram, of.instagramSeguidores),
        google: nota(of.google, of.nome, enderecoOficina),
        servicos: of.servicos || [],
        mapa: rota(enderecoOficina),
      }
    : null,
  mensagens: {
    geral: `Olá! Vim pelo site da ${e.nome} e quero mais informações.`,
    avaliacao: `Olá! Quero avaliar meu carro para venda ou troca na ${e.nome}. Marca, modelo, ano e km: `,
    avaliacaoForm: `Olá! Quero avaliar meu carro na ${e.nome}.`,
    financiamento: `Olá! Quero saber como funciona o financiamento na ${e.nome}.`,
    oficina: temOficina ? `Olá! Vim pelo site e quero agendar um serviço na ${of.nome}. Serviço: ` : "",
    procura: "Olá! Não achei no site o carro que procuro. Procuro: ",
    lojista: `Olá! Sou lojista e quero saber dos carros da ${e.nome} no repasse.`,
    favoritos: `Olá! Vi estes carros no site da ${e.nome} e quero saber mais:`,
  },
};
