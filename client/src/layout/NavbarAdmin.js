import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import SignOut from "../components/login/SignOut";


// const rice = require('./route')

function NavbarAdmin() {
  const [login, setLogin] = useState();
  useEffect(() => { }, [])
  return (


    <div>


      <Navbar expand={false} style={{ backgroundColor: "#019267" }}>
        <Container fluid>
          <Navbar.Brand href="/">Mill Project</Navbar.Brand>
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
              <Nav.Link className="item-nav-admin" href="/admin/add-rice">
                Add Rice
              </Nav.Link>
              <Nav.Link className="item-nav-admin" href="/admin/manage-user">
                Manage User
              </Nav.Link>
              <Nav.Link className="item-nav-admin" href="/admin/qr-scanner">
                Scan QR
              </Nav.Link>
              
              <Nav.Link className="item-nav-admin-logout" onClick={() =>SignOut()}>
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
