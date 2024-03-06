import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/8fWKeEM8L9.json";

const AddLoading = () => {
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
        width={100}
        height={100}
      />
    </div>
  );
};

export default AddLoading;
