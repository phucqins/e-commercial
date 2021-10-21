import React from "react";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet";
import Slider from "../components/Slider";
import sliderData from "../assets/fake-data/slider";
import PolicyCard from "../components/PolicyCard";
import policy from "../assets/fake-data/policy";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";
import productData from "../assets/fake-data/products";
import Section, { SectionTitle, SectionBody } from "../components/Section";
import banner from "../assets/images/banner.png";

const Home = () => {
  return (
    <Helmet title="Trang chủ">
      {/* slider start */}
      <Slider data={sliderData} auto={false} control={true} timeOut={5000} />
      {/* slider end */}

      {/* section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((e, i) => (
              <Link key={i} to="/policy">
                <PolicyCard
                  name={e.name}
                  description={e.description}
                  icon={e.icon}
                />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* section end */}

      {/* best selling section */}
      <SectionTitle>top sản phẩm bán chạy trong tuần</SectionTitle>
      <SectionBody>
        <Grid col={4} mdCol={2} smCol={1} gap={20}>
          {productData.getProducts(4).map((e, i) => (
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
      </SectionBody>
      {/* best selling section end*/}

      {/* new products section */}
      <SectionTitle>Sắp ra mắt</SectionTitle>
      <SectionBody>
        <Grid col={4} mdCol={2} smCol={1} gap={20}>
          {productData.getProducts(8).map((e, i) => (
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
      </SectionBody>
      {/* new products section end*/}

      {/* banner */}
      <Section>
        <SectionBody>
          <Link to="/catalog">
            <img src={banner} alt="" />
          </Link>
        </SectionBody>
      </Section>
      {/* banner end*/}

      {/* popular products section */}
      <SectionTitle>Phổ biến</SectionTitle>
      <SectionBody>
        <Grid col={4} mdCol={2} smCol={1} gap={20}>
          {productData.getProducts(12).map((e, i) => (
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
      </SectionBody>
      {/* popular products section end*/}

    </Helmet>
  );
};

export default Home;
