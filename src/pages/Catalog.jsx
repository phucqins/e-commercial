import React, { useState, useCallback, useEffect, useRef } from "react";

import Helmet from "../components/Helmet";
import category from "../assets/fake-data/category";
import CheckBox from "../components/CheckBox";
import colors from "../assets/fake-data/product-color";
import size from "../assets/fake-data/product-size";
import Button from "../components/Button";
import InfinityList from "../components/InfinityList";
import Loading from "../components/Loading";

const Catalog = () => {
  const initFilter = {
    category: [],
    color: [],
    size: [],
  };

  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          "https://yolo-backend.onrender.com/api/v1/products"
        );
        const data = await res.json();
        setIsLoading(false);
        setProduct(data.data.data);
      } catch (err) {
        return;
      }
    };
    fetchProduct();
  }, []);

  const filterRef = useRef(null);

  const toggleFilterBar = () => filterRef.current.classList.toggle("active");

  const [products, setProducts] = useState(product);

  const [filter, setFliter] = useState(initFilter);

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFliter({
            ...filter,
            category: [...filter.category, item.categorySlug],
          });
          break;
        case "COLOR":
          setFliter({
            ...filter,
            color: [...filter.color, item.color],
          });
          break;
        case "SIZE":
          setFliter({
            ...filter,
            size: [...filter.size, item.size],
          });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(
            (e) => e !== item.categorySlug
          );
          setFliter({ ...filter, category: newCategory });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e) => e !== item.color);
          setFliter({ ...filter, color: newColor });
          break;
        case "SIZE":
          const newSize = filter.size.filter((e) => e !== item.size);
          setFliter({ ...filter, size: newSize });
          break;
        default:
      }
    }
  };

  const updateProducts = useCallback(() => {
    let temp = product;

    if (filter.category.length > 0) {
      temp = temp.filter((e) => filter.category.includes(e.categorySlug));
    }

    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors.find((color) => filter.color.includes(color));
        return check !== undefined;
      });
    }

    if (filter.size.length > 0) {
      temp = temp.filter((e) => {
        const check = e.size.find((size) => filter.size.includes(size));
        return check !== undefined;
      });
    }

    setProducts(temp);
  }, [filter, product]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  const clearFilter = () => setFliter(initFilter);

  return (
    <Helmet title="Sản phẩm">
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div
            className="catalog__filter__close"
            onClick={() => toggleFilterBar()}
          >
            <i className="bx bx-chevron-left"></i>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              danh mục sản phẩm
            </div>
            <div className="catalog__filter__widget__content">
              {category.map((e, i) => (
                <div key={i} className="catalog__filter__widget__content__item">
                  <CheckBox
                    checked={filter.category.includes(e.categorySlug)}
                    label={e.display}
                    onChange={(input) =>
                      filterSelect("CATEGORY", input.checked, e)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">màu sắc</div>
            <div className="catalog__filter__widget__content">
              {colors.map((e, i) => (
                <div key={i} className="catalog__filter__widget__content__item">
                  <CheckBox
                    checked={filter.color.includes(e.color)}
                    label={e.display}
                    onChange={(input) =>
                      filterSelect("COLOR", input.checked, e)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">kích cỡ</div>
            <div className="catalog__filter__widget__content">
              {size.map((e, i) => (
                <div key={i} className="catalog__filter__widget__content__item">
                  <CheckBox
                    checked={filter.size.includes(e.size)}
                    label={e.display}
                    onChange={(input) => filterSelect("SIZE", input.checked, e)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
              <Button size="sm" onClick={clearFilter}>
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <Button size="sm" onClick={() => toggleFilterBar()}>
            Bộ lọc
          </Button>
        </div>
        <div className="catalog__content">
          {isLoading ? <Loading /> : <InfinityList data={products} />}
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
