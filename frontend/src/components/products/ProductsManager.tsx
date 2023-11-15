import { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import {
  Container,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Paper,
  Table,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { toast } from "react-toastify";
import axios from "axios";

import { ProductForm } from "./ProductForm";
import theme from "../../theme";
import { AppDispatch } from "../../redux/store";
import {
  Product,
  addProduct,
  updateProduct,
} from "../../redux/slices/products/productSlice";

const initialProductState: Product = {
  id: 0,
  name: "",
  price: 0,
  image: "",
  description: "",
  categories: [],
  variants: [],
  sizes: [],
};

export function ProductsManager() {
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<Product>(initialProductState);
  const [isEdit, setIsEdit] = useState(false);
  const [productId, setProductId] = useState(0);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategories, setProductCategories] = useState("");
  const [productVariants, setProductVariants] = useState("");
  const [productSize, setProductSize] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:3002/products");
    setProducts(data.payload);
  };

  const handleDelete = async (id: number) => {
    console.log(id);
    await axios.delete(`http://localhost:3002/products/${id}`);
    fetchProducts();
  };

  const handleCreateProduct = async (product: Product) => {
    try {
      const response = await axios.post(
        `http://localhost:3002/products`,
        product
      );
      fetchProducts();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleUpdateProduct = async (id: number) => {
    try {
      const response = await axios.put(
        `http://localhost:3002/products/${id}`,
        product
      );
      fetchProducts();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleEditForm = (
    id: number,
    name: string,
    image: string,
    description: string,
    variants: string,
    size: string,
    price: number
  ) => {
    setProductId(id);
    setIsEdit(!isEdit);
    setProductName(name);
    setProductPrice(price);
    setProductImage(image);
    setProductDescription(description);
    setProductVariants(variants);
    setProductSize(size);
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setProductName(value);
        break;
      case "price":
        setProductPrice(Number(value));
        break;
      case "image":
        setProductImage(value);
        break;
      case "description":
        setProductDescription(value);
        break;
      case "categories":
        setProductCategories(value);
        break;
      case "variants":
        setProductVariants(value);
        break;
      case "sizes":
        setProductSize(value);
        break;
      default:
        throw new Error("Unknown name");
    }

    const isList =
      name === "categories" || name === "variants" || name === "sizes";
    if (isList) {
      setProduct({
        ...product,
        [name]: value,
      });
      return;
    }
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isEdit) {
      // let's add Id property to the object (usually IDs are generated automatically on the backend)
      product.id = +new Date().getTime();
      console.log("product:", product);
      handleCreateProduct(product);
      dispatch(addProduct({ product }));
    } else {
      const updateCategoryData = {
        id: productId,
        name: productName,
        image: productImage,
        description: productDescription,
        categories: productCategories.split(","),
        variants: productVariants.split(","),
        sizes: productSize.split(","),
        price: productPrice,
      };
      handleUpdateProduct(productId);
      dispatch(updateProduct(updateCategoryData));
      setIsEdit(!isEdit);
    }
    // Reset the form
    setProduct(initialProductState);
    setProductName("");
    setProductPrice(0);
    setProductImage("");
    setProductDescription("");
    setProductVariants("");
    setProductSize("");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Container component="main" maxWidth="lg">
          <ProductForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            isEdit={isEdit}
            productName={productName}
            productPrice={productPrice}
            productImage={productImage}
            productDescription={productDescription}
            productCategories={productCategories}
            productVariants={productVariants}
            productSize={productSize}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow>
                  <TableCell>ID </TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Variants</TableCell>
                  <TableCell align="left">Size</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Edit</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <TableRow
                      key={product.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {product.id}
                      </TableCell>
                      <TableCell align="left">{product.name}</TableCell>
                      <TableCell align="left">
                        <img src={product.image} width={100} />
                      </TableCell>
                      <TableCell align="left">{product.description}</TableCell>
                      <TableCell align="left">
                        {product.variants && product.variants}
                      </TableCell>
                      <TableCell align="left">
                        {product.sizes && product.sizes}
                      </TableCell>
                      <TableCell align="left">{product.price}</TableCell>

                      <TableCell align="left">
                        <FaEdit
                          onClick={() => {
                            handleEditForm(
                              product.id,
                              product.name,
                              product.image,
                              product.description,
                              product.variants,
                              product.sizes,
                              product.price
                            );
                          }}
                        />{" "}
                      </TableCell>
                      <TableCell align="left">
                        <FaTrashAlt
                          onClick={() => {
                            handleDelete(product.id);
                          }}
                        />{" "}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>There is no products </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}
