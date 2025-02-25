import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";

const Home = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <NewArrival />
      <PromoBanner />
    </main>
  );
};

export default Home;
