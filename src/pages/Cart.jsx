import React, { useEffect, useState } from "react";
import productData from "../assets/fake-data/products";
import { useSelector } from "react-redux";
import numberWithCommas from "../utils/numberWithCommas";
import Helmet from "../components/Helmet";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const { getCartItemsDetail } = productData;

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cartItems.value);
  const [cartItemsDetail, setcartItemsDetail] = useState([]);
  const [totalItem, settotalItem] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);

  useEffect(() => {
    setcartItemsDetail(getCartItemsDetail(cartItems));
    settotalItem(cartItems.reduce((total, item) => total + item.quantity, 0));
    settotalPrice(
      cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
    );
  }, [cartItems]);

  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>Bạn đang có {totalItem} sản phẩm trong giỏ hàng</p>
            <div className="cart__info__txt__price">
              <span>Thành tiền</span>
              <span> {numberWithCommas(totalPrice)} đ</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Button size="block">đặt hàng</Button>
            <Link to="/catalog">
              <Button size="block">tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cartItemsDetail.map((e, i) => (
            <CartItem item={e} key={i} />
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
