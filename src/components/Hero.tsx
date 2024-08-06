import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { heroVideo, smallHeroVideo } from "../utils";

export default function Hero() {
  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 2,
    });
    gsap.to("#cta", {
      opacity: 1,
      delay: 2,
      y: -50,
    });
  }, []);

  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);

    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  });

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">
          Iphone 15
        </p>
        <div className="md:w-10/12 w-9/12">
          <video autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        className="flex flex-col items-center opacity-0 translate-y-20"
        id="cta"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
}
