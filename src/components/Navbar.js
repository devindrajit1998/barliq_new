import React, { useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { CgMenu, CgMenuLeft, CgMenuLeftAlt } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest, toggleMenu } from "../redux/reducers/AuthReducer";
import { useNavigate } from "react-router-dom";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

let authStatus = "";
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="white"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-blue-500 p-0.5"
            src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Prescription01&hairColor=Black&facialHairType=MoustacheFancy&facialHairColor=Platinum&clotheType=BlazerShirt&eyeType=Happy&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Light"
          />
          <div className="hidden sm:block">
            <h5>{Auth.user?.displayName}</h5>
            <p className="lowercase">{Auth.user?.email}</p>
          </div>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem
          onClick={() => {
            navigate("/");
            dispatch(logoutRequest());
          }}
          className="flex"
        >
          <IoLogOut className="text-lg" />
          <span className="px-4">Logout</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default function MyNavbar() {
  const dispatch = useDispatch();

  return (
    <div className="p-2 top_nav w-full">
      <div className="flex items-center text-white w-full justify-between">
        <div className="flex items-center">
          <CgMenuLeftAlt
            color="#fff"
            className="text-lg cursor-pointer"
            onClick={() => dispatch(toggleMenu())}
          />
          <h2 className="text-lg px-2 font-bold">
            Bar Count Inventory Management
          </h2>
        </div>
        <ProfileMenu />
      </div>
    </div>
  );
}
