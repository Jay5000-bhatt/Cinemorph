// components/FaqSection.js
import React from "react";
import "./FaqSection.css";

function FaqSection() {
  return (
    <>
      <section className="faq">
        <h2 className="specialh2">Frequently Asked Questions</h2>
        <ul className="accordion">
          <li>
            <input type="radio" name="accordion" id="first" />
            <label htmlFor="first" className="labelpuls">What is Cinemorph</label>
            <div className="content">
              <p>
                Cinemorph is a streaming service that offers a wide variety of
                award-winning TV shows, movies, anime, documentaries and more on
                thousands of internet-connected devices.
              </p>
              &nbsp;
              <p>
                You can watch as much as you want, whenever you want, without a
                single ad all for one low monthly price. There's always
                something new to discover, and new TV shows and movies are added
                every week!
              </p>
            </div>
          </li>
          <li>
            <input type="radio" name="accordion" id="second" />
            <label htmlFor="second" className="labelpuls">How much does Cinemorph cost?</label>
            <div className="content">
              <p>
                Watch Cinemorph on your smartphone, tablet, Smart TV, laptop, or
                streaming device, all for one fixed monthly fee. Plans range
                from ₹649 to ₹149 a month. No extra costs, no contracts.
              </p>
            </div>
          </li>
          <li>
            <input type="radio" name="accordion" id="third" />
            <label htmlFor="third" className="labelpuls">Where can I watch?</label>
            <div className="content">
              <p>
                Watch anywhere, anytime. Sign in with your Cinemorph account to
                watch instantly on the web at Cinemorph.com from your personal
                computer or on any internet-connected device that offers the
                Cinemorph app, including smart TVs, smartphones, tablets,
                streaming media players and game consoles.
              </p>
              &nbsp;
              <p>
                You can also download your favourite shows with the iOS,
                Android, or Windows 10 app. Use downloads to watch while you're
                on the go and without an internet connection. Take Cinemorph
                with you anywhere.
              </p>
            </div>
          </li>
          <li>
            <input type="radio" name="accordion" id="forth" />
            <label htmlFor="forth" className="labelpuls">How do I cancel?</label>
            <div className="content">
              <p>
                Cinemorph is flexible. There are no annoying contracts and no
                commitments. You can easily cancel your account online in two
                clicks. There are no cancellation fees, start or stop your
                account anytime.
              </p>
            </div>
          </li>
          <li>
            <input type="radio" name="accordion" id="fifth" />
            <label htmlFor="fifth" className="labelpuls">What can I watch on Cinemorph?</label>
            <div className="content">
              <p>
                Cinemorph is a streaming service that offers a wide variety of
                award-winning TV shows, movies, anime,documentaries and more on
                thousands of internet-connected devices.
              </p>
              &nbsp;
              <p>
                You can watch as much as you want, whenever you want, without a
                single ad all for one low monthly price. There's always
                something new to discover, and new TV shows and movies are added
                every week!
              </p>
            </div>
          </li>
          <li>
            <input type="radio" name="accordion" id="sixth" />
            <label htmlFor="sixth" className="labelpuls">Is Cinemorph good for kids?</label>
            <div className="content">
              <p>
                The Cinemorph Kids experience is included in your membership to
                give parents control while kids enjoy family-friendly TV shows
                and films in their own space.
              </p>
              &nbsp;
              <p>
                Kids profiles come with PIN-protected parental controls that let
                you restrict the maturity rating of content kids can watch and
                block specific titles you don't want kids to see.
              </p>
            </div>
          </li>
        </ul>
      </section>
      <div className="separation"></div>
    </>
  );
}

export default FaqSection;
