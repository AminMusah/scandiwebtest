import { createContext, useState, useEffect } from "react";
import production from '../production/base'

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("Select Type");
  const [attribute, setAttribute] = useState("");
  const [size, setSize] = useState(0);
  const [weight, setWeight] = useState("");
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [height, setHeight] = useState(0);
  const [message, setMessage] = useState("");
  const [skuMessage, setSkuMessage] = useState(false);
  const [validate, setValidate] = useState(false);
  const [id, setId] = useState([]);
  const [check, setCheck] = useState(false);


  //Get All products
  useEffect(() => {
    try {
      const fetchProducts = async () => {
        setLoading(true);
        
      await fetch(
        `${production}/read.php`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setProducts(data);
          // console.log(data);
        })
        .catch(function (error) {
          console.error(error);
        });
      };
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //find product sku
  const productSku = products.find((product) => product.sku === sku);

  //Add Product
  const create = async (e) => {
    try {
      e.preventDefault();

      // Check if required fields are not empty
      if (
        sku.trim() === "" ||
        name.trim() === "" ||
        price === "" ||
        type.trim() === "Select Type" ||
        attribute === [] 
       
      ) {
        return setValidate(true);
      } else {
        setValidate(false);
      }

      // check if sku already exists
      if (productSku) {
        return setSkuMessage(true);
      } else {
        setSkuMessage(false);
      }

      await fetch(
        `${production}/create.php`,
        {
          method: "POST",
          body: JSON.stringify({
            sku,
            name,
            price,
            type,
            attribute: size || weight || [height, width, length].join(""),
          }),
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          data: sku, name, price, type, attribute;
        })
        .catch(function (error) {
          console.error(error);
        });

      //reset all input
      setSku("");
      setName("");
      setPrice("");
      setType("Select Type");
      setAttribute("");

      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  //Mass Delete
  const handleDelete = async (id) => {
    try {   
       fetch(
        `${production}/delete.php`,
        {
          method: "POST",
          body: JSON.stringify({
            ids: [...id,id],
          }),
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("Deleted:", [id]);
        })
        .catch(function (error) {
          console.error(error);
        });
        
        setCheck(!check)

      // window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        loading,
        setLoading,
        handleDelete,
        id,
        setId,
        sku,
        setSku,
        name,
        setName,
        price,
        setPrice,
        attribute,
        setAttribute,
        height,
        setHeight,
        weight,
        setWeight,
        width,
        setWidth,
        length,
        setLength,
        type,
        setType,
        size,
        setSize,
        create,
        message,
        skuMessage,
        validate,
        check,
        setCheck
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
