import React, { useEffect } from "react";
import Helmet from "../components/Helmet";
import productData from "../assets/fake-data/products";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";
import ProductView from "../components/ProductView";

const Products = (props) => {
  const product = productData.getProductBySlug(props.match.params.slug);
  const relatedProducts = productData.getProducts(8);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={product.title}>
      <Section>
       <ProductView product={product}/>
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
                img01={e.image01}
                img02={e.image02}
                slug={e.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Products;
