# Modelo de site para loja de carros: regras para o assistente

Modelo reutilizável, em pt-BR, derivado do site de demonstração da MVA Multicar. Serve para lojas de seminovos e usados, com ou sem oficina. O passo a passo para pessoas está em `COMO-USAR.md`.

## Montar o site de uma empresa nova

1. Trabalhe numa **cópia** da pasta, nunca no modelo original.
2. Preencha `empresa.json` só com dados que o usuário passou. Se faltar um dado, deixe `""` e avise o que falta: o site esconde o bloco ou mostra "a confirmar".
3. Escolha as cores a partir do logo ou da identidade da empresa: `principal` (botões), `principalEscura` (mais escura) e `principalNoEscuro` (mais clara, para o tema escuro). Confira o contraste do texto branco sobre a `principal` (mínimo 4,5:1).
4. Carros: uma pasta `imagens-geradas/<slug>/` com `01-capa.png` e um `src/veiculos/<slug>.md` com o mesmo nome (veja `COMO-USAR.md` §3). Apague os 3 carros de exemplo quando houver estoque real.
5. Publicação: o workflow `.github/workflows/publicar.yml` monta e publica no GitHub Pages; dispensa Node local.

## Invariantes

- **Nada inventado como se fosse real.** Nota do Google, número de avaliações, depoimentos, taxas, garantias e prazos só se o usuário fornecer. Dado fictício fica marcado como EXEMPLO (`exemplo: true` no carro, `demonstracao: true` na empresa).
- Depoimentos só com autorização do autor, com o texto exato.
- Enquanto `demonstracao` for `true`: faixa "Projeto de demonstração" em todas as páginas e `noindex`. Nunca citar agência, criador ou marca terceira no site.
- Stack fixa: Eleventy 3 + @11ty/eleventy-img, HTML, CSS e JavaScript puro. Sem frameworks nem bibliotecas novas.
- Fotos de veículos nunca são geradas nem alteradas pelo código. Toda imagem leva "Imagem ilustrativa" enquanto não for foto real.
- Uma única cor de ação, a `principal` da empresa. Movimento moderado, respeitando `prefers-reduced-motion`. Nunca esconder preço, ano, km, fotos ou WhatsApp.
- Commit e publicação só com autorização do usuário.

## Onde mexer

| O quê | Arquivo |
|---|---|
| Dados da empresa | `empresa.json` (derivados em `src/_data/loja.js`) |
| Logo, ícone do site e prévia de link | `src/_data/logotipo.js` (gera a partir de `logo.sigla`) |
| Cores neutras, componentes, tema escuro | `src/assets/css/site.css` (as cores da marca entram por `base.njk`) |
| Menu, filtros, favoritos, tema, galeria | `src/assets/js/site.js` |
| Páginas | `src/*.njk`, `src/_includes/` |
| Imagens ilustrativas (nomes, foco) | `src/_data/ilustracoes.js` |

## Como trabalhar

- Teste em 390 e 1440 px, nos temas claro e escuro, e confira o console. Diga o que não conseguiu verificar.
- Não abra `node_modules/`, `_site/` nem as imagens uma a uma.
