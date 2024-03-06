import React, { useEffect, useState } from "react";
import Layout from "../layout";
import {
  Breadcrumbs,
  Button,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import Card from "../../components/Card";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addUserRequest,
  editUserRequest,
} from "../../redux/reducers/MasterReducer";
import { useNavigate, useParams } from "react-router-dom";

let masterStatus = "";
const EditUsers = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [role, setRole] = useState("ADMIN");
  const { id } = useParams();
  const navigate = useNavigate()

  const Master = useSelector((state) => state.Master);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      let user = Master.getUserResponse?.users?.find((item) => item.id === id);
      setValue("displayName", user.displayName);
      setRole("role", user.role);
      setValue("phone", user.phone);
      setValue("email", user.email);
      setValue("id", id);
    }
  }, [id]);

  const onSubmit = (data) => {
    let requestObj = {
      ...data,
      id,
    };
    dispatch(editUserRequest(requestObj));
  };

  if (masterStatus === "" || Master.status !== masterStatus) {
    switch (Master.status) {
      case "Master/editUserRequest":
        masterStatus = Master.status;
        break;
      case "Master/editUserSuccess":
        masterStatus = Master.status;
        toast.success("User edited successfully");
        navigate("/master/users")
        break;
      case "Master/editUserFailure":
        masterStatus = Master.status;
        toast.error(Master.error?.message);
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
        <a href="/master/user" className="opacity-60">
          <span>Users</span>
        </a>
        <a href="#">Edit Users</a>
      </Breadcrumbs>
      <Card>
        <h5 className="text-xl mb-6">Edit User</h5>
        <form
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Display Name"
            {...register("displayName", { required: true })}
          />
          <Input label="Phone" {...register("phone", { required: true })} />
          <Input label="Email" {...register("email", { required: true })} />
          <Select
            label="Role"
            value={role}
            onChange={(value) => setValue("role",value)}
          >
            <Option value={"ADMIN"}>ADMIN</Option>
            <Option value={"BAR_TENDER"}>BAR TENDER</Option>
          </Select>

          <div className="grid grid-cols-3">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default EditUsers;
