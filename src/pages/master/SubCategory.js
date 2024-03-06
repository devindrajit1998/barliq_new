import React, { useEffect, useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { Breadcrumbs, Button, Select, Option } from "@material-tailwind/react";
import Layout from "../layout";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFilter } from "react-icons/bs";
import {
  deleteSubCategoryRequest,
  getSubCategoryRequest,
} from "../../redux/reducers/MasterReducer";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const SubCategory = () => {
  const Master = useSelector((state) => state.Master);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      header: () => <span>Name</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.category, {
      id: "category",
      header: () => <span>Category</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.status, {
      id: "status",
      header: () => <span>Status</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.id, {
      id: "edit",
      header: () => <span>Edit</span>,
      cell: (info) => (
        <FaEdit
          onClick={() => navigate(`/master/sub-category/${info.getValue()}`)}
          className="text-lg cursor-pointer"
        />
      ),
    }),
    columnHelper.accessor((row) => row.id, {
      id: "delete",
      header: () => <span>Delete</span>,
      cell: (info) => (
        <FaTrash
          onClick={() => dispatch(deleteSubCategoryRequest(info.getValue()))}
          className="text-lg cursor-pointer text-red-500"
        />
      ),
    }),
  ];

  const [filterCategory, setFilterCategory] = useState("LIQOUR");

  useEffect(() => {
    dispatch(getSubCategoryRequest(filterCategory));
  }, [filterCategory]);

  useEffect(() => {
    switch (Master.status) {
      case "Master/deleteSubCategorySuccess":
        toast.success("Sub Category deleted successfully");
        dispatch(getSubCategoryRequest(filterCategory));
        break;
      case "Master/deleteSubCategoryFailure":
        toast.error(Master.error?.message);
        break;

      default:
        break;
    }
  }, [Master.status]);

  const table = useReactTable({
    data: Master.subCategory,
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

        <a href="#">Sub Category</a>
      </Breadcrumbs>
      <Card>
        <div className="sm:flex justify-between mb-4 items-center">
          <h5 className="text-xl mb-2">Sub Category</h5>
          <div className="flex">
            <div className="flex items-center sm:pr-4 pr-2">
              <Select
                label="Catgeory"
                value={filterCategory}
                arrow={<BsFilter />}
                onChange={(value) => {
                  setFilterCategory(value);
                  dispatch(getSubCategoryRequest(value));
                }}
              >
                <Option value="LIQOUR">LIQUOR</Option>
                <Option value="BEER">BEER</Option>
                <Option value="WINE">WINE</Option>
              </Select>
            </div>
            <Button onClick={() => navigate("/master/add-sub-category")}>
              Create
            </Button>
          </div>
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

export default SubCategory;
