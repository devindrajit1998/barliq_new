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
import "./inventory.css";

const BottleEntry = (props) => {
  const Master = useSelector((state) => state.Master);
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [items, setItems] = useState([]);
  const Auth = useSelector((state) => state.Auth);
  const Stock = useSelector((state) => state.Stock);
  const [subcategory, setSubCategory] = useState("");

  const [type, setType] = useState("OPENING");
  const [item, setItem] = useState();
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    setSubCategory("");
    dispatch(clearItem())
    if (props.active === "WINE" || props.active === "Wine") {
      dispatch(getSubCategoryRequest("WINE"));
    }
  }, [props.active]);

  useEffect(() => {
    switch (Master.status) {
      case "Master/clearItem":
        setItems([]);
        break;

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

  const onSubmit = (data) => {
    if (!type) {
      toast.error("Please select entry type.");
    } else {
      if (!item) {
        toast.error("Please enter item");
      } else {
        let requestObj = {
          bar: Auth.user?.bar,
          item: item,
          actionType: type,
          count: Number(count1) + Number(count2),
          category: "WINE",
        };
        dispatch(dayWiseEntryRequest(requestObj));
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
      {subcategory && (
        <Select label="Item" onChange={(value) => setItem(value)} offset={3}>
          {items.map((item) => (
            <Option value={item.id}>{item.name}</Option>
          ))}
        </Select>
      )}
      <span className="p-3"></span>
      {type === "CLOSING" && (
        <div className="grid grid-cols-2 gap-2">
          <Select label="Count" onChange={(value) => setCount1(Number(value))}>
            {Array.from({ length: 100 }, (_, i) => i).map((item) => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
          <Select label="Count" onChange={(value) => setCount2(Number(value))}>
            {Array.from({ length: 9 }, (_, i) => (i + 1) / 10).map((item) => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
        </div>
      )}
      <span className="p-3"></span>
      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default BottleEntry;
