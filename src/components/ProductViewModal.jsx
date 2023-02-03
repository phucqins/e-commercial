import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import ProductView from "./ProductView";

import Button from "./Button";

import { remove } from "../redux/product-modal/productModalSlice";

const ProductViewModal = () => {
  const productID = useSelector((state) => {
    return state.productModal.value;
  });
  const dispatch = useDispatch();

  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    const fetchProductByID = async () => {
      const res = await fetch(
        `https://yolo-backend.onrender.com/api/v1/products/${productID}`
      );

      const data = await res.json();
      setProduct(data.data.data);
    };
    if (productID) {
      fetchProductByID();
    }
  }, [productID]);

  return (
    <div
      className={`product-view__modal ${productID === null ? "" : "active"}`}
    >
      <div className="product-view__modal__content">
        <ProductView product={product} setProduct={setProduct} />
        <div className="product-view__modal__content__close">
          <Button size="sm" onClick={() => dispatch(remove())}>
            đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
