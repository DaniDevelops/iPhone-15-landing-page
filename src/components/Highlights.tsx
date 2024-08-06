import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

export default function Highlights() {
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, y: 0 });
    gsap.to(".link", { opacity: 1, y: 0, stagger: 0.25, duration: 1 });
  });
  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full items-end md:flex justify-between">
          <h1 className="section-heading" id="title">
            Get the Highlights.
          </h1>
          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch The Film
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="link">
              Watch The event
              <img src={rightImg} alt="right" className="ml-2" />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
}
