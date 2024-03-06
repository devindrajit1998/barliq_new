import React, { Fragment, useEffect, useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  Breadcrumbs,
  Button,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import Layout from "../layout";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsFillTrashFill, BsFilter } from "react-icons/bs";
import { FaEdit, FaTruckLoading } from "react-icons/fa";
import {
  clearStatus,
  deleteItemRequest,
  getItemRequest,
  getSubCategoryRequest,
} from "../../redux/reducers/MasterReducer";
import BarStock from "../../components/BarStock";
import { useToggle } from "usehooks-ts";
import { useForm } from "react-hook-form";
import { loadStockRequest } from "../../redux/reducers/StockReducer";
import Loading from "../../components/Loading";
import { Table } from "rsuite";
import { toast } from "react-toastify";

const columnHelper = createColumnHelper();

let masterStatus = "";
let stockStatus = "";
const Item = () => {
  const Master = useSelector((state) => state.Master);
  const Stock = useSelector((state) => state.Stock);
  const { Column, ColumnGroup, Cell, HeaderCell } = Table;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, toggle, setValue] = useToggle();
  const [selectedItemId, setSelectedItemId] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [reloadItemList, setReLoadItemList] = useState(false);

  useEffect(() => {
    let category = searchParams.get("category");
    let subcategory = searchParams.get("subcategory");
    if (category) {
      setFilterCategory(category);
    }
    if (subcategory) {
      setFilterSubCategory(subcategory);
      dispatch(getItemRequest(subcategory));
    }
  }, [searchParams, reloadItemList]);

  const columns = [
    columnHelper.accessor("name", {
      header: () => <span>Name</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.label, {
      id: "label",
      header: () => <span>Label</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.volume, {
      id: "volume",
      header: () => <span>Volume(ml)</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.shotsCount, {
      id: "shotsCount",
      header: () => <span>Shots Count</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.shotsPrice, {
      id: "shotsPrice",
      header: () => <span>Shots Price</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.salesPrice, {
      id: "salesPrice",
      header: () => <span>Sales Price</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.stock, {
      id: "stock",
      header: () => <span>Stock</span>,
      cell: (info) => info.getValue()?.currentCount,
    }),
    columnHelper.accessor((row) => row.BarStock, {
      id: "BarStock",
      header: () => <span>Bar Stock</span>,
      cell: (info) => <BarStock info={info.getValue()} />,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "id",
      header: () => <span>Actions</span>,
      cell: (info) => (
        <div className="flex">
          <FaTruckLoading
            className="text-green-500 text-lg cursor-pointer"
            onClick={() => {
              setValue(true);
              setSelectedItemId(info.getValue());
            }}
          />
          <FaEdit
            className="mx-8 cursor-pointer"
            onClick={() => navigate(`/master/item/${info.getValue()}`)}
          />
          <BsFillTrashFill className="cursor-pointer text-red-900" />
        </div>
      ),
    }),
  ];

  const onSubmit = (data) => {
    let requestObj = {
      item: selectedItemId,
      loadCount: Number(data.loadCount),
      invoiceNo: "data.invoiceNo",
      challanNo: data.challanNo,
    };
    dispatch(loadStockRequest(requestObj));
  };

  const [filterCategory, setFilterCategory] = useState("LIQOUR");
  const [filterSubCategory, setFilterSubCategory] = useState("");

  useEffect(() => {
    dispatch(getSubCategoryRequest(filterCategory));
    dispatch(clearStatus());
  }, [filterCategory]);

  const table = useReactTable({
    data: Master.getItemSuccess?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    switch (Master.status) {
      case "Master/getSubCategorySuccess":
        masterStatus = Master.status;
        setSubCategoryList(Master.subCategory);
        let firstSubcategory = Master.subCategory[0]?.id;
        setSearchParams({
          subcategory: firstSubcategory,
          category: filterCategory,
        });
        break;

      case "Master/deleteItemSuccess":
        toast.success("Item deleted successfully");
        setReLoadItemList((preState) => !preState);
        break;
      default:
        break;
    }
  }, [Master.status]);

  useEffect(() => {
    switch (Stock.status) {
      case "Stock/loadStockSuccess":
        setValue(false);
        dispatch(getItemRequest(filterSubCategory));
        reset();
        break;
      default:
        break;
    }
  }, [Stock.status]);

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
          <span>Master</span>
        </a> */}
        <a href="#">Inventory</a>
      </Breadcrumbs>
      <Card>
        <div className="sm:flex justify-between mb-4 items-center">
          <h5 className="text-xl mb-2">Add Inventory</h5>
          <div className="sm:flex">
            <div className="sm:flex items-center pr-4">
              <Select
                label="Catgeory"
                value={filterCategory}
                arrow={<BsFilter />}
                onChange={(value) => setFilterCategory(value)}
              >
                <Option value="LIQOUR">LIQUOR</Option>
                <Option value="BEER">BEER</Option>
                <Option value="WINE">WINE</Option>
              </Select>
              <span className="px-2"></span>
              <Select
                label="Sub Category"
                // value={filterSubCategory}
                onChange={(value) => {
                  setSearchParams({
                    subcategory: value,
                    category: filterCategory,
                  });
                }}
              >
                {subCategoryList.map((item) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </div>
            <Button
              className="mt-4 sm:mt-0"
              onClick={() => navigate("/master/add-item")}
            >
              Add Inventory
            </Button>
          </div>
        </div>

        <Table
          bordered
          height={350}
          rowHeight={75}
          style={{ border: "1px solid #e20038" }}
          cellBordered
          loading={Master.status === "Master/getItemRequest"}
          data={Master.getItemSuccess?.data || []}
        >
          <Column width={150} fixed>
            <HeaderCell
              style={{
                fontSize: "16px",
                textTransform: "uppercase",
              }}
            >
              Name
            </HeaderCell>
            <Cell style={{ border: "1px solid #e20038" }} dataKey="name" />
          </Column>

          <Column width={200}>
            <HeaderCell
              style={{
                fontSize: "16px",
                textTransform: "uppercase",
              }}
            >
              Distributor
            </HeaderCell>
            <Cell style={{ border: "1px solid #e20038" }} dataKey="label" />
          </Column>

          <Column width={125}>
            <HeaderCell
              style={{
                fontSize: "16px",
                textTransform: "uppercase",
              }}
            >
              Volume
            </HeaderCell>
            <Cell style={{ border: "1px solid #e20038" }}>
              {(rowData) =>
                rowData.volume >= 1000
                  ? rowData.volume / 1000 + "L"
                  : rowData.volume + "L"
              }
            </Cell>
          </Column>

          <Column width={200}>
            <HeaderCell
              style={{
                fontSize: "16px",
                textTransform: "uppercase",
              }}
            >
              Shots/Glasses Count
            </HeaderCell>
            <Cell
              style={{ border: "1px solid #e20038" }}
              dataKey="shotsCount"
            />
          </Column>

          <Column width={200}>
            <HeaderCell
              style={{
                fontSize: "16px",
                textTransform: "uppercase",
              }}
            >
              Shots/Glasses Price
            </HeaderCell>
            <Cell
              style={{ border: "1px solid #e20038" }}
              dataKey="shotsPrice"
            />
          </Column>

          <Column width={150}>
            <HeaderCell
              style={{
                fontSize: "16px",
                textTransform: "uppercase",
              }}
            >
              Sales Price
            </HeaderCell>
            <Cell
              style={{ border: "1px solid #e20038" }}
              dataKey="salesPrice"
            />
          </Column>

          <Column width={150}>
            <HeaderCell
              style={{
                fontSize: "16px",
                textTransform: "uppercase",
              }}
            >
              Stock
            </HeaderCell>
            <Cell style={{ border: "1px solid #e20038" }}>
              {(rowData) => rowData.stock?.currentCount}
            </Cell>
          </Column>

          <Column width={150}>
            <HeaderCell
              style={{
                fontSize: "16px",
                textTransform: "uppercase",
              }}
            >
              Bar Stock
            </HeaderCell>
            <Cell style={{ border: "1px solid #e20038" }}>
              {(rowData) => <BarStock info={rowData.BarStock} />}
            </Cell>
          </Column>

          <Column width={150}>
            <HeaderCell
              style={{
                fontSize: "16px",
                textTransform: "uppercase",
              }}
            >
              Actions
            </HeaderCell>
            <Cell style={{ border: "1px solid #e20038" }}>
              {(rowData) => (
                <div className="flex">
                  <FaTruckLoading
                    className="text-green-500 text-lg cursor-pointer"
                    onClick={() => {
                      setValue(true);
                      setSelectedItemId(rowData.id);
                    }}
                  />
                  <FaEdit
                    className="mx-8 cursor-pointer"
                    onClick={() => navigate(`/master/item/${rowData.id}`)}
                  />
                  <BsFillTrashFill
                    className="cursor-pointer text-red-900"
                    onClick={() => dispatch(deleteItemRequest(rowData.id))}
                  />
                </div>
              )}
            </Cell>
          </Column>
        </Table>
        {/* <div className="table-responsive">
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
              {Master.status === "Master/getItemRequest" ? (
                <tr>
                  <td colSpan={12} className="text-center">
                    <Loading />
                  </td>
                </tr>
              ) : (
                <Fragment>
                  {table.getRowModel().rows.length === 0 && (
                    <tr>
                      <td colSpan={12} className="text-center">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </Fragment>
              )}
            </tbody>
          </table>
        </div> */}
      </Card>
      <Dialog open={value} handler={() => setValue(!value)}>
        <DialogHeader>Stock Entry</DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogBody>
            <Input
              type="number"
              label="Load Count"
              min={0}
              {...register("loadCount", { required: true })}
            />
            <div className="py-2"></div>
            <Input
              type="text"
              label="Added By"
              {...register("challanNo", { required: true })}
            />
          </DialogBody>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </Dialog>
    </Layout>
  );
};

export default Item;
