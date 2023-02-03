import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";
import ProductView from "../components/ProductView";
import Loading from "../components/Loading";

const Products = (props) => {
  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await Promise.all([
        await fetch(
          `https://yolo-backend.onrender.com/api/v1/products/${props.match.params.id}`
        ),
        await fetch(`https://yolo-backend.onrender.com/api/v1/products`),
      ]);

      const data = await res[0].json();
      const data2 = await res[1].json();

      setProduct(data.data.data);
      setRelatedProducts(data2.data.data.slice(0, 8));
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [props]);

  if (product === null) {
    return (
      <Helmet title="Loading">
        <Loading />
      </Helmet>
    );
  }

  return (
    <Helmet title={product.title}>
      <Section>
        <ProductView product={product} />
      </Section>
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {relatedProducts.map((e, i) => (
              <ProductCard
                key={i}
                name={e.title}
                price={Number(e.price)}
                img01={e.images[0]}
                img02={e.images[1]}
                id={e._id}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Products;
