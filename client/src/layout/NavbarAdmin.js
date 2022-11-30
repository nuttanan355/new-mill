import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Offcanvas, FormControl, InputGroup, Form, FormLabel } from "react-bootstrap";
import SignOut from "../components/login/SignOut";

import axios from 'axios';
import { LinkDB } from '../LinkDB'


// const rice = require('./route')

function NavbarAdmin() {
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
    axios.get('http://localhost:3030/searchriceadmin').then((response) => {
      setResult(response.data);
      // console.log(` ${result} => result`)
    });
  }, [])

  return (


    <div>
      <Navbar expand={false} style={{ backgroundColor: "#019267" }} >
        <Container fluid >
          <Navbar.Brand  >
            Mill Project
          </Navbar.Brand>

          <Navbar.Collapse>

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

              <Nav.Link className="item-nav-admin-logout" onClick={() => SignOut()}>
                <span className="no-icon">Log out</span>
              </Nav.Link>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar >
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
              <li class="nav-item">
                <div className="search-container">
                  <div className="search-inner ">
                    <input type="text" value={value} onChange={onChange} />
                    <button className="btn bg-light" onClick={() => onSearch(value)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="dropdown ">
                    {result.filter(
                      item => {
                        const searchTerm = value.toLowerCase();
                        const RiceCategory = item.RiceCategory.toLowerCase();
                        return searchTerm && RiceCategory !== searchTerm && RiceCategory.startsWith(searchTerm)
                      }
                    ).map((item) => (
                      <div key={item.RiceID} className="dropdown-row" onClick={() => onSearch(item.RiceCategory)}>
                        {/* <div className="fs-6">{item.RiceCategory}</div>
                       */}
                        {item.RiceCategory}
                        <div className="dropdown-id">{item.RiceID}</div>

                      </div>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div >


  );
}
export default NavbarAdmin;
