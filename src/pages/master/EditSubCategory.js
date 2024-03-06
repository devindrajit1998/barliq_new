import React, { useEffect } from "react";
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
  addSubcategoryRequest,
  editSubCategoryRequest,
} from "../../redux/reducers/MasterReducer";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

let masterStatus = "";
const EditSubCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const Master = useSelector((state) => state.Master);

  useEffect(() => {
    if (id) {
      let subCategory = Master.subCategory?.find((item) => item.id === id);
      setValue("name", subCategory.name);
      setValue("id", subCategory.id);
    }
  }, [id]);

  const onSubmit = (data) => {
    dispatch(editSubCategoryRequest(data));
  };

  if (masterStatus === "" || Master.status !== masterStatus) {
    switch (Master.status) {
      case "Master/editSubCategoryRequest":
        masterStatus = Master.status;
        break;
      case "Master/editSubCategorySuccess":
        masterStatus = Master.status;
        navigate("/master/sub-category");
        toast.success("Sub Category edited successfully");
        reset();
        break;
      case "Master/editSubCategoryFailure":
        masterStatus = Master.status;
        toast.error(Master?.error?.message);
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
        <a href="/master/sub-category" className="opacity-60">
          <span>Sub-Category</span>
        </a>
        <a href="#">Edit Sub-Category</a>
      </Breadcrumbs>
      <Card>
        <h5 className="text-xl mb-6">Edit Sub Category</h5>
        <p className="hidden">{getValues("category")}</p>
        <form
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input label="Name" {...register("name", { required: true })} />
          <div className="grid-cols-1/3">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default EditSubCategory;
