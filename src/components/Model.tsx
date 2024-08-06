import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "../utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animationWithGsapTimeline } from "../utils/animations";

export default function Model() {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "Iphone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  // camera control for model view
  const cameraControlSmall = null;
  const cameraControlLarge = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

  //   model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animationWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        translateX: "-100%",
        duration: 2,
      });
    }
    if (size === "small") {
      animationWithGsapTimeline(tl, large, largeRotation, "#view1", "#view2", {
        translateX: "0",
        duration: 2,
      });
    }
  }, [size, smallRotation, largeRotation, tl]);

  useGSAP(() => {
    gsap.to("#heading", { opacity: 1, y: 0 });
  });
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 className="section-heading" id="heading">
          Take a closer look
        </h1>
        <div className="flex flex-col items-center mt-5">
          <div className="w-full relative overflow-hidden md:h-[90vh] h-[75vh]">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />

            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: "0",
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => {
                      setSize(value);
                    }}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
