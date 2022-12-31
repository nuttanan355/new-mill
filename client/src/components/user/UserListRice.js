import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { Container, Row } from "react-bootstrap";
import { linkDB } from "../../constant";

export default function UserListRice() {
  const [values, setValues] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios.get(linkDB + "/rice").then((response) => {
      setValues(response.data);
    });

    axios.get(linkDB + "/search/user-admin").then((response) => {
      setResult(response.data);
    });
  }, []);

  return (
    <div className="mb-5 mt-2">
      <div className="row g-4" style={{ display: "flex", flexWrap: "wrap" }}>
        {Object.keys(values).map((id, index) => {
          return (
            <div
              key={index}
              className="itemflex col-sm-3"
              // style={{
              //   padding: "10px",
              //   maxWidth: "50%",
              //   marginTop: "0px",
              //   marginBottom: "0px",
              //   width: "30%",
              // }}
            >
              <Card
                className="div-btn"
                variant="warning"
                data-toggle="tooltip"
                data-placement="bottom"
                title="ตรวจรายการข้าวนี้"
                onClick={() =>
                  (window.location.href = `/user/view-rice/${values[id].RiceID}`)
                }
              >
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
                  {/* <Card.Text>ผู้ฝาก : {values[id].RiceDepositor}</Card.Text> */}
                  <div>
                    {" "}
                    {result
                      .filter((item) => {
                        const uid = item.uid.toLowerCase();
                        const uidRiDep = values[id].RiceDepositor.toLowerCase();
                        return uid.startsWith(uidRiDep);
                      })
                      .map((item, keys) => (
                        <Card.Text key={keys}>
                          ผู้ฝาก : {item.name}
                        </Card.Text>
                      ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
