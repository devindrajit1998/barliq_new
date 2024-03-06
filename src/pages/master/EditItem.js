import React, { useEffect, useState } from "react";
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
  editItemRequest,
  getSubCategoryRequest,
} from "../../redux/reducers/MasterReducer";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

let masterStatus = "";
const EditItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Master = useSelector((state) => state.Master);
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm();

  useEffect(() => {
    if (id) {
      let item = Master.getItemSuccess?.data?.find((item) => item.id === id);
      setValue("category", item.category);
      setValue("subcategory", item.subcategory);
      setValue("name", item.name);
      setValue("label", item.label);
      setValue("salesPrice", item.salesPrice);
      setValue("volume", item.volume);
      setValue("shotsCount", item.shotsCount);
      setValue("shotsPrice", item.shotsPrice);
      setValue("id", id);
      setShowForm(true);
    }
  }, [id]);

  const onSubmit = (data) => {
    let requestObj = {
      ...data,
      salesPrice: Number(data.salesPrice),
      volume: Number(data.volume || 0),
      shotsCount: Number(data.shotsCount || 1),
      shotsPrice: Number(data.shotsPrice || data.salesPrice),
    };
    dispatch(editItemRequest(requestObj));
  };

  if (masterStatus === "" || Master.status !== masterStatus) {
    switch (Master.status) {
      case "Master/editItemRequest":
        masterStatus = Master.status;
        break;
      case "Master/editItemSuccess":
        masterStatus = Master.status;
        toast.success("Item edited successfully");
        navigate(
          `/master/item?category=${getValues(
            "category"
          )}&subcategory=${getValues("subcategory")}`
        );
        reset();
        break;
      case "Master/editItemFailure":
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
        <a href="#">Edit Inventory</a>
      </Breadcrumbs>
      <Card>
        <h5 className="text-xl mb-6">Edit Inventory</h5>
        {showForm && (
          <form
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input label="Name" {...register("name", { required: true })} />
            <Input label="label" {...register("label", { required: true })} />
            <Input
              label="Sales Price"
              min={0}
              {...register("salesPrice", { required: true })}
              type="number"
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
        )}
      </Card>
    </Layout>
  );
};

export default EditItem;
