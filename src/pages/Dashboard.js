import React, { useEffect, useState } from "react";
import Layout from "./layout";
import { Breadcrumbs, Input } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardRequest } from "../redux/reducers/StockReducer";
import moment from "moment";

const Dashboard = () => {
  const Stock = useSelector((state) => state.Stock);
  const dispatch = useDispatch();
  const [reportDate, setReportDate] = useState(moment().format("YYYY-MM-DD"))

  const [bar, setBar] = useState([]);
  const [barStats, setBarStats] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);

  useEffect(() => {
    dispatch(getDashboardRequest(moment().format("D.M.YYYY")));
  }, []);

  const handleDateChange = (event) => {
    console.log(event.target.value);
    setReportDate(event.target.value)
    dispatch(
      getDashboardRequest(moment(event.target.value).format("D.M.YYYY"))
    );
  };

  useEffect(() => {
    switch (Stock.status) {
      case "Stock/getDashboardSuccess":
        let bars = Stock.getDashboardResponse?.barReport?.map((item) => {
          return item.name;
        });
        setBar(bars);
        let barStats = Stock.getDashboardResponse?.barReport?.map((item) => {
          return item.count;
        });
        setBarStats(barStats);
        let categoryStats = Object.values(
          Stock.getDashboardResponse?.categorySalesReport
        );
        setCategoryStats(categoryStats);
        break;
      default:
        break;
    }
  }, [Stock.status]);

  return (
    <Layout>
      <div className="sm:flex justify-between items-center">
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
            <span>Dashboard</span>
          </a>
          {/* <a href="#">Create Bar</a> */}
        </Breadcrumbs>

        <div>
          <Input value={reportDate} label="Date" type="date" onChange={handleDateChange} />
        </div>
      </div>
      <div className="sm:flex">
        <div className="sm:w-3/5 sm:pr-2 my-4 sm:my-0">
          <Card className="">
            <h5>Bar Sales</h5>
            <Chart
              type="bar"
              options={{
                chart: {
                  id: "basic-bar",
                },
                xaxis: {
                  categories: bar,
                },
              }}
              series={[
                {
                  name: "series-1",
                  data: barStats,
                },
              ]}
            />
          </Card>
        </div>
        <div className="sm:w-2/5 sm:pl-2">
          <Card>
            <h5>Category Sales</h5>
            <Chart
              type="pie"
              options={{ labels: ["Beer", "Wine", "Liquor"] }}
              series={categoryStats}
            />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
