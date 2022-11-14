// import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";

import { Link } from 'react-router-dom'

import signin from "../components/login/SignIn"
// import { firebaseAuth } from "../server_firebase/firebase";

function NavbarIndex() {
  const [user, setUser] = useState(null);
  useEffect(() => { }, [])

  return (
    <div>
      <Navbar expand={false} style={{ backgroundColor: "#019267" }}>
        <Container fluid>

          <Navbar.Brand href="/" style={{ fontSize: "1.5rem", }}>Mill Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">

            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="justify-content-end flex-grow-1 p-4">
              <Nav.Link className="item-nav" href="/">Home</Nav.Link>
              {user ? (
                <>
                  <Nav.Link className="item-nav" href="/user/my-rice" >My Rice</Nav.Link>
                  <Nav.Link className="item-nav"
                    onClick={() => { }}>
                    <span className="no-icon">Log out</span>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link className="item-nav" href="/user/sign-in">
                  <span className="no-icon">Login</span>
                </Nav.Link>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavbarIndex;
