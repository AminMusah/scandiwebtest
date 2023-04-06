import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

function Header() {
  const { handleDelete, id, create, check, setId, setCheck } = useContext(ProductContext);
  console.log(id)
  console.log(check)
  
  //get page url
  const location = useLocation();
  const url = location.pathname;

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>Product List</h1>
        </Link>
        <div>
          {url === "/" ? (
            <>
              <Link className="btn" to="/addproduct">
                ADD
              </Link>{" "}
              <button
                className={check ? "btn secondary-btn " : "btn secondary-btn delete-checkbox"}
                onClick={() => {
                  handleDelete(id);
                }}
              >
                MASS DELETE
              </button>
            </>
          ) : (
            <>
              {url === "/addproduct" ? (
                <>
                  <button className="btn" onClick={create}>
                    Save
                  </button>{" "}
                  <Link className="btn secondary-btn" to="/">
                    Cancel
                  </Link>
                </>
              ) : null}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
