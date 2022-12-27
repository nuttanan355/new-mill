// import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Offcanvas, FormControl, InputGroup, Form, FormLabel } from "react-bootstrap";
import SignOut from "../components/login/SignOut";
import axios from 'axios';
import { linkDB } from "../constant";

// import { firebaseAuth } from "../server_firebase/firebase";

function NavbarIndex() {
  const [user, setUser] = useState(null);



  useEffect(() => {
    var token = localStorage.getItem("token");
    // console.log(token);
    setUser(token);
  }, []);


  // const [login, setLogin] = useState();

  // const [value, setValue] = useState('');
  // const [result, setResult] = useState([]);

  // const onChange = (event) => {
  //   setValue(event.target.value);
  // }

  // const onSearch = (searchTerm) => {
  //   // console.log(searchTerm);
  //   setValue(searchTerm);
  // }

  // useEffect(() => {
  //   axios.post(linkDB+'/searchriceuser', { uid: user }
  //   ).then((response) => {
  //     setResult(response.data);
  //     // console.log(` ${result} => result`)
  //   });
  // }, [])

  return (
    <div>
      <Navbar expand={false} style={{ backgroundColor: "#019267" }}>
        <Container fluid>
          <Navbar.Brand href="/" style={{ fontSize: "1.5rem" }}>
            Mill Project
          </Navbar.Brand>
          <Navbar.Collapse className="item-nav-admin">  
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="justify-content-end flex-grow-1 p-4">
              <Nav.Link className="item-nav" href="/">
                Home
              </Nav.Link>
              {user ? (
                <>
                  <Nav.Link className="item-nav" href="/user/my-rice">
                    My Rice
                  </Nav.Link>
                  <Nav.Link className="item-nav" onClick={() => SignOut()}>
                    <span className="no-icon">Log out</span>
                  </Nav.Link>
                  <Nav.Link className="item-nav">
                    <span className="no-icon" id="uid">#</span>
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
