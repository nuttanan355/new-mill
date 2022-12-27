import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { Container, Row } from "react-bootstrap";
import { linkDB } from "../../constant";

export default function UserListRice() {
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios.get(linkDB+"/rice").then((response) => {
      setValues(response.data);
    });
  }, []);

  return (
    <div className="mt-2 h-100">
      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        {Object.keys(values).map((id, index) => {
          return (
            <div
              key={index}
              className="itemflex col"
              style={{
                padding: "10px",
                maxWidth: "50%",
                marginTop: "0px",
                marginBottom: "0px",
                width: "30%",
              }}
            >
              <Card>
                <Card.Header
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {values[id].RiceCategory}
                </Card.Header>
                <Card.Body>
                  <Row>
                    <div
                      className="col container my-2 text-center"
                      style={{ marginLeft: "auto", marginRight: "auto" }}
                    >
                      <QRCodeCanvas value={values[id].RiceID} />
                    </div>
                  </Row>
                  <Card.Text>ผู้ฝาก : {values[id].RiceDepositor}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
