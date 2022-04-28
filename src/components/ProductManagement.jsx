import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import updateProduct from "../utils/updateProduct";
import ProductEditModal from "./ProductEditModal";

const ProductManagement = () => {
  const token = useSelector((state) => state.auth.token);
  const [products, setProducts] = useState([]);
  const [method, setMethod] = useState("EDIT");

  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `https://phucnq-yolo.herokuapp.com/api/v1/products`
      );

      const data = await res.json();
      setProducts(data.data.data);
    };
    fetchProduct();
  }, [editProduct]);

  const deleteProduct = (id) => {
    updateProduct(id, "DELETE", token);
    setProducts((products) => products.filter((product) => product._id !== id));
  };

  const editProductHandler = (product) => {
    setEditProduct(product);
    setMethod("EDIT");
  };

  const addProduct = () => {
    setEditProduct([]);
    setMethod("ADD");
  };

  return (
    <div className="product-table">
      {editProduct && (
        <ProductEditModal
          token={token}
          setEditProduct={setEditProduct}
          product={editProduct}
          method={method}
          setMethod={setMethod}
        />
      )}
      <table>
        <thead>
          <tr className="table100-head">
            <th className="column1">Tên sản phẩm</th>
            <th className="column2">ID sản phẩm</th>
            <th className="column3">Giá</th>
            <th className="column4">Màu sắc</th>
            <th className="column5">Kích cỡ</th>
            <th className="column">Miêu tả</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product.id}>
                <td className="column1">{product.title}</td>
                <td className="column2">{product._id}</td>
                <td className="column3">{product.price}</td>
                <td className="column4">{product.colors.join(", ")}</td>
                <td className="column5">{product.size.join(", ")}</td>
                <td className="column6">{product.description}</td>
                <td className="column8">
                  <button
                    className="btn-prod"
                    onClick={() => editProductHandler(product)}
                  >
                    <i className="bx bx-edit"></i>
                  </button>
                </td>
                <td className="column7">
                  <button
                    className="btn-prod"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </td>
                <td className="column7">
                  <button
                    className="btn-prod"
                    onClick={() => addProduct(product._id)}
                  >
                    <i className="bx bx-plus"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
