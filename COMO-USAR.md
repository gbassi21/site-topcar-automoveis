# Modelo de site para loja de carros: como usar

Este é o mesmo site da MVA Multicar, mas sem nada da MVA. Ele tem vitrine com filtros, página de cada carro com galeria, favoritos, tema claro e escuro, vender ou trocar, financiamento, oficina, contato e privacidade.

Para cada empresa nova você troca **os dados (um arquivo), as fotos dos carros e, se quiser, as imagens ilustrativas**. O resto se ajusta sozinho: nome, logo, cores, WhatsApp, mensagens prontas, mapa e textos.

O jeito mais fácil é abrir o Claude numa cópia desta pasta e dizer: *"Monte o site para a empresa X"*, passando os dados do checklist abaixo. As regras para o Claude estão em `AGENTS.md`.

---

## 1. Copie a pasta

Copie `modelo-loja-de-carros` inteira e dê o nome da empresa, por exemplo `site-auto-silva`. Não mexa no modelo original: ele é a matriz das próximas cópias.

## 2. Preencha o `empresa.json`

É o único arquivo de dados. Um campo que ficar vazio (`""`) faz o site esconder aquele bloco ou mostrar "a confirmar".

| Campo | O que pôr | Exemplo |
|---|---|---|
| `demonstracao` | `true` para mostrar a faixa "Projeto de demonstração" e não aparecer no Google; `false` quando for o site oficial | `true` |
| `nome` | Nome da empresa, como aparece nos textos e nas mensagens | `Auto Silva Seminovos` |
| `logo.sigla` | 2 a 5 letras desenhadas no logo | `AS` |
| `logo.complemento` | Palavra ao lado do logo (pode ficar vazia) | `Seminovos` |
| `cores.principal` | Cor dos botões, em hexadecimal | `#1D5BD8` |
| `cores.principalEscura` | A mesma cor um pouco mais escura, usada no hover e no logo | `#1747A8` |
| `cores.principalNoEscuro` | A mesma cor mais clara, usada no tema escuro | `#6B9BFF` |
| `descricao` | O que a loja vende, curto | `Seminovos e usados multimarcas` |
| `endereco` | Rua e número, bairro, cidade (UF) e CEP | `Rua X, 10` · `Centro` · `Vitória (ES)` |
| `whatsapp` | Número com DDD, do jeito que aparece no site | `(27) 99999-0000` |
| `horario` | Horário de atendimento | `Seg a sex, 8h às 18h` |
| `instagram`, `instagramSeguidores` | `@usuario` e, se quiser, "cerca de 2 mil" | `@autosilva` |
| `cnpj` | CNPJ, para a página de privacidade | |
| `google.nota`, `google.avaliacoes`, `google.consultadoEm` | Nota e quantidade de avaliações **reais** do Google, e a data da consulta. Vazio = o site esconde a seção de avaliações | `4,8` · `120` · `10/nov/2026` |
| `googleMapsChave` | Chave da API do Google Maps, se quiser os comentários de 5 estrelas ao vivo | |
| `depoimentos` | Comentários de clientes **com autorização**, texto exato: `{ "unidade": "loja", "nome": "...", "texto": "..." }` | |
| `valoresEm` | Data dos preços do estoque | `10/nov/2026` |
| `entrega.titulo`, `entrega.texto` | Um ritual de entrega da loja, se houver (na MVA era o laço vermelho). Vazio = texto genérico | |
| `repasse` | `true` se a loja vende para outros lojistas | `false` |
| `oficina.ativa` | `false` se a empresa não tem oficina: some o menu, a página e as seções da oficina | `true` |
| `oficina.*` | Nome, endereço, WhatsApp, horário, Instagram, nota do Google e serviços da oficina | |

Ícones disponíveis para os serviços: os arquivos de `lib/icones/linha/`, sem o `.svg`.

## 3. Coloque os carros

Para cada carro:

1. Crie a pasta `imagens-geradas/<marca-modelo-versao-ano>/`, por exemplo `imagens-geradas/fiat-mobi-like-2021/`.
2. Ponha as fotos com estes nomes: `01-capa.png` (obrigatória), `02-frente.png`, `03-lateral.png`, `04-traseira-34.png`, `05-traseira.png`, `06-porta-malas.png`, `07-farol.png`, `08-lanterna.png`, `09-roda.png`, `10-retrovisor.png`, `11-painel.png`, `12-volante.png` e `13-destaque.png`. Só a capa é obrigatória.
3. Copie um arquivo de `src/veiculos/` com o **mesmo nome da pasta** (`src/veiculos/fiat-mobi-like-2021.md`) e troque marca, modelo, versão, ano, km, preço, carroceria (`hatch`, `seda`, `suv` ou `picape`), câmbio, combustível, motor e cor.
4. Apague as linhas `exemplo: true` e o comentário de EXEMPLO quando o carro for real.

Os 3 carros que vêm no modelo (Onix, Tracker e Strada) são **fictícios**. Apague a pasta de fotos e o `.md` de cada um quando colocar o estoque de verdade.

## 4. Imagens ilustrativas (opcional)

Sem elas, o site mostra blocos na cor da marca com um ícone, e funciona assim mesmo. Para trocar um bloco por uma foto, salve um PNG em `imagens-ia/` com um destes nomes:

| Arquivo | Onde aparece | Formato |
|---|---|---|
| `ia-hero-entrega.png` | Topo da página inicial (no lugar da foto do primeiro carro) e "Quem somos" | 3:2 |
| `ia-card-avaliacao.png` | Card "Quanto vale o seu carro?" e topo de Vender ou trocar | 3:2 |
| `ia-card-financiamento.png` | Card e topo de Financiamento | 3:2 |
| `ia-card-oficina.png` | Card e topo da Oficina | 3:2 |
| `ia-oficina-alinhamento.png`, `ia-oficina-freios.png`, `ia-oficina-oleo.png`, `ia-oficina-pneus.png` | Serviços da oficina | 2:3 (em pé) |
| `ia-assinatura-contrato.png` | Financiamento | 3:2 |
| `ia-atendimento-loja.png` | Topo de "Quem somos" | 3:2 |
| `ia-patio-loja.png` | "Venha ver de perto", em "Quem somos" | 3:2 |
| `ia-ilustra-localizacao.png` | Topo de Contato | 3:2 |

Use pessoas fictícias, sem logos e sem texto legível. Se o recorte cortar o assunto, ajuste o campo `foco` em `src/_data/ilustracoes.js`.

## 5. Publique no GitHub Pages (sem instalar nada)

1. No GitHub, crie um repositório novo e público com o nome do site (por exemplo `site-auto-silva`).
2. Envie os arquivos da pasta. Pelo navegador, use **Add file → Upload files**; ou peça ao Claude para enviar.
3. No repositório, abra **Settings → Pages** e, em **Source**, escolha **GitHub Actions**. Isso só é feito uma vez.
4. Em 2 a 3 minutos o site fica em `https://<seu-usuario>.github.io/<nome-do-repositorio>/`. O andamento aparece na aba **Actions**.

Cada vez que você enviar uma mudança, o GitHub monta e publica o site sozinho, pelo arquivo `.github/workflows/publicar.yml`.

Com Node instalado também dá para ver no computador: `npm install` uma vez e depois `npm run dev` (http://localhost:8080).

## 6. Antes de entregar ao cliente

- [ ] `empresa.json` sem dado de exemplo (`Rua Exemplo`, `(11) 90000-0000`, `Auto Exemplo`)
- [ ] Carros fictícios removidos ou marcados com `exemplo: true`
- [ ] Nota do Google e depoimentos só se forem reais e autorizados
- [ ] Testar o WhatsApp de um carro, do formulário de avaliação e dos favoritos
- [ ] Ver no celular e no computador, nos temas claro e escuro
- [ ] Site oficial: `demonstracao: false`. Se publicar fora do GitHub Pages, apague também a linha de `noindex` de `src/_headers`
