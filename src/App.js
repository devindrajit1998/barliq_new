import logo from "./logo.svg";
import "./App.css";
import 'rsuite/dist/rsuite.min.css';
import "./style.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AddBar,
  AddItem,
  AddSubCategory,
  BeerDashboard,
  BottleDashboard,
  LiquorDashboard,
  LoadBeer,
  LoadBottle,
  LoadLiquor,
  Login,
  StockEntry,
  Dashboard,
} from "./pages";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBarRequest } from "./redux/reducers/MasterReducer";
import Bars from "./pages/master/Bars";
import SubCategory from "./pages/master/SubCategory";
import Item from "./pages/master/Item";
import DayWiseEntry from "./pages/DayWiseEntry";
import Users from "./pages/master/Users";
import AddUsers from "./pages/master/AddUsers";
import Redirect from "./pages/redirect";
import Preloader from "./pages/Preloader";
import ErrorBoundry from "./components/ErrorBoundry";
import EditBar from "./pages/master/EditBar";
import EditSubCategory from "./pages/master/EditSubCategory";
import EditUsers from "./pages/master/EditUser";
import EditItem from "./pages/master/EditItem";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBarRequest());
  }, []);

  const userRoutes = {
    ADMIN: [
      { path: "/dashboard", element: <Dashboard />, errorElement: <ErrorBoundry /> },
      { path: "master/bar", element: <Bars />, errorElement: <ErrorBoundry /> },
      {
        path: "master/bar/:id",
        element: <EditBar />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "master/add-bar",
        element: <AddBar />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "master/item",
        element: <Item />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "master/item/:id",
        element: <EditItem />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "master/add-item",
        element: <AddItem />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "master/sub-category",
        element: <SubCategory />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "master/sub-category/:id",
        element: <EditSubCategory />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "master/add-sub-category",
        element: <AddSubCategory />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "master/users",
        element: <Users />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "master/user/:id",
        element: <EditUsers />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "master/add-users",
        element: <AddUsers />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "beer/dashboard",
        element: <BeerDashboard />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "beer/load",
        element: <LoadBeer />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "bottle/dashboard",
        element: <BottleDashboard />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "bottle/load",
        element: <LoadBottle />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "liquor/dashboard",
        element: <LiquorDashboard />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "liquor/load",
        element: <LoadLiquor />,
        errorElement: <ErrorBoundry />,
      },
    ],
    BAR_TENDER: [
      { path: "/", element: <DayWiseEntry />, errorElement: <ErrorBoundry /> },
    ],
  };

  const routes = [
    { path: "/", element: <Dashboard />, errorElement: <ErrorBoundry /> },
    ...userRoutes.ADMIN,
    ...userRoutes.BAR_TENDER,
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;