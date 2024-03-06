import React, { Fragment, useState } from "react";
import Layout from "./layout";
import {
  Breadcrumbs,
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import MyNavbar from "../components/Navbar";
import Card from "../components/Card";
import BeerEntry from "./inventory-entry/BeerEntry";
import BottleEntry from "./inventory-entry/BottleEntry";
import LiquorEntry from "./inventory-entry/LiqourEntry";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import animationData from "../assets/animation_lkipryx2.json";

let status = "";
const DayWiseEntry = () => {
  const [activeTab, setActiveTab] = useState("Beer");
  const Stock = useSelector((state) => state.Stock);
  const [recordSuccess, setRecordSuccess] = useState(false);

  if (status === "" || Stock.status !== status) {
    switch (Stock.status) {
      case "Stock/dayWiseEntryRequest":
        status = Stock.status;
        break;
      case "Stock/dayWiseEntrySuccess":
        status = Stock.status;
        toast.success("Inventory records added successfully");
        setTimeout(() => {
          setRecordSuccess(true);
        }, 1000);
        break;
    }
  }

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="h-screen w-screen">
      <MyNavbar />
      <div className="p-3 sm:w-1/2 mx-auto">
        <Card>
          <h5 className="text-xl mb-6">Bottle Count</h5>
         
          {!recordSuccess ? (
            <Fragment>
              <Tabs value={activeTab}>
                <TabsHeader
                  onClick={(value) => setActiveTab(value.target.innerText)}
                >
                  <Tab id="Beer" value={"Beer"}>
                    Beer
                  </Tab>
                  <Tab id="Bottle" value={"Wine"}>
                    Wine
                  </Tab>
                  <Tab id="Liquor" value={"Liquor"}>
                    Liquor
                  </Tab>
                </TabsHeader>

                {/* <TabsBody >
                  <TabPanel key={"BEER"} value={"BEER"}>
                    <BeerEntry active={activeTab} />
                  </TabPanel>

                  <TabPanel key={"WINE"} value={"WINE"}>
                    <BottleEntry active={activeTab} />
                  </TabPanel>

                  <TabPanel key={"LIQUOR"} value={"LIQUOR"}>
                    <LiquorEntry active={activeTab} />
                  </TabPanel>
                </TabsBody> */}
              </Tabs>
              <div className="h-96 my-4">
                {activeTab === "Beer" && <BeerEntry active={activeTab} />}
                {activeTab === "Wine" && <BottleEntry active={activeTab} />}
                {activeTab === "Liquor" && <LiquorEntry active={activeTab} />}
              </div>
            </Fragment>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <Lottie options={defaultOptions} width={200} height={200} />
              <Button
                onClick={() => {
                  setRecordSuccess((preState) => !preState);
                  setActiveTab("Beer");
                }}
              >
                Add Another
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DayWiseEntry;
