import React from "react";
import { Button, Container } from "react-bootstrap";
import ListRiceAdmin from "./ListRiceAdmin";
import * as IconMd from "react-icons/md";
import Dashboard from "../../layout/Dashboard";
import Status from "../../layout/Status";

export default function HomeAdmin() {
  return (
    <div className="container pt-3 home-admin">
      <div className="text-center btn-scan">
        <Button
          className=" btn-scan "
          data-toggle="tooltip"
          data-placement="bottom"
          title="สแกนเพื่อค้นหารายการข้าว"
          variant="outline-secondary"
          onClick={() => (window.location.href = "admin/qr-scanner")}
        >
          <IconMd.MdOutlineQrCodeScanner
            style={{ height: "100%", width: "100%", color: "black" }}
          />
        </Button>
      </div>

      <Container>
        <div className="mt-3">
          <h1>ปริมาณข้าว</h1>
          <hr />
          <div style={{ alignItems: "center" }} className="row div-dashbord ">
            <Dashboard />
          </div>

          {/* <Status /> */}
        </div>

        <div className="mt-3">
         
          <ListRiceAdmin />
        </div>
      </Container>
    </div>
  );
}
