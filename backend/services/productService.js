export const findProductById = (productId, products) => {
  return products.find((product) => String(product.id) == productId);
};
