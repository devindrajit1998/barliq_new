import React, { useEffect, useState } from "react";
import { Breadcrumbs, Input, Button, Select, Option } from "@material-tailwind/react";
import Layout from "../layout";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategoryRequest } from "../../redux/reducers/MasterReducer";

const StockEntry = () => {
  const [category, setCategory] = useState("LIQOUR");
  const [subCategory, setSubCategory] = useState("");

  const Master = useSelector((state) => state.Master);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubCategoryRequest(category));
  }, [category]);

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
        <a href="#" className="opacity-60">
          <span>Master</span>
        </a>
        <a href="#">Stock Entry</a>
      </Breadcrumbs>
      <Card>
        <h5 className="text-xl mb-6">Stock Entry</h5>
        <form className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select label="Category" onChange={(value) => console.log(value)}>
            <Option value="WINE">WINE</Option>
            <Option value="BEER">BEER</Option>
            <Option value="LIQOUR">LIQUOR</Option>
          </Select>
          <Input label="Item" />
          <Input label="Stock" />

          <Input label="Date" />
          <Input label="Invoice Number" />

          <div className="grid-cols-1/3">
            <Button>Submit</Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default StockEntry;
