import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/animation_lkimyn37.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex items-center justify-center">
      <Lottie
        options={defaultOptions}
        width={500}
        height={150}
      />
    </div>
  );
};

export default Loading;
