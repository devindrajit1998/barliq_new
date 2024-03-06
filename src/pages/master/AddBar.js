import React from "react";
import { Breadcrumbs, Input, Button } from "@material-tailwind/react";
import Layout from "../layout";
import Card from "../../components/Card";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addBarRequest,
  getBarRequest,
} from "../../redux/reducers/MasterReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

let masterStatus = "";
const AddBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Master = useSelector((state) => state.Master);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addBarRequest(data));
  };

  if (masterStatus === "" || Master.status !== masterStatus) {
    switch (Master.status) {
      case "Master/addBarSuccess":
        navigate("/master/bar");
        toast.success("Bar added successfully");
        dispatch(getBarRequest());
        break;
    }
  }

  return (
    <Layout>
      <Breadcrumbs className="mb-4">
        <a href="/" className="opacity-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </a>
        <a href="/master/bar" className="opacity-60">
          <span>Bar Locations</span>
        </a>
        <a href="#">Create Bar Locations</a>
      </Breadcrumbs>
      <Card>
        <h5 className="text-xl mb-6">Create Bar Locations</h5>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <Input
            label="Name"
            {...register("name", { required: true })}
            error={errors.name}
          />
          <Input
            label="Street Address"
            {...register("streetAddress", { required: true })}
            error={errors.streetAddress}
          />
          <Input
            label="City"
            {...register("city", { required: true })}
            error={errors.city}
          />

          <Input
            label="Zipcode"
            {...register("pincode", { required: true })}
            error={errors.pincode}
          />
          <Input
            label="State"
            {...register("state", { required: true })}
            error={errors.state}
          />
          <Input
            label="Country"
            {...register("country", { required: true })}
            error={errors.country}
          />
          <div className="grid-cols-1/3">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default AddBar;
