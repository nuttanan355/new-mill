import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./css/App.css";

import { RouterAdmin } from "./pages/RouterAdmin";
import NavbarAdmin from "./layout/NavbarAdmin";

import { RouterUser } from "./pages/RouterUser";
import { RouterNoLogin } from "./pages/RouterNoLogin";

import NavbarIndex from "./layout/NavbarIndex";
import "charts.css";
import { Layout, Space } from 'antd';


function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const type = localStorage.getItem("type");
    // console.log(type);
    if (type !== null) {
      setAdmin(type);
    } else {
      setAdmin("NoLogin");
    }
  }, []);

  return (
    <div className="div-main">
      {/* <div style={{backgroundColor:"#FFFBE9"}}> */}
      {admin === "Admin" ? (
        <>
        {/* <Layout.Header> */}
        <NavbarAdmin />
        {/* </Layout.Header>
        <Layout.Sider>

        </Layout.Sider>
          <Layout.Content> */}
          <Routes>
            {RouterAdmin.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />;
            })}
          </Routes>
          {/* </Layout.Content> */}
          {/* <Header />
          <MenuAdmin />
          <div className="content-wrapper">
            <Routes>
              {RouterAdmin.map(({ path, element }, key) => {
                return <Route index path={path} element={element} key={key} />;
              })}
            </Routes>
          </div>
          <Footer /> */}

          {/* <Footer /> */}
        </>
      ) : admin === "User" ? (
        <>
          <NavbarIndex />
          <Routes>
            {RouterUser.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />;
            })}
          </Routes>
          {/* <Footer /> */}
        </>
      ) : admin === "NoLogin" ? (
        <>
          <NavbarIndex />
          <Routes>
            {RouterNoLogin.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />;
            })}
          </Routes>
          {/* <Footer /> */}
        </>
      ) : (
        <div className="wait-spinner">
          <Spinner animation="border" variant="success" />
        </div>
      )}
    </div>
  );
}

export default App;
