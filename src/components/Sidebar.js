import React from "react";
import "../";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate, useNavigation } from "react-router-dom";
import { IoBeerSharp, IoGridOutline, IoCloseCircle } from "react-icons/io5";
import { GiBeerBottle } from "react-icons/gi";
import { MdLiquor } from "react-icons/md";
import { FaSitemap } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../redux/reducers/AuthReducer";
import { useScreen, useWindowSize } from "usehooks-ts";

export default function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const navigate = useNavigate();
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const { width, height } = useWindowSize();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openPage = (page) => {
    navigate(page);
    if (width < 786) {
      dispatch(toggleMenu());
    }
  };

  return (
    <Card
      className={`w-screen sm:w-1/5 h-screen overflow-y-scroll bg_sidebar ${
        Auth.openMenu ? "block" : "hidden"
      } absolute sm:relative z-50 transition-all`}
    >
      <IoCloseCircle
        className="absolute right-4 top-4 text-3xl cursor-pointer sm:hidden text-white"
        onClick={() => dispatch(toggleMenu())}
      />
      <div className="mb-2 p-4 flex justify-center">
        <img
          src={require("../assets/ic_barliq.png")}
          alt="brand_logo"
          style={{ width: "115px" }}
        />
      </div>
      <List>
        <ListItem className="text-white side_nav" onClick={() => openPage("/")}>
          <ListItemPrefix>
            <IoGridOutline className="text-xl" />
          </ListItemPrefix>
          Sales Dashboard
        </ListItem>

        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3 text-white dd_menu"
            >
              <ListItemPrefix>
                <FaSitemap className="text-xl" />
              </ListItemPrefix>
              <Typography color="white" className="mr-auto font-normal">
                Main Menu
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                className="text-white hover:bg-white"
                onClick={() => openPage("/master/bar")}
              >
                - Bar Locations
              </ListItem>
              <ListItem
                className="text-white hover:bg-white"
                onClick={() => openPage("/master/sub-category")}
              >
                - Sub-Category
              </ListItem>
              <ListItem
                ripple={false}
                className="text-white hover:bg-white"
                onClick={() => openPage("/master/users")}
              >
                - Users
              </ListItem>
              <ListItem
                className="text-white hover:bg-white"
                onClick={() => openPage("/master/item")}
              >
                - Add Inventory
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3 text-white dd_menu"
            >
              <ListItemPrefix>
                <IoBeerSharp className="text-lg" />
              </ListItemPrefix>
              <Typography color="white" className="mr-auto font-normal">
                Beer
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                className="text-white hover:bg-white"
                onClick={() => openPage("/beer/dashboard")}
              >
                - Dashboard
              </ListItem>
              <ListItem
                className="text-white hover:bg-white"
                onClick={() => openPage("/beer/load")}
              >
                - Load Beer
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 3 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="border-b-0 p-3 text-white dd_menu"
            >
              <ListItemPrefix>
                <GiBeerBottle className="text-xl" />
              </ListItemPrefix>
              <Typography color="white" className="mr-auto font-normal">
                Wine
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                className="text-white hover:bg-white"
                onClick={() => openPage("/bottle/dashboard")}
              >
                - Dashboard
              </ListItem>
              <ListItem
                className="text-white hover:bg-white"
                onClick={() => openPage("/bottle/load")}
              >
                - Load Wine
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 4 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 4}>
            <AccordionHeader
              onClick={() => handleOpen(4)}
              className="border-b-0 p-3 text-white dd_menu"
            >
              <ListItemPrefix>
                <MdLiquor className="text-xl" />
              </ListItemPrefix>
              <Typography color="white" className="mr-auto font-normal">
                Liquor
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                className="text-white"
                onClick={() => openPage("/liquor/dashboard")}
              >
                - Dashboard
              </ListItem>
              <ListItem
                className="text-white"
                onClick={() => openPage("/liquor/load")}
              >
                - Load Liquor
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    </Card>
  );
}
