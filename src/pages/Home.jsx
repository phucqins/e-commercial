import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet";
import Slider from "../components/Slider";
import PolicyCard from "../components/PolicyCard";
import policy from "../assets/fake-data/policy";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";

import Section, { SectionTitle, SectionBody } from "../components/Section";
import banner from "../assets/images/banner.png";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setFirstLoad } from "../redux/authentication/authenticationSlice";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isFirstLoad = useSelector((state) => state.auth.isFirstLoad);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await Promise.all([
          await fetch("https://yolo-backend.onrender.com/api/v1/products"),
          await fetch(`https://yolo-backend.onrender.com/api/v1/slider`),
        ]);

        const data = await res[0].json();
        const data2 = await res[1].json();
        setProducts(data.data.data);
        setSliderData(data2.data.data);
        if (isFirstLoad) {
          dispatch(setFirstLoad({ isFirstLoad: false }));
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        return <h1>404</h1>;
      }
    };
    fetchProduct();
  }, []);

  if (loading) return <Loading isFirstLoad={isFirstLoad} />;

  return (
    <Helmet title="Trang chủ">
      {/* slider start */}
      <Slider data={sliderData} auto={true} control={true} timeOut={5000} />
      {/* slider end */}

      {/* section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((e, i) => (
              <Link key={i} to="/contact">
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
          {products.slice(0, 4).map((e, i) => (
            <ProductCard
              key={i}
              img01={e.images[0]}
              img02={e.images[1]}
              name={e.title}
              price={Number(e.price)}
              id={e.id}
            />
          ))}
        </Grid>
      </SectionBody>
      {/* best selling section end*/}

      {/* new products section */}
      <SectionTitle>Sắp ra mắt</SectionTitle>
      <SectionBody>
        <Grid col={4} mdCol={2} smCol={1} gap={20}>
          {products.slice(0, 8).map((e, i) => (
            <ProductCard
              key={i}
              img01={e.images[0]}
              img02={e.images[1]}
              name={e.title}
              price={Number(e.price)}
              id={e._id}
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
          {products.slice(0, 12).map((e, i) => (
            <ProductCard
              key={i}
              img01={e.images[0]}
              img02={e.images[1]}
              name={e.title}
              price={Number(e.price)}
              id={e._id}
            />
          ))}
        </Grid>
      </SectionBody>
      {/* popular products section end*/}
    </Helmet>
  );
};

export default Home;
