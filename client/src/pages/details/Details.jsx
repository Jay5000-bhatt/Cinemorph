import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import Header from "../../components/header/Header"
import Footer from "../../components/mainPage/footer/Footer"
import useFetch from "../../hooks/userFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import RatingSection from "./rating/RatingForm";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import ToasterNotification from "../../components/ToasterNotification/ToastNotification"

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <Header />
      <ToasterNotification />
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
      <RatingSection mediaType={mediaType} id={id}/>
      <Footer />
    </div>
  );
};

export default Details;
