import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/animation_lkns5lfq.json";
import { useNavigate } from "react-router-dom";
import { useTimeout } from "usehooks-ts";

const ErrorBoundry = () => {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useTimeout(() => {
    navigate("/");
  }, 2000);
  
  return (
    <div className="flex items-center justify-center h-screen w-screen flex-col">
      <Lottie options={defaultOptions} width={400} height={400} />
      <h2 className="text-red-500 text-lg">
        Something went wrong!. Redirecting.....
      </h2>
    </div>
  );
};

export default ErrorBoundry;
