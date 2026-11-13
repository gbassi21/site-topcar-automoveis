// Sem oficina em empresa.json (oficina.ativa = false), a página /oficina/ não é gerada.
export default {
  eleventyComputed: {
    permalink: (d) => (d.loja.oficina ? "/oficina/" : false),
  },
};
