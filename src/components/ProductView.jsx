import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import numberWithCommas from "../utils/numberWithCommas";
import { withRouter } from "react-router";
import { addItem } from "../redux/shopping-cart/cartItemsSlice";
import { useDispatch } from "react-redux";
import { remove } from "../redux/product-modal/productModalSlice";
import showAlert from "../utils/alert";

const ProductView = (props) => {
  const dispatch = useDispatch();
  let product = props.product || null;
  if (product === null) {
    product = {
      price: 0,
      title: "",
      colors: [],
      size: [],
      images: [],
    };
  }

  const [preViewImg, setPreViewImg] = useState(product.images[0]);

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [color, setColor] = useState(undefined);

  const [size, setSize] = useState(undefined);

  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  const check = () => {
    if (color === undefined) {
      showAlert("error", "Vui lòng chọn màu sắc!");
      return false;
    }
    if (size === undefined) {
      showAlert("error", "Vui lòng chọn kích cỡ !");

      return false;
    }

    return true;
  };

  const addToCart = () => {
    if (check()) {
      dispatch(
        addItem({
          slug: product.slug,
          color: color,
          size: size,
          quantity: quantity,
          price: product.price,
        })
      );
      showAlert("success", "Thêm thành công !");
    }
  };

  const goToCart = () => {
    if (check()) {
      dispatch(
        addItem({
          slug: product.slug,
          color: color,
          size: size,
          quantity: quantity,
          price: product.price,
        })
      );
      dispatch(remove());
      props.history.push("/cart");
      if (props.setProduct) {
        props.setProduct(undefined);
      }
    }
  };

  useEffect(() => {
    setPreViewImg(product.images[0]);
    setQuantity(1);
    setColor(undefined);
    setSize(undefined);
  }, [product]);

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreViewImg(product.images[0])}
          >
            <img src={`/images/${product.images[0]}.jpg`} alt="" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreViewImg(product.images[1])}
          >
            <img src={`/images/${product.images[1]}.jpg`} alt="" />
          </div>
        </div>
        <div className="product__images__main">
          <img src={`/images/${preViewImg}.jpg`} alt="" />
        </div>
        <div
          className={`product__description ${
            descriptionExpand ? "expand" : ""
          }`}
        >
          <div className="product__description__title">Chi tiết sản phẩm</div>
          <div
            className="product__description__content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div
            className="product__description__toggle"
            onClick={() => {
              setDescriptionExpand(!descriptionExpand);
            }}
          >
            <Button size="sm">
              {descriptionExpand ? "thu gọn" : "xem thêm"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product.title}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {numberWithCommas(product.price)}
          </span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Màu sắc</div>
          <div className="product__info__item__list">
            {product.colors.map((e, i) => (
              <div
                key={i}
                className={`product__info__item__list__item ${
                  color === e ? "active" : ""
                }`}
                onClick={() => setColor(e)}
              >
                <div className={`circle bg-${e}`}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="product__info__item">
          <div className="product__info__item__title">Kích cỡ</div>
          <div className="product__info__item__list">
            {product.size.map((e, i) => (
              <div
                key={i}
                className={`product__info__item__list__item ${
                  size === e ? "active" : ""
                }`}
                onClick={() => setSize(e)}
              >
                <div className="product__info__item__list__item__size">{e}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>

        <div className="product__info__item">
          <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
          <Button onClick={() => goToCart()}>mua ngay</Button>
        </div>
      </div>
      <div
        className={`product__description mobile ${
          descriptionExpand ? "expand" : ""
        }`}
      >
        <div className="product__description__title">Chi tiết sản phẩm</div>
        <div
          className="product__description__content"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
        <div
          className="product__description__toggle"
          onClick={() => {
            setDescriptionExpand(!descriptionExpand);
          }}
        >
          <Button size="sm">
            {descriptionExpand ? "thu gọn" : "xem thêm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductView);
