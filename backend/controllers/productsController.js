import fs from "fs/promises";
import { findProductById } from "../services/productService.js";

const errorResponse = (res, statusCode, message) => {
  res.status(statusCode).send({
    success: false,
    message: message,
  });
};
const successResponse = (res, statusCode, message, payload) => {
  res.status(statusCode).send({
    success: true,
    message: message,
    payload: payload,
  });
};

//GET: /products -> get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    successResponse(res, 200, "Return all products", products);
  } catch (error) {
    next(error);
  }
};

//GET: /products:id -> get a single product
export const getSingleProducts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    const isFoundProduct = findProductById(id, products);
    if (!isFoundProduct) {
      const error = new Error(`Product not found with the id ${id}`);
      error.status = 404;
      throw error;
    }
    successResponse(
      res,
      200,
      `Single Product is returned with the id ${id}`,
      isFoundProduct
    );
  } catch (error) {
    next(error);
  }
};

//DELETE: /products:id -> delete a product
export const deleteProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    let products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    const productIndex = products.findIndex((product) => product.id == id);
    if (productIndex == -1) {
      errorResponse(res, 500, `Product not found with the id ${id}`);
      return;
    }
    products.splice(productIndex, 1);
    await fs.writeFile("products.json", JSON.stringify(products));
    successResponse(
      res,
      200,
      `Single Product is deleted with the id ${id}`,
      products
    );
  } catch (error) {
    next(error);
  }
};

//POST: /products -> add a new product
export const addProducts = async (req, res, next) => {
  try {
    const { name, price, image, description, categories, sizes, variants } =
      req.body;
    const newProduct = {
      id: +new Date().getTime(),
      name: name,
      price: price,
      image: image,
      description: description,
      categories: categories.join(" , "),
      variants: variants.join(" , "),
      sizes: sizes.join(" , "),
    };
    const existingProducts = JSON.parse(
      await fs.readFile("products.json", "utf-8")
    );
    existingProducts.push(newProduct);
    await fs.writeFile("products.json", JSON.stringify(existingProducts));
    successResponse(res, 201, "New Products is added", newProduct);
  } catch (error) {
    next(error);
  }
};

//PUT: /products:id -> update a product
export const updateProducts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, price, image, description, categories, sizes, variants } =
      req.body;
    let products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    const productIndex = products.findIndex((product) => product.id == id);
    if (productIndex == -1) {
      errorResponse(res, 500, `Product not found with the id ${id}`);
      return;
    }
    products[productIndex].name = name ?? products[productIndex].name;
    products[productIndex].image = image ?? products[productIndex].image;
    products[productIndex].description =
      description ?? products[productIndex].description;
    products[productIndex].categories =
      categories ?? products[productIndex].categories;
    products[productIndex].variants =
      variants ?? products[productIndex].variants;
    products[productIndex].sizes = sizes ?? products[productIndex].sizes;
    products[productIndex].price = price ?? products[productIndex].price;
    await fs.writeFile("products.json", JSON.stringify(products));
    successResponse(
      res,
      200,
      `Single Product is updated with the id ${id}`,
      products[productIndex]
    );
  } catch (error) {
    next(error);
  }
};
