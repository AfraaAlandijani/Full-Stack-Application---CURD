import { Router } from "express";
import {
  addProducts,
  deleteProducts,
  getAllProducts,
  getSingleProducts,
  updateProducts,
} from "../controllers/productsController.js";
import {
  productIdValidation,
  validateCreateProduct,
  validateUpdateProduct,
} from "../validator/productsValidator.js";
import { runValidation } from "../validator/index.js";

const productsRouter = Router();

//GET: /products -> get all products
productsRouter.get("/", getAllProducts);

//GET: /products:id -> get a single product
productsRouter.get(
  "/:id",
  productIdValidation,
  runValidation,
  getSingleProducts
);

//POST: /products -> add a new product
productsRouter.post("/", validateCreateProduct, runValidation, addProducts);

//DELETE: /products:id -> delete a product
productsRouter.delete(
  "/:id",
  productIdValidation,
  runValidation,
  deleteProducts
);

//PUT: /products:id -> update a product
productsRouter.put(
  "/:id",
  productIdValidation,
  validateUpdateProduct,
  runValidation,
  updateProducts
);

export default productsRouter;
