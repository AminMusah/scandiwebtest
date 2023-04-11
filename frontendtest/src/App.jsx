import { Route, Routes } from "react-router-dom";
import ProductProvider from "./context/ProductContext";
import Home from "./pages/Home";
import ProductAdd from "./pages/ProductAdd";

function App() {
  return (
    <ProductProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<ProductAdd />} />
      </Routes>
    </ProductProvider>
  );
}

export default App;
