import React from "react";

import CategoryNav from "../components/CategoryNav";
import LandingCarousel from "../components/LandingCarousel";
import DealsSection from "../components/DealsSection";

const HomePage = () => {
  return (
    <div className="w-full overflow-hidden bg-slate-100">
      <LandingCarousel />
      <DealsSection />
    </div>
  );
};

export default HomePage;
