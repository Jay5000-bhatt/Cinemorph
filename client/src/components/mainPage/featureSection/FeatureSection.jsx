// components/FeatureSection.js
import React from "react";
import "./FeatureSection.css";
import tvimg from "../../../assets/tv.png";
import mobileimg from "../../../assets/mobileimg.jpg";
import devicefit from "../../../assets/devicefit.png";
import childimg from "../../../assets/ChildernImg.png";
import video01 from "../../../assets/video01.m4v";
import video02 from "../../../assets/video02.m4v";

function FeatureSection() {
  return (
    <>
      <section className="first">
        <div className="flex-display">
          <span>Enjoy on your TV</span>
          <span>
            Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
            players and more.
          </span>
        </div>
        <div className="secImg">
          <img src={tvimg} alt=""></img>
          <video src={video01} autoPlay loop muted></video>
        </div>
      </section>
      <div className="separation1"></div>

      <section className="first second">
        <div className="secImg">
          <img src={mobileimg} alt=""></img>
        </div>
        <div className="flex-display">
          <span>Download your shows to watch offline</span>
          <span>
            Save your favourites easily and always have something to watch.
          </span>
        </div>
      </section>
      <div className="separation"></div>

      <section className="first third">
        <div className="flex-display">
          <span>Watch everywhere</span>
          <span>
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV.
          </span>
        </div>
        <div className="secImg secImg2">
          <img src={devicefit} alt=""></img>
          <video src={video02} autoPlay loop muted></video>
        </div>
      </section>
      <div className="separation1"></div>

      <section className="first second">
        <div className="secImg">
          <img src={childimg} alt=""></img>
        </div>
        <div className="flex-display">
          <span>Create profiles for kids</span>
          <span>
            Send children on adventures with their favourite characters in a
            space made just for them—free with your membership.
          </span>
        </div>
      </section>
      <div className="separation"></div>
    </>
  );
}

export default FeatureSection;
