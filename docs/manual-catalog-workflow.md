# Fluxo manual de produtos (sem admin)

Use a ferramenta local:

- `tools/manual-product-builder.html`

## Como usar

1. Abra `tools/manual-product-builder.html` no navegador.
2. Preencha os dados do aparelho.
3. Adicione ofertas por loja com:
   - preco final
   - link afiliado
   - link da imagem
   - frete, cupom, badges e demais campos opcionais
4. Clique em `Gerar JSON`.
5. Copie o bloco gerado.
6. Cole no array de `products.json`.

## Observacoes

- O site le os cards a partir de `products.json`.
- Para o comparador entre lojas funcionar melhor, mantenha o mesmo `gtin` para o mesmo modelo.
- Campos opcionais podem ficar vazios.
