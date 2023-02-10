import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Tab, Nav } from "react-bootstrap";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { linkDB } from "../../constant";
import * as IconBs from "react-icons/bs";

export default function ListRiceAdmin() {
  const [rices, setRices] = useState({});
  const [result, setResult] = useState([]);

  const RicesReturn = Object.keys(rices).map((id) => rices[id].RiceReturn);
  
  const RiceRet = (ret) => {
    return RicesReturn.filter((rets) => rets == ret);
  };

  useEffect(() => {
    axios.get(linkDB + "/rice").then((response) => {
      setRices(response.data);
    });

    axios.get(linkDB + "/search/user-admin").then((response) => {
      setResult(response.data);
    });
  }, []);

  return (
    <div className="container mb-3">
      <Row className="mt-3 mb-3 p-2">
        <Col>
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #CCFFFF, #66CCFF)",
              color: "black",
            }}
          >
            <Card.Body className=" text-center">
              <Card.Title>{RiceRet("2").length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text> ส่งคืนแล้ว </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #FFFFCC, #FF9933)",
              color: "Black",
            }}
          >
            <Card.Body className=" text-center">
              <Card.Title>{RiceRet("0").length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text> ยังไม่ส่งคืน </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <hr />
      <div className="mb-5 mt-2 pb-5">
        {/* <div className="row g-4" style={{ display: "flex", flexWrap: "wrap" }}>
          {Object.keys(values).map((id, i) => {
            return (
              <div key={i} className="itemflex col-sm-3">
                <Card
                  className="div-btn"
                  variant="warning"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="ตรวจรายการข้าวนี้"
                  onClick={() =>
                    (window.location.href = `/view-rice/${values[id].RiceID}`)
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
                      <div className="col-9">{values[id].RiceCategory}</div>
                      <Button className=" delete-admin-btn col mx-1"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="ลบรายการข้าวนี้"
                        variant="outline-danger"
                  style={{border:"1px solid lightgray"}}

                        // onClick={() => onDelete(id)}>
                      >
                        <IconBs.BsFillTrashFill />
                      </Button>
                    </div>
                   
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
                    {/* <Row className="row g-2 text-center"> */}
        {/* {values[id].RiceReturn ? (
                        <></>
                      ) : (
                        <>
                          <Button
                            type="button"
                           >
                            <IconBs.BsStack />
                          </Button>

                          <Button
                            type="button"
                            className="edit-admin-btn col mx-1"
                            variant="success"
                            data-toggle="tooltip" 
                            data-placement="bottom" 
                            title="ขอล่งคืนรายการข้าวนี้"
                            // onClick={() => onRiceReturn(id)}
                          >
                            <IconBs.BsSaveFill />
                          </Button>
                        </>
                      )} */}

        {/* <Button
                        type="button"
                        className=" delete-admin-btn col mx-1"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="ลบรายการข้าวนี้"
                        variant="danger"
                        // onClick={() => onDelete(id)}>
                      >
                        <IconBs.BsFillTrashFill />
                      </Button> */}
        {/* </Row> */}

        {/* <div> {
                    result.filter((item)=>{
                      const uid = item.uid.toLowerCase();
                      const uidRiDep =values[id].RiceDepositor.toLowerCase();
                      return uid.startsWith(uidRiDep)
                    }) .map((item, keys) => (
                      <Card.Text key={keys}>
                          ผู้ฝาก : {item.name}
                      </Card.Text>
                    ))
                    }</div>


                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div> */}
        <Tab.Container id="top-tabs-example" defaultActiveKey="table">
        <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="table">ข้าวทั้งหมด ({rices.length})</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="table1">ข้าวที่ฝาก ({RiceRet('0').length})</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="table3">ข้าวส่งคืนแล้ว ({RiceRet('2').length})</Nav.Link>
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
                  {/* <div style={{backgroundColor:'#fff'}} display={'hidden'} >55 </div> */}
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
                                <QRCodeCanvas value={"http://localhost:3000"+"/view-rice/"+rices[id].RiceID} />
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
                                    <h5 key={keys}>
                                      ผู้ฝาก : {item.name}
                                    </h5>
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
                    return (
                        rices[id].RiceReturn == "0" ? (
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
                                    <h5 key={keys}>
                                      ผู้ฝาก : {item.name}
                                    </h5>
                                  ))}
                              </div>
                              </Row>
                            </Card.Body>
                          </Card>
                          </div>
                        ) : (
                          <div key={i} ></div>
                        )
                      
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
                            rices[id].RiceReturn == "2" ? (
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
                                        <h5 key={keys}>
                                          ผู้ฝาก : {item.name}
                                        </h5>
                                      ))}
                                  </div>
                                  </Row>
                                </Card.Body>
                              </Card>
                              </div>
                            ) : (
                              <div key={i} ></div>
                            )
                          
                        );
                  })}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    </div>
  );
}
