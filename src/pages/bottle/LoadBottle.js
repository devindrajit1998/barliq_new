import React, { useEffect, useState } from "react";
import Layout from "../layout";
import Card from "../../components/Card";
import {
  Breadcrumbs,
  Select,
  Option,
  Input,
  Button,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getItemRequest,
  getSubCategoryRequest,
} from "../../redux/reducers/MasterReducer";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { distributeStockRequest } from "../../redux/reducers/StockReducer";
import AddLoading from "../../components/AddLoadingAnimation";

const LoadBottle = () => {
  const dispatch = useDispatch();
  const Master = useSelector((state) => state.Master);
  const Stock = useSelector((state) => state.Stock);
  const [items, setItems] = useState([]);
  const [bars, setBars] = useState([]);

  const [item, setItem] = useState();
  const [bar, setBar] = useState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getSubCategoryRequest("WINE"));
  }, []);

  useEffect(() => {
    setItems(Master.getItemSuccess?.data || []);
    setBars(Master.getBarResponse?.data || []);
  }, [Master.getItemSuccess]);

  useEffect(() => {
    switch (Stock.status) {
      case "Stock/distributeStockSuccess":
        reset();
        toast.success(Stock.distributeStockResponse?.message);
        break;
    }
  }, [Stock.status]);

  const onSubmit = (data) => {
    if (!item) {
      toast.error("Please select item");
    } else {
      if (!bar) {
        toast.error("Please select bar");
      } else {
        let requestObj = {
          item,
          bar,
          loadCount: Number(data.loadCount),
          challanNo: "data.challanNo",
        };
        dispatch(distributeStockRequest(requestObj));
      }
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
        <a href="/bottle/dashboard" className="opacity-60">
          <span>Wine</span>
        </a>
        <a href="#">Load Wine</a>
      </Breadcrumbs>
      <Card>
        <h5 className="text-xl mb-6">Load Wine</h5>
        {Stock.status === "Stock/distributeStockRequest" ? (
          <AddLoading />
        ) : (
          <form
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Select
              label="Sub Category"
              onChange={(value) => dispatch(getItemRequest(value))}
            >
              {Master.subCategory?.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
            <Select label="Item" onChange={(value) => setItem(value)}>
              {items?.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
            <Select label="Bar Location" onChange={(value) => setBar(value)}>
              {bars.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
            <Input
              type="number"
              label="Load By"
              min={0}
              {...register("loadCount", { required: true })}
            />
            {/* <Input
              label="Challan No"
              {...register("challanNo", { required: true })}
            /> */}
            {/* <div></div> */}
            <div className="grid-cols-1/3">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        )}
      </Card>
    </Layout>
  );
};

export default LoadBottle;
