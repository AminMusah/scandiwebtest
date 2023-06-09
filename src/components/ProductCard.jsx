import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

function ProductCard() {
  const { products, setId} = useContext(ProductContext);

  return (
    <>
      {products.map((product) => (
        <li key={product.id} className="product-card">
          <div className="top-section">
            <input
              type="checkbox"
              onClick={() => {
                setId((prevState) => [...prevState, product.id]);
              }}
            />
          </div>
          <div className="middle-section">
            <div>
              <span> {product.sku} </span>
            </div>
            <div>
              <span> {product.name}</span>
            </div>
            <div>
              <span>{Number(product.price).toFixed(2) + " $"}</span>
            </div>
            
            <div>
              {product.type === "Book"
                ? "Weight: " + product.attribute + "KG"
                : product.type === "DVD"
                ? "Size: " + product.attribute + " MB"
                : product.type === "Furniture"
                ? "Dimensions: " + product.attribute.split("").join("x")
                : ""}
            </div>
          </div>
        </li>
      ))}
    </>
  );
}

export default ProductCard;
