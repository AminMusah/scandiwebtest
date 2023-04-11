import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import { useEffect } from "react";

function Home() {
  return (
    <>
      <Header />
      <ProductList />
      <Footer />
    </>
  );
}

export default Home;
