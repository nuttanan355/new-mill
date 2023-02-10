import React from "react";

import NotFound from "../error_404";
import HomeUser from "../components/user/HomeUser";
import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";
import MyRice from "../components/user/MyRice";
import ViewRice from "../components/user/ViewRice";

export const RouterUser = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <HomeUser />,
  },
  {
    path: "/user/my-rice",
    element: <MyRice />,
  },
  {
    path: "/user/sign-up",
    element: <SignUp />,
  },
  {
    path: "/user/sign-in",
    element: <SignIn />,
  },
  {
    path: "/view-rice/:id",
    element: <ViewRice />,
  },

];
