import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./css/App.css";

import { RouterAdmin } from "./pages/RouterAdmin";
import NavbarAdmin from "./layout/NavbarAdmin";

import { RouterUser } from "./pages/RouterUser";
import { RouterNoLogin } from "./pages/RouterNoLogin";

import Footer from "./layout/Footer";
import NavbarIndex from "./layout/NavbarIndex";

function App() {
  const [admin, setAdmin] = useState();
 
  console.log(admin);
  useEffect(() => {
    setAdmin('NoLogin');
  }, []);

  return (
    <div>
      {admin === "Admin" ? (
        <>
          <NavbarAdmin />
          <Routes>
            {RouterAdmin.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />;
            })}
          </Routes>
        </>
      ) : admin === "User" ? (
        <>
          <NavbarIndex />
          <Routes>
            {RouterUser.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />;
            })}
          </Routes>
          <Footer />
        </>
      ) : admin === "NoLogin" ? (
        <>
          <NavbarIndex />
          <Routes>
            {RouterNoLogin.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />;
            })}
          </Routes>
          <Footer />
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
