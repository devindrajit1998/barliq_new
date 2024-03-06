import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearItem,
  getItemRequest,
  getSubCategoryRequest,
} from "../../redux/reducers/MasterReducer";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { dayWiseEntryRequest } from "../../redux/reducers/StockReducer";

const BeerEntry = (props) => {
  const Master = useSelector((state) => state.Master);
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [items, setItems] = useState([]);
  const Auth = useSelector((state) => state.Auth);
  const Stock = useSelector((state) => state.Stock);

  const [subCategory, setSubCategory] = useState("");

  const [type, setType] = useState("OPENING");
  const [item, setItem] = useState();

  useEffect(() => {
    setSubCategory("");
    dispatch(clearItem())
    if (props.active === "BEER" || props.active === "Beer") {
      dispatch(getSubCategoryRequest("BEER"));
    }
  }, [props.active]);

  useEffect(() => {
    switch (Master.status) {
      case "Master/getItemSuccess":
        setItems(Master.getItemSuccess?.data);
        break;
    }
  }, [Master.status]);

  useEffect(() => {
    switch (Stock.status) {
      case "Stock/dayWiseEntrySuccess":
        break;
      case "Stock/dayWiseEntryFailure":
        toast.error(Stock.error?.message);
        break;
    }
  }, [Stock.status]);

  const isNumberInteger = (num) => {
    return num % 1 === 0;
  };

  const onSubmit = (data) => {
    if (!type) {
      toast.error("Please select entry type.");
    } else {
      if (!item) {
        toast.error("Please enter item");
      } else {
        if (isNumberInteger(Number(data.count || 0))) {
          let requestObj = {
            bar: Auth.user?.bar,
            item: item,
            actionType: type,
            count: Number(data.count || 0),
            category: "BEER",
          };
          dispatch(dayWiseEntryRequest(requestObj));
        } else {
          toast.error("Beer count can't be decimal number");
        }
      }
    }
  };

  return (
    <form className="sm:w-3/4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Opening/Closing"
        value={type}
        onChange={(value) => setType(value)}
      >
        <Option value="OPENING">Opening</Option>
        <Option value="CLOSING">Closing</Option>
      </Select>
      <span className="p-3"></span>
      <Select
        label="Sub Category"
        
        onChange={(value) => {
          setSubCategory(value);
          dispatch(getItemRequest(value));
        }}
      >
        {Master.subCategory?.map((item) => (
          <Option value={item.id}>{item.name}</Option>
        ))}
      </Select>
      <span className="p-3"></span>
      {subCategory && (
        <Select label="Item" onChange={(value) => setItem(value)}>
          {items.map((item) => (
            <Option value={item.id}>{item.name}</Option>
          ))}
        </Select>
      )}
      <span className="p-3"></span>
      {type === "CLOSING" && (
        <Input
          type="number"
          step={0.1}
          {...register("count", { required: true })}
          label="Count"
        />
      )}
      <span className="p-3"></span>
      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default BeerEntry;
