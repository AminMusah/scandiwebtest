import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

function AddProductForm() {
  const {
    sku,
    setSku,
    name,
    setName,
    price,
    setPrice,
    type,
    setType,
    size,
    setSize,
    height,
    setHeight,
    weight,
    setWeight,
    width,
    setWidth,
    length,
    setLength,
    validate,
    skuMessage,
    handleSubmit
  } = useContext(ProductContext);

  return (
    <section className="form-container">
      <form id="product_form" onSubmit={handleSubmit}>
        <ul>
          <li>
            <label>SKU</label>
            <input
              type="text"
              value={sku}
              placeholder="SKU"
              onChange={(e) => setSku(e.target.value)}
              id="sku"
              required
            />
          </li>
          <li>
            <label>Name</label>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
              id="name"
            />
          </li>
          <li>
            <label>Price ($)</label>
            <input
              type="number"
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              required
              id="price"
            />
          </li>
          <li>
            <label>Type Switcher</label>
            <select
              className="select-field"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              id="productType"
            >
              <option value="Select Type">Select prodcut type</option>
              <option value="DVD">DVD</option>
              <option value="Book">Book</option>
              <option value="Furniture">Furniture</option>
            </select>
          </li>
          {type === "DVD" ? (
            <div>
              <div>
                <label>Size (MB)</label>
                <input
                  type="number"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="Size"
                  required
                  id="size"
                />
              </div>

              {size <= 0 ? (
                <p className="attribute-description">
                  Please, provide disc space in MB
                </p>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {type === "Book" ? (
            <div>
              <div>
                <label>Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  id="weight"
                />
              </div>

              {weight <= 0 ? (
                <p className="attribute-description">Please, provide weight in KG</p>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {type === "Furniture" ? (
            <ul className="furniture">
              <li>
                {" "}
                <label>Height (CM) </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="height"
                  required
                  id="height"
                />
              </li>

              <li>
                <label>Width (CM) </label>

                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="width"
                  required
                  id="width"
                />
              </li>
              <li>
                <label>Length (CM) </label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="length"
                  required
                  id="length"
                />
              </li>
              {width <= 0 || length <= 0 || height <= 0 ? (
                <p className="attribute-description">
                  Please, provide dimensions
                </p>
              ) : (
                ""
              )}
            </ul>
          ) : (
            ""
          )}
          {skuMessage? (
            <p className="attribute-description">Sku Already exists</p>
          ) : (
            ""
          )}
          {validate? (
            <p className="attribute-description">Please, submit required data</p>
          ) : (
            ""
          )}
        </ul>
      </form>
    </section>
  );
}

export default AddProductForm;
