import React from "react";
import HeroSection from "./heroSection/HeroSection"
import FeatureSection from "./featureSection/FeatureSection"
import FaqSection from "./faqSection/FaqSection"
import Footer from "./footer/Footer";
import ToasterNotification from "../ToasterNotification/ToastNotification"

function Main() {
  return (
    <div>
      <ToasterNotification />
      <HeroSection />
      <FeatureSection />
      <FaqSection />
      <Footer />
    </div>
  );
}

export default Main;
