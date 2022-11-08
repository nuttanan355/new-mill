import React from 'react';

import NotFound from "../error_404";
import HomeUser from '../components/user/HomeUser';
import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";

export const RouterNoLogin =[
    {
        path:"*",
        element:<NotFound/>
    },
    {
        path:"/",
        element:<HomeUser/>
    },
    {
        path: "/user/sign-up",
        element: <SignUp />,
      },
      {
        path: "/user/sign-in",
        element: <SignIn />,
      },
    
];