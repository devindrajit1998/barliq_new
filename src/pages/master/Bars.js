import React, { useEffect } from "react";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { Breadcrumbs, Button } from "@material-tailwind/react";
import Layout from "../layout";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteBarRequest, getBarRequest } from "../../redux/reducers/MasterReducer";
import { toast } from "react-toastify";

const Bars = () => {
  const Master = useSelector((state) => state.Master);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      header: () => <span>Name</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.streetAddress, {
      id: "streetAddress",
      header: () => <span>Street Address</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.city, {
      id: "city",
      header: () => <span>City</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.pincode, {
      id: "pincode",
      header: () => <span>Zipcode</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.state, {
      id: "state",
      header: () => <span>State</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("country", {
      id: "country",
      header: () => <span>Country</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.id, {
      id: "edit",
      header: () => <span>Edit</span>,
      cell: (info) => (
        <FaEdit
          onClick={() => navigate(`/master/bar/${info.getValue()}`)}
          className="text-lg cursor-pointer"
        />
      ),
    }),
    columnHelper.accessor((row) => row.id, {
      id: "delete",
      header: () => <span>Delete</span>,
      cell: (info) => (
        <FaTrash
          onClick={() => dispatch(deleteBarRequest(info.getValue()))}
          className="text-lg cursor-pointer text-red-500"
        />
      ),
    }),
  ];

  const table = useReactTable({
    data: Master.getBarResponse?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    switch (Master.status) {
      case "Master/deleteBarSuccess":
        toast.success("Bar deleted successfully");
        dispatch(getBarRequest())
        break;
      default:
        break;
    }
  }, [Master.status]);
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
        {/* <a href="#" className="opacity-60">
          <span>Bar Locations</span>
        </a> */}
        <a href="#">Bar Location</a>
      </Breadcrumbs>
      <Card>
        <div className="flex justify-between mb-4 items-center">
          <h5 className="text-xl mb-2">Bar Locations</h5>
          <Button onClick={() => navigate("/master/add-bar")}>
            Create Bar Location
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

export default Bars;
