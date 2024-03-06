import React from "react";

const Preloader = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <img src={require("../assets/ic_barliq.png")} className="h-1/2" />
    </div>
  );
};

export default Preloader;
