import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ProductsManager } from "./components/products/ProductsManager";


const App = () => {
  return (
    <>
      <ToastContainer />
      <ProductsManager />
    </>
  );
};

export default App;
