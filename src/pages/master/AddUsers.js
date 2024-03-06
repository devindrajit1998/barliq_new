import React, { useState } from "react";
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
import { addUserRequest } from "../../redux/reducers/MasterReducer";

let masterStatus = "";
const AddUsers = () => {
  const { register, handleSubmit } = useForm();
  const [role, setRole] = useState("ADMIN");
  const [bar, setBar] = useState("");
  const Master = useSelector((state) => state.Master);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (!bar) {
      toast.error("Please select a bar");
    } else {
      let requestObj = {
        ...data,
        bar,
        role
      };
      dispatch(addUserRequest(requestObj));
    }
  };

  if (masterStatus === "" || Master.status !== masterStatus) {
    switch (Master.status) {
      case "Master/addUserRequest":
        masterStatus = Master.status;
        break;
      case "Master/addUserSuccess":
        masterStatus = Master.status;
        toast.success("User added successfully");
        break;
      case "Master/addUserFailure":
        masterStatus = Master.status;
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
        <a href="/master/users" className="opacity-60">
          <span>Users</span>
        </a>
        <a href="#">Create Users</a>
      </Breadcrumbs>
      <Card>
        <h5 className="text-xl mb-6">Create User</h5>
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
            onChange={(value) => setRole(value)}
          >
            <Option value={"ADMIN"}>ADMIN</Option>
            <Option value={"BAR_TENDER"}>BAR TENDER</Option>
          </Select>
          <Input
            label="Password"
            {...register("password", { required: true })}
          />
          <Select label="Bar" value={bar} onChange={(value) => setBar(value)}>
            {Master?.getBarResponse?.data?.map((item) => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
          <div className="grid grid-cols-3">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default AddUsers;
