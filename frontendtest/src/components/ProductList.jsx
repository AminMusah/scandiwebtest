import { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "./Loader";
import { ProductContext } from "../context/ProductContext";

function ProductList() {
  const { loading, setLoading, message, products } = useContext(ProductContext);

  return (
    <ul className="product-list">
  
      {/* {loading ? <Loader /> : <ProductCard />} */}
      {/* {products.length < 1 ? setLoading(false) || <h1>No products :(</h1> : ""} */}
      <ProductCard />
    </ul>
  );
}

export default ProductList;
