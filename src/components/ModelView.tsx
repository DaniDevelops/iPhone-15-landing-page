import { Dispatch, MutableRefObject, SetStateAction, Suspense } from "react";
import { models } from "../constants";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import Lights from "./Lights";
import Iphone from "./Iphone";
import * as THREE from "three";

type ModelViewProps = {
  index: number;
  groupRef: MutableRefObject<T>;
  gsapType: string;
  controlRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  setRotationState: Dispatch<SetStateAction<number>>;
  item: Omit<(typeof models)[number], "id">;
  size: string;
};
export default function ModelView({
  controlRef,
  groupRef,
  gsapType,
  index,
  item,
  setRotationState,
  size,
}: ModelViewProps) {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group ref={groupRef} name={`${index === 1 ? "small" : "large"}`}>
        <Suspense
          fallback={
            <Html>
              <div>Loading...</div>
            </Html>
          }
        >
          <Iphone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
}
