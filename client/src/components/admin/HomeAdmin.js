import React from "react";
import { Button, Container } from "react-bootstrap";
import ListRiceAdmin from "./ListRiceAdmin";
import { Link } from "@mui/material";
import * as IconMd from "react-icons/md";
import Dashboard from "../../layout/Dashboard";

export default function HomeAdmin() {
  return (
    <div className="container mt-3" >
      <div className="text-center">
        <Button
          className=" btn-scan my-2 "
          data-toggle="tooltip"
          data-placement="bottom"
          title="สแกนเพื่อค้นหารายการข้าว"
          variant="outline-secondary"
          style={{ border: "1px solid lightgray" }}
          onClick={() => (window.location.href = "admin/qr-scanner")}
        >
          <IconMd.MdOutlineQrCodeScanner
            style={{ height: 240, width: 320, color: "black" }}
          />
        </Button>
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
          <h1>Dashboard</h1>
          <hr />
          <Dashboard />
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
