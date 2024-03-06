import React, { useEffect } from "react";
import { Breadcrumbs, Button } from "@material-tailwind/react";
import Layout from "../layout";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getUserRequest } from "../../redux/reducers/MasterReducer";

const Users = () => {
  const navigate = useNavigate();
  const Master = useSelector((state) => state.Master);
  const dispatch = useDispatch();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("displayName", {
      header: () => <span>Name</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.email, {
      id: "email",
      header: () => <span>Email</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.phone, {
      id: "phone",
      header: () => <span>Phone</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.role, {
      id: "role",
      header: () => <span>Role</span>,
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor((row) => row.id, {
      id: "edit",
      header: () => <span>Edit</span>,
      cell: (info) => (
        <FaEdit
          onClick={() => navigate(`/master/user/${info.getValue()}`)}
          className="text-lg cursor-pointer"
        />
      ),
    }),
    columnHelper.accessor((row) => row.id, {
      id: "delete",
      header: () => <span>Delete</span>,
      cell: (info) => (
        <FaTrash
          // onClick={() => dispatch(deleteSubCategoryRequest(info.getValue()))}
          className="text-lg cursor-pointer text-red-500"
        />
      ),
    }),
  ];

  useEffect(() => {
    dispatch(getUserRequest());
  }, []);

  const table = useReactTable({
    data: Master.getUserResponse?.users || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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

        <a href="#">Users</a>
      </Breadcrumbs>
      <Card>
        <div className="flex justify-between mb-4 items-center">
          <h5 className="text-xl mb-2">Users</h5>
          <Button onClick={() => navigate("/master/add-users")}>
            Create Users
          </Button>
        </div>
        <div className="table-responsive">
          <table className="w-full table rounded-md p-2">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="text-left">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {table.getRowModel().rows.length === 0 && (
                <tr>
                  <td colSpan={12} className="text-center">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </Layout>
  );
};

export default Users;
