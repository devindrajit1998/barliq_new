import React from "react";
import { Input } from "@material-tailwind/react";

const MyInput = ({ title }) => {
  return (
    <div className="my_input">
      <h2>{title}</h2>
      <Input className="form_input"  />
    </div>
  );
};

export default MyInput;
