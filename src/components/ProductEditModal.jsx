import React, { useRef } from "react";

import updateProduct from "../utils/updateProduct";

const ProductEditModal = (props) => {
  const { token, product, setEditProduct, method, setMethod } = props;

  const titleInputRef = useRef();
  const priceInputRef = useRef();
  const colorsInputRef = useRef();
  const sizeInputRef = useRef();
  const descriptionInputRef = useRef();

  const productEditHandler = async (e) => {
    e.preventDefault();

    const updateData = {
      title: titleInputRef.current.value,
      price: priceInputRef.current.value,
      colors: colorsInputRef.current.value.split(","),
      size: sizeInputRef.current.value.split(","),
      description: descriptionInputRef.current.value,
    };
    if (method === "ADD") {
      await updateProduct(null, "POST", token, updateData);
    } else {
      await updateProduct(product._id, "PATCH", token, updateData);
    }
    setEditProduct(null);
  };

  return (
    <div className={`product-view__modal ${product === null ? "" : "active"}`}>
      <form className="form form-user-password" onSubmit={productEditHandler}>
        <div className="form__group">
          <label className="form__label" htmlFor="product-name">
            Tên sản phẩm
          </label>

          <input
            className="form__input"
            id="product-name"
            name="product-name"
            required="required"
            type="text"
            defaultValue={product.title}
            ref={titleInputRef}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="product-price">
            Giá
          </label>

          <input
            className="form__input"
            id="product-price"
            name="product-price"
            required="required"
            type="number"
            defaultValue={product.price}
            ref={priceInputRef}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="product-colors">
            Màu sắc
          </label>

          <input
            className="form__input"
            id="product-colors"
            name="product-colors"
            required="required"
            type="text"
            defaultValue={product.colors}
            ref={colorsInputRef}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="product-size">
            Kích cỡ
          </label>

          <input
            className="form__input"
            id="product-size"
            name="product-size"
            required="required"
            type="text"
            defaultValue={product.size}
            ref={sizeInputRef}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="product-description">
            Miêu tả
          </label>

          <textarea
            className="form__input"
            id="product-description"
            name="product-description"
            required="required"
            defaultValue={product.description}
            ref={descriptionInputRef}
            rows="5"
            cols="33"
          ></textarea>
        </div>
        <div className="form__group">
          <button type="submit" className="btn form__btn">
            Lưu thay đổi
          </button>
          <button
            className="btn form__btn"
            onClick={() => {
              setEditProduct(null);
              setMethod(null);
            }}
          >
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEditModal;
