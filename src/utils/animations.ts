import gsap from "gsap";
import * as THREE from "three";
export const animationWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  rotationRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>,
  rotationState: number,
  firstTarget: string,
  secondTarget: string,
  animationValues: gsap.TweenVars
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    firstTarget,
    {
      ...animationValues,
      ease: "power2.inOut",
    },
    "<"
  );

  timeline.to(
    secondTarget,
    {
      ...animationValues,
      ease: "power2.inOut",
    },
    "<"
  );
};

export const animateWithGsap = (
  target: string,
  animationValues: gsap.TweenVars,
  scrollValues?: ScrollTrigger.Vars
) => {
  gsap.to(target, {
    ...animationValues,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollValues,
    },
  });
};
