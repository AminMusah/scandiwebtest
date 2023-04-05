import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

function ProductCard() {
  const { products, setId } = useContext(ProductContext);
  const [check, setCheck] = useState(false);
  console.log(check);

  return (
    <>
      {products.map((product) => (
        <li key={product.id} className="product-card">
          <div className="top-section">
            <input
              type="checkbox"
              className="delete-checkbox"
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
              <div style={{ visibility: "hidden", fontSize: '0.02px' }}>NameTest000</div>
              <div style={{ visibility: "hidden", fontSize: '0.02px' }}>NameTest001</div>
              <div style={{ visibility: "hidden", fontSize: '0.02px' }}>NameTest002</div>
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
