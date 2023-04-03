import { createContext, useState, useEffect } from "react";
import axios from "axios";

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

  //Get All products
  useEffect(() => {
    try {
      const fetchProducts = async () => {
        setLoading(true);
        const res = await axios.get(
          `https://hostscandiwebjuniortest.000webhostapp.com/backendtest/api/products/read.php`
        );
        console.log(res.data);
        setMessage(res.data.message);
        res.data.length > 0 ? setLoading(false) : setLoading(true);
        setProducts(res.data);
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
      //  if (
      //   sku.trim() === "" ||
      //   name.trim() === "" ||
      //   price === "" ||
      //   type.trim() === "Select Type" ||
      //   attribute === [] ||
      //   size === 0 
       
      // ) {
      //   return setValidate(true);
      // } else {
      //   setValidate(false);
      // }

      //check if sku already exists
      // if (productSku) {
      //   return setSkuMessage(true);
      // } else {
      //   setSkuMessage(false);
      // }

      const res = await axios.post(
        `https://hostscandiwebjuniortest.000webhostapp.com/backendtest/api/products/create.php`,
        {
          sku,
          name,
          price,
          type,
          attribute: size || weight || [height, width, length].join(""),
        }
      );


      //reset all input
      setSku("");
      setName("");
      setPrice("");
      setType("Select Type");
      setAttribute("");

      // res.data && window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  //Mass Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://hostscandiwebjuniortest.000webhostapp.com/backendtest/api/products/delete.php`,
        {
          data: { ids: id },
        }
      );
      data && window.location.replace("/");
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
