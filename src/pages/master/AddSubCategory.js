import React from "react";
import {
  Breadcrumbs,
  Input,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import Layout from "../layout";
import Card from "../../components/Card";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addSubcategoryRequest } from "../../redux/reducers/MasterReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

let masterStatus = "";
const AddSubCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const Master = useSelector((state) => state.Master);

  const handleCategoryChange = (value) => {
    setValue("category", value);
  };

  const onSubmit = (data) => {
    dispatch(addSubcategoryRequest(data));
  };

  if (masterStatus === "" || Master.status !== masterStatus) {
    switch (Master.status) {
      case "Master/addSubcategoryRequest":
        masterStatus = Master.status;
        break;
      case "Master/addSubcategorySuccess":
        masterStatus = Master.status;
        navigate("/master/sub-category")
        toast.success("Sub Category added successfully");
        reset();
        break;
      case "Master/addSubcategoryFailure":
        masterStatus = Master.status;
        break;
    }
  }

  return (
    <Layout>
      <Breadcrumbs className="mb-4">
        <a href="#" className="opacity-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </a>
        <a href="/master/sub-category" className="opacity-60">
          <span>Sub Category</span>
        </a>
        <a href="#">Add Sub-Category</a>
      </Breadcrumbs>
      <Card>
        <h5 className="text-xl mb-6">Create Sub Category</h5>
        <form
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input label="Name" {...register("name", { required: true })} />
          <Select label="Category" onChange={handleCategoryChange}>
            <Option value="WINE">WINE</Option>
            <Option value="BEER">BEER</Option>
            <Option value="LIQOUR">LIQUOR</Option>
          </Select>
          <div></div>
          <div className="grid-cols-1/3">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default AddSubCategory;
