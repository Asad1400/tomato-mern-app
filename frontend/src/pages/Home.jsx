import React, { useState } from "react";
import Header from "../components/Header";
import ExploreMenu from "../components/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay";
import AppDownload from "../components/AppDownload";
import Footer from "../components/Footer";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      {/* Home Section */}
      <section id="home">
        <Header />
      </section>

      {/* Menu Section */}
      <section id="menu" className="mt-10">
        <ExploreMenu category={category} setCategory={setCategory} />
      </section>

      {/* Food Section (food display from ExploreMenu choice) */}
      <section className="mt-10">
        <FoodDisplay category={category} />
      </section>

      {/* Mobile App Section */}
      <section id="app" className="mt-10">
        <AppDownload />
      </section>

    </div>
  );
};

export default Home;
