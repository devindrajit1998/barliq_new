import React, { useEffect, useMemo, useState } from "react";
import Layout from "../layout";
import MyPagination from "../../components/MyPagination";
import {
  Breadcrumbs,
  Input,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { useForm } from "react-hook-form";
import { getReportRequest } from "../../redux/reducers/StockReducer";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { exportToCSV } from "../../utils/helpers/export";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/helpers/date";
import { Table } from "rsuite";
import EditDayWiseReport from "../../components/EditDayWiseReport";
import { getBarRequest } from "../../redux/reducers/MasterReducer";

const columnHelper = createColumnHelper();

const BeerDashboard = () => {
  const dispatch = useDispatch();
  const Stock = useSelector((state) => state.Stock);
  const Master = useSelector((state) => state.Master);
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [bar, setBar] = useState();
  const { Column, ColumnGroup, HeaderCell, Cell } = Table;
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(getBarRequest());
  }, []);

  useEffect(() => {
    if (Master.getBarResponse?.data?.length > 0) {
      let requestObj = {
        category: "BEER",
        bar: Master.getBarResponse?.data[0]?.id,
        date: moment().format("D.M.YYYY"),
      };
      setValue("bar", Master.getBarResponse?.data[0]?.id);
      setValue("date", moment().format("YYYY-MM-DD"));
      dispatch(getReportRequest(requestObj));
    }
  }, [refresh, Master.getBarResponse]);

  useEffect(() => {
    switch (Stock.status) {
      case "Stock/editDayWiseInventorySuccess":
        setRefresh((preState) => !preState);
        break;
    }
  }, [Stock.status]);

  const onSubmit = (data) => {
    let requestObj = {
      category: "BEER",
      ...data,
      date: moment(data.date).format("D.M.YYYY"),
    };
    dispatch(getReportRequest(requestObj));
  };

  const onDownload = () => {
    exportToCSV(
      Stock.getReportResponse?.data || [],
      moment().format("DD-MM-YYYY")
    );
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <Breadcrumbs>
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

          <a href="#">Beer Dashboard</a>
        </Breadcrumbs>
      </div>

      <Card className="table_card">
        <div className="sm:flex justify-between items-center mb-4">
          <h5 className="text-xl mb-4 sm:mb-0">Beer Dashboard</h5>
          <form
            className="sm:flex items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            {Master.getBarResponse?.data?.length > 0 && (
              <Select
                label="Bar"
                value={getValues("bar")}
                onChange={(value) => setValue("bar", value)}
              >
                {Master.getBarResponse?.data?.map((item) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            )}
            <span className="px-2"></span>
            <Input label="Date" type="date" {...register("date")} />
            <Button
              className="w-full mt-4 sm:mt-0 sm:w-72 sm:ml-2"
              type="submit"
            >
              Load
            </Button>
            <Button
              className="bg-green-500 sm:ml-2 mt-4 sm:mt-0"
              onClick={onDownload}
            >
              Download
            </Button>
          </form>
        </div>

        <Table
          bordered
          height={350}
          style={{ border: "1px solid #e20038" }}
          cellBordered
          headerHeight={50}
          data={Stock.getReportResponse?.data || []}
        >
          <Column width={42} fixed>
            <HeaderCell
              align="center"
              style={{
                background: "#e20038",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "16px",
              }}
            ></HeaderCell>
            <Cell>{(rowData) => <EditDayWiseReport data={rowData} />}</Cell>
          </Column>
          <Column width={200} fixed>
            <HeaderCell
              align="center"
              style={{
                background: "#e20038",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "16px",
              }}
            >
              Item
            </HeaderCell>
            <Cell dataKey="item" style={{ border: "1px solid red" }} />
          </Column>

          <Column width={150}>
            <HeaderCell
              align="center"
              style={{
                background: "#e20038",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "16px",
              }}
            >
              Start Bottles
            </HeaderCell>
            <Cell
              style={{ border: "1px solid red" }}
              dataKey="openingInventory"
            />
          </Column>

          <Column width={100}>
            <HeaderCell
              align="center"
              style={{
                background: "#e20038",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "16px",
              }}
            >
              Initial
            </HeaderCell>
            <Cell style={{ border: "1px solid red" }}>0</Cell>
          </Column>
          <Column width={100}>
            <HeaderCell
              align="center"
              style={{
                background: "#e20038",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "16px",
              }}
            >
              Changes
            </HeaderCell>
            <Cell style={{ border: "1px solid red" }}>0</Cell>
          </Column>

          <Column width={125}>
            <HeaderCell
              style={{
                background: "#e20038",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "16px",
              }}
              align="center"
            >
              ADDTL Req
            </HeaderCell>
            <Cell style={{ border: "1px solid red" }}>0</Cell>
          </Column>
          <Column width={125}>
            <HeaderCell
              style={{
                background: "#e20038",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "16px",
              }}
              align="center"
            >
              End Bottles
            </HeaderCell>
            <Cell
              style={{ border: "1px solid red" }}
              dataKey="closingInventory"
            />
          </Column>
          <Column width={150}>
            <HeaderCell
              style={{
                background: "#e20038",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "16px",
              }}
              align="center"
            >
              Sales Price
            </HeaderCell>
            <Cell style={{ border: "1px solid red" }} dataKey="salesPrice" />
          </Column>
          <Column width={150} fixed="right">
            <HeaderCell
              style={{
                background: "#e20038",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "16px",
              }}
              align="center"
            >
              Total Sales
            </HeaderCell>
            <Cell
              style={{ border: "1px solid red", fontWeight: "bold" }}
              dataKey="total"
            />
          </Column>
        </Table>
      </Card>
    </Layout>
  );
};

export default BeerDashboard;
