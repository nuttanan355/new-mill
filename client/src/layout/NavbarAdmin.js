import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import SignOut from "../components/login/SignOut";

import axios from "axios";
import { linkDB } from "../constant";

// const rice = require('./route')

function NavbarAdmin() {
  const [login, setLogin] = useState();

  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
  };

  useEffect(() => {
    axios.get(linkDB + "/search/user-admin").then((response) => {
      setResult(response.data);
      // console.log(` ${result} => result`)
    });
  }, []);

  return (
    <div>
      <Navbar expand={false} style={{ backgroundColor: "#019267" }}>
        <Container fluid>
          <Navbar.Brand href="/">Mill Project</Navbar.Brand>

          <Navbar.Text>
            <Nav.Item className="item-nav-admin">
              <div className="search-container">
                <div className="search-inner input-group">
                  <input
                    placeholder="ผู้ใช้งานระบบ..."
                    type="text"
                    className="form-control response"
                    value={value}
                    onChange={onChange}
                    // size="100rsm"
                  />
                  <span
                    className="input-group-text"
                    id="basic-addon2"
                    onClick={() => onSearch(value)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </span>
                </div>
                <div className="dropdown mt-5 w-20" style={{position:'absolute',background:'red'}}>
                  {result
                    .filter((item) => {
                      // phone,memberNum,name
                      const searchTerm = value.toLowerCase();
                      const phone = item.phone.toLowerCase();
                      const memberNum = item.memberNum.toLowerCase();
                      const name = item.name.toLowerCase();

                      // return searchTerm && RiceCategory !== searchTerm && RiceCategory.startsWith(searchTerm)
                      return (
                        (searchTerm &&
                          phone &&
                          phone.startsWith(searchTerm) &&
                          phone !== searchTerm) ||
                        (searchTerm &&
                          memberNum &&
                          memberNum !== searchTerm &&
                          memberNum.startsWith(searchTerm)) ||
                        (searchTerm &&
                          name &&
                          name !== searchTerm &&
                          name.startsWith(searchTerm))
                      );
                    })
                    .map((item, keys) => (
            
                      <div
                        key={keys}
                        className="dropdown-row"
                        style={{position:'relative'}}
                        onClick={() => window.location.href = `/admin/view-user/${item.uid}`}
                      >
                        <div className="dropdown-id text-muted">
                          <div className="row justify-content-center align-items-center g-2">
                            <p className="col">{item.name}</p>
                            <path className="col">{item.memberNum}</path>
                          </div>       
                        </div>

                      </div>
                    ))}
                </div>
              </div>
            </Nav.Item>
          </Navbar.Text>

          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link className="item-nav-admin" href="/">
                Home
              </Nav.Link>
              {/* <Nav.Link className="item-nav-admin" href="/admin/add-rice">
                Add Rice
              </Nav.Link> */}
              <Nav.Link className="item-nav-admin" href="/admin/manage-user">
                Manage User
              </Nav.Link>
              <Nav.Link className="item-nav-admin" href="/admin/qr-scanner">
                Scan QR
              </Nav.Link>

              <Nav.Link
                className="item-nav-admin-logout"
                onClick={() => SignOut()}
              >
                <span className="no-icon">Log out</span>
              </Nav.Link>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavbarAdmin;
