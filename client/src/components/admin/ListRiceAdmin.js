import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Tab, Nav } from "react-bootstrap";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { linkDB } from "../../constant";
import * as IconBs from "react-icons/bs";

export default function ListRiceAdmin() {
  const [rices, setRices] = useState({});
  const [result, setResult] = useState([]);
  const [respType, setRespType] = useState({});
  const [type, setType] = useState("");
  useEffect(() => {
    axios.get(linkDB + "/type").then((response) => setRespType(response.data));
    axios
      .get(linkDB + "/search/user-admin")
      .then((response) => setResult(response.data));
  }, []);

  useEffect(() => {
    axios
      .post(linkDB + "/rice", { type: type })
      .then((response) => setRices(response.data));
  }, [type]);

  console.log(type);

  const RicesReturn = Object.keys(rices).map((id) => rices[id].RiceReturn);

  const RiceRet = (ret) => {
    return RicesReturn.filter((rets) => rets == ret);
  };

  return (
    <div className="container mb-3">
      <div className="row">
        <h1 className="col-9">รายการข้าว</h1>
        <div className="flexboxtype col" style={{ display: "flex" }}>
          <select
            aria-label="Default select example"
            id="RicesType"
            name="RicesType"
            className="form-select type-size"
            required
            style={{ marginBottom: "20px" }}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">ทั้งหมด</option>
            {Object.keys(respType).map((item, keys) => {
              return (
                <option name="RicesType" key={keys} value={respType[item].type}>
                  {respType[item].type}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <hr />
      {rices.length !== 0  ? (
        <div className="mb-5 mt-2 pb-5">
          <Tab.Container id="top-tabs-example" defaultActiveKey="table">
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="table"  >
                  ข้าวทั้งหมด ({rices.length})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="table1" >
                  ข้าวที่ฝาก ({RiceRet("0").length})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="table2" >
                  ข้าวขออนุมัติส่งคืน ({RiceRet("1").length})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="table3" >
                  ข้าวส่งคืนแล้ว ({RiceRet("2").length})
                </Nav.Link>
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
                            // style={
                            //   rices[id].RiceReturn == "0"
                            //     ? { backgroundColor: "#86C8BC" }
                            //     : rices[id].RiceReturn == "1"
                            //     ? { backgroundColor: "#FFF6BD" }
                            //     : { backgroundColor: "#FFD4B2" }
                            // }
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
                                  <QRCodeCanvas
                                    value={
                                      "http://localhost:3000" +
                                      "/view-rice/" +
                                      rices[id].RiceID
                                    }
                                  />
                                </div>
                                <h6 className="card-text my-2">
                                  สถานะ :{" "}
                                  {rices[id].RiceReturn == "0"
                                    ? "กำลังฝาก"
                                    : rices[id].RiceReturn == "1"
                                    ? "รออนุมัติส่งคืน"
                                    : "ส่งคืนแล้ว"}
                                </h6>
                                <div>
                                  {result
                                    .filter((item) => {
                                      const uid = item.uid.toLowerCase();
                                      const uidRiDep =
                                        rices[id].RiceDepositor.toLowerCase();
                                      return uid.startsWith(uidRiDep);
                                    })
                                    .map((item, keys) => (
                                      <div className="name-depos" key={keys}>ผู้ฝาก : {item.name}</div>
                                    ))}
                                </div>
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
                      return rices[id].RiceReturn == "0" ? (
                        <div key={i} className="itemflex col-sm-4">
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
                                <div>
                                  {result
                                    .filter((item) => {
                                      const uid = item.uid.toLowerCase();
                                      const uidRiDep =
                                        rices[id].RiceDepositor.toLowerCase();
                                      return uid.startsWith(uidRiDep);
                                    })
                                    .map((item, keys) => (
                                      <h5 key={keys}>ผู้ฝาก : {item.name}</h5>
                                    ))}
                                </div>
                              </Row>
                            </Card.Body>
                          </Card>
                        </div>
                      ) : (
                        <div key={i} style={{ display: "none" }}></div>
                      );
                    })}
                  </div>
                </Tab.Pane>
                {/*  ข้าวขออนุมัติส่งคืน */}
                <Tab.Pane eventKey="table2">
                  <div
                    className="row g-2"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    {Object.keys(rices).map((id, i) => {
                      return rices[id].RiceReturn == "1" ? (
                        <div key={i} className="itemflex col-sm-4">
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
                                <div>
                                  {result
                                    .filter((item) => {
                                      const uid = item.uid.toLowerCase();
                                      const uidRiDep =
                                        rices[id].RiceDepositor.toLowerCase();
                                      return uid.startsWith(uidRiDep);
                                    })
                                    .map((item, keys) => (
                                      <h5 key={keys}>ผู้ฝาก : {item.name}</h5>
                                    ))}
                                </div>
                              </Row>
                            </Card.Body>
                          </Card>
                        </div>
                      ) : (
                        <div key={i} style={{ display: "none" }}></div>
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
                      return rices[id].RiceReturn == "2" ? (
                        <div key={i} className="itemflex col-sm-4">
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
                                <div>
                                  {result
                                    .filter((item) => {
                                      const uid = item.uid.toLowerCase();
                                      const uidRiDep =
                                        rices[id].RiceDepositor.toLowerCase();
                                      return uid.startsWith(uidRiDep);
                                    })
                                    .map((item, keys) => (
                                      <h5 key={keys}>ผู้ฝาก : {item.name}</h5>
                                    ))}
                                </div>
                              </Row>
                            </Card.Body>
                          </Card>
                        </div>
                      ) : (
                        <div key={i} style={{ display: "none" }}></div>
                      );
                    })}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </div>
      ) : (
        <div>ไม่รายการข้าว</div>
      )}
    </div>
  );
}
