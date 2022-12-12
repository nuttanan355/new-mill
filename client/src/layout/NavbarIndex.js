// import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Offcanvas, FormControl, InputGroup, Form, FormLabel } from "react-bootstrap";
import SignOut from "../components/login/SignOut";
import axios from 'axios';

// import { firebaseAuth } from "../server_firebase/firebase";

function NavbarIndex() {
  const [user, setUser] = useState(null);



  useEffect(() => {
    var token = localStorage.getItem("token");
    // console.log(token);
    setUser(token);
  }, []);


  const [login, setLogin] = useState();

  const [value, setValue] = useState('');
  const [result, setResult] = useState([]);

  const onChange = (event) => {
    setValue(event.target.value);
  }

  const onSearch = (searchTerm) => {
    // console.log(searchTerm);
    setValue(searchTerm);
  }

  useEffect(() => {
    axios.post('http://localhost:3030/searchriceuser', { uid: user }
    ).then((response) => {
      setResult(response.data);
      // console.log(` ${result} => result`)
    });
  }, [])

  return (
    <div>
      <Navbar expand={false} style={{ backgroundColor: "#019267" }}>
        <Container fluid>
          <Navbar.Brand href="/" style={{ fontSize: "1.5rem" }}>
            Mill Project
          </Navbar.Brand>
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
                  <Nav.Item className="item-nav-admin">
                    <div className="search-container">
                      <div className="search-inner input-group">
                        <input placeholder="ค้นหาข้าว.." type="text" className="form-control" value={value} onChange={onChange} />
                        <span class="input-group-text" id="basic-addon2" onClick={() => onSearch(value)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                          </svg>
                        </span>
                      </div>
                      <div className="dropdown">
                        {result.filter(
                          item => {
                            const searchTerm = value.toLowerCase();
                            const RiceCategory = item.RiceCategory.toLowerCase();
                            const RiceID = item.RiceID.toLowerCase();
                            // return searchTerm && RiceCategory !== searchTerm && RiceCategory.startsWith(searchTerm) 
                            return searchTerm && RiceID && RiceID.startsWith(searchTerm) && RiceID !== searchTerm ||
                              searchTerm && RiceCategory && RiceCategory !== searchTerm && RiceCategory.startsWith(searchTerm)
                          }
                        ).map((item) => (
                          <div key={item.RiceID} className="dropdown-row" onClick={() => onSearch(item.RiceCategory)}>
                            {/* <div className="fs-6">{item.RiceCategory}</div>
                       */}
                            {item.RiceCategory}
                            <div className="dropdown-id text-muted">{item.RiceID}</div>

                          </div>
                        ))}
                      </div>
                    </div>
                  </Nav.Item>
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
