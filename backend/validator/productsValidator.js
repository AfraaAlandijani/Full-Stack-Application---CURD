import { check } from "express-validator";

export const productIdValidation = [
  check("id").isNumeric().withMessage("product id must be number"),
];

export const validateCreateProduct = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Product Name is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Product Name should be at least 3-200 characters long"),
  check("image")
    .trim()
    .notEmpty()
    .withMessage("Product Image is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Product Image can be a url.jpg"),
  check("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 3 })
    .withMessage("Description should be at least 3 characters long"),
  check("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
];

export const validateUpdateProduct = [
  check("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product Name is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Product Name should be at least 3-200 characters long"),
  check("image")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product Image is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Product Image can be a url.jpg"),
  check("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 3 })
    .withMessage("Description should be at least 3 characters long"),
  check("price")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
];
