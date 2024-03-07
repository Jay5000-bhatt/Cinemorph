import React from "react";
import "./discussion.scss";
import DiscussionComment from "../../components/discussionSection/discussionComment";
import Header from "../../components/header/Header";
// import Footer from "../../components/mainPage/footer/Footer";

function discussionPage() {


  return (
    <div className="discuss-main">
      <Header />
      <DiscussionComment />
      {/* <Footer /> */}
    </div>
  );
}

export default discussionPage;
