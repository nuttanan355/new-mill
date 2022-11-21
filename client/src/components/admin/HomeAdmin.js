import React from "react";
import { Container } from "react-bootstrap";
import ListRiceAdmin from "./ListRiceAdmin";
import { Link } from "@mui/material";
import * as IconMd from "react-icons/md";
import Dashbord from "./Dashbord";

export default function HomeAdmin() {
  return (
    <div className="container mt-3">
      <h3>Scan QR</h3>
      <hr />
      <div className="text-center">
        <Link className="mb-5 btn btn-outline-info" href="admin/qr-scanner">
          <IconMd.MdOutlineQrCodeScanner
            style={{ height: 240, width: 320, color: "black" }}
          />
        </Link>
      </div>

      <Container>
        {/* <h1>List Users</h1>
          <hr />
          
            <Card
              style={{
                backgroundImage: "linear-gradient(to right, #00DE32, #038905)",
                color: "white",
              }}
            >
              <Card.Body className=" text-center">
                <Card.Title>{AllUsers.length} </Card.Title>
              </Card.Body>
              <Card.Footer className="text-right">
                <Card.Text> ALL USER </Card.Text>
              </Card.Footer>
            </Card> */}
        <div className="mt-3">
          <h1>Dashbord</h1>
          <hr />
          <Dashbord />
        </div>

        <div className="mt-3">
          <h1>รายการข้าว</h1>
          <hr />
          <ListRiceAdmin />
        </div>
      </Container>
    </div>
  );
}
