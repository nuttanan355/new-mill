import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { Button, Row, Tab, Nav } from "react-bootstrap";
import { linkDB } from "../../constant";

export default function UserListRice() {
  const [rices, setRices] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios.get(linkDB + "/rice").then((response) => {
      setRices(response.data);
    });

    axios.get(linkDB + "/search/user-admin").then((response) => {
      setResult(response.data);
    });
  }, []);

  return (
    <div className="mb-5 mt-2">
      <Tab.Container id="top-tabs-example" defaultActiveKey="table">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="table">ข้าวทั้งหมด</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="table1">ข้าวที่ฝาก</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="table3">ข้าวส่งคืนแล้ว</Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="mt-3">
          <Tab.Content>
            {/*  ข้าวทั้งหมด */}
            <Tab.Pane eventKey="table">
              <div
                className="row g-2"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {Object.keys(rices).map((id, i) => {
                  return (
                    <div key={i} className="itemflex col-sm-4">
                               <Card
                          className="div-btn"
                          variant="warning"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="ตรวจรายการข้าวนี้"
                          style={
                            rices[id].RiceReturn == "0"
                              ? { backgroundColor: "#86C8BC" }
                              : rices[id].RiceReturn == "1"
                              ? { backgroundColor: "#FFF6BD" }
                              : { backgroundColor: "#FFD4B2" }
                          }
                        >
                          <Card.Header
                            style={{
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            <div className="row justify-content-center align-items-center g-2">
                              <div className="col my-3">
                                {rices[id].RiceCategory}
                              </div>
                            </div>
                          </Card.Header>
                          <Card.Body
                            onClick={() =>
                              (window.location.href = `/view-rice/${rices[id].RiceID}`)
                            }
                          >
                            <Row>
                              <div
                                className="col container my-2 text-center"
                                style={{
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                }}
                              >
                                <QRCodeCanvas value={rices[id].RiceID} />
                              </div>
                              <h6 className="card-text my-2">
                                สถานะ :{" "}
                                {rices[id].RiceReturn == "0"
                                  ? "กำลังฝาก"
                                  : rices[id].RiceReturn == "1"
                                  ? "รออนุมัติส่งคืน"
                                  : "ส่งคืนแล้ว"}
                              </h6>
                            </Row>
                          </Card.Body>
                        </Card>
                    </div>
                  );
                })}
              </div>
            </Tab.Pane>

            {/*  ข้าวที่ฝาก */}
            <Tab.Pane eventKey="table1">
              <div
                className="row g-2"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {Object.keys(rices).map((id, i) => {
                  return (
                    <div key={i} className="itemflex col-sm-4">
                      {rices[id].RiceReturn == "0" ? (
                                <Card
                                className="div-btn"
                                variant="warning"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="ตรวจรายการข้าวนี้"
                              >
                                <Card.Header
                                  style={{
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                  }}
                                >
                                  <div className="row justify-content-center align-items-center g-2">
                                    <div className="col my-3">
                                      {rices[id].RiceCategory}
                                    </div>
                                  </div>
                                </Card.Header>
                                <Card.Body
                                  onClick={() =>
                                    (window.location.href = `/view-rice/${rices[id].RiceID}`)
                                  }
                                >
                                  <Row>
                                    <div
                                      className="col container my-2 text-center"
                                      style={{
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                      }}
                                    >
                                      <QRCodeCanvas value={rices[id].RiceID} />
                                    </div>
                                    <h6 className="card-text my-2">
                                      สถานะ :{" "}
                                      {rices[id].RiceReturn == "0"
                                        ? "กำลังฝาก"
                                        : rices[id].RiceReturn == "1"
                                        ? "รออนุมัติส่งคืน"
                                        : "ส่งคืนแล้ว"}
                                    </h6>
                                  </Row>
                                </Card.Body>
                              </Card>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            </Tab.Pane>

            {/*  ข้าวส่งคืนแล้ว */}
            <Tab.Pane eventKey="table3">
              <div
                className="row g-2"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {Object.keys(rices).map((id, i) => {
                  return (
                    <div key={i} className="itemflex col-sm-4">
                      {rices[id].RiceReturn == "2" ? (
                        <Card
                          className="div-btn"
                          variant="warning"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="ตรวจรายการข้าวนี้"
                        >
                          <Card.Header
                            style={{
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            <div className="row justify-content-center align-items-center g-2">
                              <div className="col my-3">
                                {rices[id].RiceCategory}
                              </div>
                            </div>
                          </Card.Header>
                          <Card.Body
                            onClick={() =>
                              (window.location.href = `/view-rice/${rices[id].RiceID}`)
                            }
                          >
                            <Row>
                              <div
                                className="col container my-2 text-center"
                                style={{
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                }}
                              >
                                <QRCodeCanvas value={rices[id].RiceID} />
                              </div>
                              <h6 className="card-text my-2">
                                สถานะ :{" "}
                                {rices[id].RiceReturn == "0"
                                  ? "กำลังฝาก"
                                  : rices[id].RiceReturn == "1"
                                  ? "รออนุมัติส่งคืน"
                                  : "ส่งคืนแล้ว"}
                              </h6>
                            </Row>
                          </Card.Body>
                        </Card>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
}
