import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/HeroSection/HeroSection";
import Filter from "../../components/filter/Filter";

import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import ProductCard from "../../components/productCard/ProductCard";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <Track />
      <Testimonial />
    </Layout>
  );
};

export default Home;
