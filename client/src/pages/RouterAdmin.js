import React from "react";

import NotFound from "../error_404";
import HomeAdmin from "../components/admin/HomeAdmin";
// import AddRiceAdmin from "./test";
import AddRiceAdmin from "../components/admin/AddRiceAdmin";
import SignUp from "../components/login/SignUp";
import ManageUser from "../components/admin/ManageUser";
import EditRiceAdmin from "../components/admin/EditRiceAdmin";
import QRscanner from "../components/admin/QRscanner";
import ViewUserAdmin from "../components/admin/ViewUserAdmin";
// import test from "./test";




export const RouterAdmin = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <HomeAdmin />,
  },
  {
    path: "/admin/add-rice/:id",
    element: <AddRiceAdmin />,
  },
  {
    path: "/admin/manage-user",
    element: <ManageUser />,
  },
  {
    path: "/admin/sign-up",
    element: <SignUp />,
  },
  {
    path: "/view-rice/:id",
    element: <EditRiceAdmin />,
  },
  {
    path: "/admin/qr-scanner",
    element: <QRscanner />,
  },
  {
    path: "/admin/view-user/:id",
    element: <ViewUserAdmin />,
  },
  
];
