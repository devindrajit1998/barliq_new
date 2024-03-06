import React from "react";

const MyButton = ({ children, type }) => {
  return <button className="_btn" type={type}>{children}</button>;
};

export default MyButton;
