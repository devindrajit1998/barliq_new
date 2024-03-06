import React, { useState } from "react";
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
import {
  addItemRequest,
  getSubCategoryRequest,
} from "../../redux/reducers/MasterReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

let masterStatus = "";
const AddItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subcategory, setSubcategory] = useState([]);
  const Master = useSelector((state) => state.Master);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm();

  const handleCategoryChange = (value) => {
    setValue("category", value);
    dispatch(getSubCategoryRequest(value));
  };

  const handleSubCategoryChange = (value) => {
    setValue("subcategory", value);
  };

  const onSubmit = (data) => {
    let requestObj = {
      ...data,
      label: data.label,
      salesPrice: Number(data.salesPrice),
      volume: Number(data.volume || 0),
      shotsCount: Number(data.shotsCount || 1),
      shotsPrice: Number(data.shotsPrice || data.salesPrice),
    };
    dispatch(addItemRequest(requestObj));
  };

  if (masterStatus === "" || Master.status !== masterStatus) {
    switch (Master.status) {
      case "Master/addItemRequest":
        masterStatus = Master.status;
        break;
      case "Master/addItemSuccess":
        masterStatus = Master.status;
        toast.success("Item added successfully");

        navigate(
          `/master/item?category=${getValues(
            "category"
          )}&subcategory=${getValues("subcategory")}`
        );
        reset();
        break;
      case "Master/addItemFailure":
        masterStatus = Master.status;
        break;

      case "Master/getSubCategoryRequest":
        masterStatus = Master.status;
        break;
      case "Master/getSubCategorySuccess":
        masterStatus = Master.status;
        setSubcategory(Master.getSubCategoryResponse?.data);
        break;
      case "Master/getSubCategoryFailure":
        masterStatus = Master.status;
        break;
    }
  }

  const isEnabled = () => {
    if (
      getValues("category") === "WINE" ||
      getValues("category") === "LIQOUR"
    ) {
      return true;
    } else {
      return false;
    }
  };

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
        <a href="/master/item" className="opacity-60">
          <span>Inventory</span>
        </a>
        <a href="#">Add Inventory</a>
      </Breadcrumbs>
      <Card>
        <h5 className="text-xl mb-6">Create Inventory</h5>
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
          <Select label="Sub Catgeory" onChange={handleSubCategoryChange}>
            {Master.subCategory?.map((item) => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
          <Input label="Distributor" {...register("label", { required: true })} />
          <Input
            label="Sales Price"
            {...register("salesPrice", { required: true })}
            type="number"
            min={0}
          />
          {isEnabled() && (
            <Input
              label="Volume"
              type="number"
              min={0}
              {...register("volume", { required: true })}
            />
          )}
          {isEnabled() && (
            <Input
              label="Shots Count"
              type="number"
              min={0}
              {...register("shotsCount", { required: true })}
            />
          )}
          {isEnabled() && (
            <Input
              label="Shots Price"
              type="number"
              min={0}
              {...register("shotsPrice", { required: true })}
            />
          )}
          <div className="grid-cols-1/3">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default AddItem;
