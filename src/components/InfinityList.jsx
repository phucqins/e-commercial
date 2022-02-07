import React, { useEffect, useRef, useState } from "react";
import Grid from "./Grid";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

const InfinityList = (props) => {
  const perLoad = 6;

  const listRef = useRef(null);

  const [data, setData] = useState(props.data.slice(0, perLoad));

  const [load, setLoad] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setData(props.data.slice(0, perLoad));
    setIndex(1);
  }, [props.data]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (listRef && listRef.current) {
        if (
          window.scrollY + window.innerHeight >=
          listRef.current.clientHeight + listRef.current.offsetTop + 200
        ) {
          console.log("bottom reach");
          setLoad(true);
        }
      }
    });
  }, [listRef, setLoad]);

  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(props.data.length / perLoad);
      const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1;

      if (load && index <= maxIndex) {
        const start = perLoad + index;
        const end = start + perLoad;

        setData(data.concat(props.data.slice(start, end)));
        setIndex(index + 1);
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, data, props.data]);

  return (
    <div ref={listRef}>
      {console.log(
        Boolean(listRef),
        Boolean(listRef.current),
        Boolean(listRef && listRef.current)
      )}
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {data.map((e, i) => (
          <ProductCard
            key={i}
            img01={e.image01}
            img02={e.image02}
            name={e.title}
            price={Number(e.price)}
            slug={e.slug}
          />
        ))}
      </Grid>
    </div>
  );
};

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default InfinityList;
