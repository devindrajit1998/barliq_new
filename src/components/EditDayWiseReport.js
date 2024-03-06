import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import React, { Fragment, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useToggle } from "usehooks-ts";
import { editDayWiseInventoryRequest } from "../redux/reducers/StockReducer";
import { toast } from "react-toastify";

const EditDayWiseReport = (props) => {
  const { data, } = props;
  const Stock = useSelector((state) => state.Stock);
  const dispatch = useDispatch();

  const isNumberInteger = (num) => {
    return num % 1 === 0;
  };

  const [value, toggle, setValue] = useToggle();

  const [count, setCount] = useState(data?.closingInventory);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    switch(Stock.status) {
      case "Stock/editDayWiseInventorySuccess":
        setValue(false);
        break
    }
  }, [Stock.status]);

  const onSubmit = () => {
    if (data.category === "BEER") {
      if (isNumberInteger(count)) {
        let requestObj = {
          record_id: data?.id,
          count: Number(count),
        };
        console.log("Update: ", requestObj);
        dispatch(editDayWiseInventoryRequest(requestObj));
      } else {
        toast.error("Beer count can't be in decimal");
      }
    } else {
      let requestObj = {
        record_id: data?.id,
        count: Number(count1) + Number(count2),
      };
      console.log("Update: ", requestObj);
      dispatch(editDayWiseInventoryRequest(requestObj));
    }
  };

  if (data?.editable) {
    return (
      <Fragment>
        <BiEdit size={20} className="cursor-pointer" onClick={toggle} />
        <Dialog open={value} handler={toggle}>
          <DialogHeader>Inventory Records(Edit)</DialogHeader>
          <DialogBody>
            <p className="text-sm text-red-500 mb-4">
              Current Closing: {data?.closingInventory}
            </p>
            {data?.category === "BEER" ? (
              <Input
                type="number"
                step={0.1}
                label="Count"
                value={count}
                onChange={(e) => setCount(e.target?.value)}
              />
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Select
                  label="Count"
                  // value={count1}
                  onChange={(value) => setCount1(Number(value))}
                >
                  {Array.from({ length: 100 }, (_, i) => i).map((item) => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
                <Select
                  label="Count"
                  // value={count2}
                  onChange={(value) => setCount2(Number(value))}
                >
                  {Array.from({ length: 9 }, (_, i) => (i + 1) / 10).map(
                    (item) => (
                      <Option value={item}>{item}</Option>
                    )
                  )}
                </Select>
              </div>
            )}
          </DialogBody>
          <DialogFooter>
            <Button onClick={onSubmit}>Submit</Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    );
  }
  return null;
};

export default EditDayWiseReport;
