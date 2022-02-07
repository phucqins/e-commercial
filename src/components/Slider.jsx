import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "./Button";

const Slider = (props) => {
  const data = props.data;
  const timeOut = props.timeOut ? props.timeOut : 3000;

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1;
    setActiveSlide(index);
  }, [activeSlide, data]);

  const prevSlide = () => {
    const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1;
    setActiveSlide(index);
  };

  useEffect(() => {
    if (props.auto) {
      const slideAuto = setInterval(() => {
        nextSlide();
      }, timeOut);

      return () => {
        clearInterval(slideAuto);
      };
    }
  }, [nextSlide, timeOut, props]);

  return (
    <div className="slider">
      {data.map((e, i) => (
        <SliderItem key={i} item={e} active={i === activeSlide} />
      ))}
      {props.control ? (
        <div className="slider__control">
          <div className="slider__control__item" onClick={prevSlide}>
            <i className="bx bx-chevron-left"></i>
          </div>
          <div className="slider__control__item">
            {activeSlide + 1}/{data.length}
          </div>
          <div className="slider__control__item" onClick={nextSlide}>
            <i className="bx bx-chevron-right"></i>
          </div>
        </div>
      ) : null}
    </div>
  );
};

Slider.propTypes = {
  data: PropTypes.array.isRequired,
  control: PropTypes.bool,
  auto: PropTypes.bool,
  timeOut: PropTypes.number,
};

const SliderItem = (props) => (
  <div className={`slider__item ${props.active ? "active" : ""}`}>
    <div className="slider__item__info">
      <div className={`slider__item__info__title ${props.item.color}`}>
        <span>{props.item.title}</span>
      </div>
      <div className="slider__item__info__description">
        <span>{props.item.description}</span>
      </div>
      <div className="slider__item__info__btn">
        <Link to={props.item.path}>
          <Button
            backgroundColor={props.item.color}
            icon="bx bx-cart"
            animate={true}
          >
            xem chi tiết
          </Button>
        </Link>
      </div>
    </div>
    <div className="slider__item__image">
      <div className={`shape bg-${props.item.color}`}></div>
      <img src={props.item.img} alt="" />
    </div>
  </div>
);

export default Slider;
