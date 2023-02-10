import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";
import { Button, Card, Row, Tab, Nav } from "react-bootstrap";
import * as IconBs from "react-icons/bs";
import { linkDB } from "../../constant";
import Swal from "sweetalert2";

export default function MyRice() {
  const uid = localStorage.getItem("uid");

  const [myUser, setMyUser] = useState({});
  const [rices, setRices] = useState({});
  const RiceQuantity = [];

  useEffect(() => {
    axios.post(linkDB + "/user/my-rice", { uid: uid }).then((response) => {
      setMyUser(response.data[0]);
    });

    axios
      .post(linkDB + "/rice/my-rice", { RiceDepositor: uid })
      .then((response) => {
        console.log(response.data);
        setRices(response.data);
      })
      .catch((err) => {
        setRices();
        console.log(err);
      });
  }, [uid]);

  // const AllRice = Object.keys(rices).map((id) => rices[id].RiceQuantity);

  const sum = () =>
    rices.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue.RiceQuantity, 10);
    }, 0);

  console.log(rices);
  //  console.log(values);

  const onUpReturn = (id, reRice) => {
    Swal.fire({
      title: "คุณต้องการส่งคืนข้าว ?",
      // showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: "ไม่",
      confirmButtonText: "ใช่",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          axios
            .put(linkDB + `/rice/update-return/${id}/${reRice}`)
            .then(() => {
              window.location.reload(false);
            })
            .catch((err) => {
              // setRices();
              console.log(err);
            });
        });
      }
    });
  };
  const onUpReturn1 = (id, reRice) => {
    Swal.fire({
      title: "คุณต้องการส่งคืนข้าว ?",
      // showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: "ไม่",
      confirmButtonText: "ใช่",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          axios
            .put(linkDB + `/rice/update-return/${id}/${reRice}`)
            .then(() => {
              window.location.reload(false);
            })
            .catch((err) => {
              // setRices();
              console.log(err);
            });
        });
      }
    });
  };

  return (
    <div className="container pt-5 pb-5">
      <h1>My Rices</h1>
      <div className="card mb-3 mt-5" style={{ backgroundColor: "white" }}>
        <div className="card-body">
          <h2 className="card-title">คุณ {myUser.name}</h2>
          <h5 className="card-title my-2"></h5>
          <h6 className="card-text my-2">หมายเลขสมาชิก : {myUser.memberNum}</h6>
          <h6 className="card-text my-2">เบอร์โทร : {myUser.phone}</h6>

          <div className="row justify-content-center align-items-center g-2 my-2">
            <p className="col card-text" style={{ color: "blue" }}>
              จำนวนข้าวที่ฝาก : {rices.length ? rices.length : " - "}
            </p>
            <p className="col card-text" style={{ color: "red" }}>
              ปริมาณข้าวที่ฝาก : {rices.length ? sum() : " - "}
            </p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center align-items-center g-1 mt-5 mb-2">
        <h5 className="col">รายการข้าว</h5>
      </div>

      {rices.length !== 0 ? (
        <div className="mb-5 mt-2">
          <div className="container">
            <Tab.Container id="top-tabs-example" defaultActiveKey="table">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="table">ข้าวทั้งหมด</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="table1">ข้าวที่ฝาก</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="table2">ข้าวขอส่งคืน</Nav.Link>
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
                              //
                            >
                              <Card.Header
                                style={{
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                }}
                              >
                                <div className="row justify-content-center align-items-center g-2">
                                  <div className="col-9 my-3">
                                    {rices[id].RiceCategory}
                                  </div>
                                  {rices[id].RiceReturn == "0" ? (
                                    <Button
                                      className=" delete-admin-btn col"
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="ขอส่งคืน"
                                      variant="outline-success"
                                      style={{ border: "1px solid lightgray" }}
                                      onClick={() =>
                                        onUpReturn(rices[id].RiceID, "1")
                                      }
                                    >
                                      <IconBs.BsArrowClockwise />
                                    </Button>
                                  ) : (
                                    <div className=" delete-admin-btn col"></div>
                                  )}
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
                                    <div className="col-9 my-3">
                                      {rices[id].RiceCategory}
                                    </div>
                                    {rices[id].RiceReturn == "0" ? (
                                      <Button
                                        className=" delete-admin-btn col"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="ขอส่งคืน"
                                        variant="outline-success"
                                        style={{
                                          border: "1px solid lightgray",
                                        }}
                                        onClick={() =>
                                          onUpReturn(rices[id].RiceID, "1")
                                        }
                                      >
                                        <IconBs.BsArrowClockwise />
                                      </Button>
                                    ) : (
                                      <div className=" delete-admin-btn col"></div>
                                    )}
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

                  {/*  ข้าวขอส่งคืน */}
                  <Tab.Pane eventKey="table2">
                    <div
                      className="row g-2"
                      style={{ display: "flex", flexWrap: "wrap" }}
                    >
                      {Object.keys(rices).map((id, i) => {
                        return (
                          <div key={i} className="itemflex col-sm-4">
                            {rices[id].RiceReturn == "1" ? (
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
                                    <div className="col-9 my-3">
                                      {rices[id].RiceCategory}
                                    </div>
                                    {rices[id].RiceReturn == "0" ? (
                                      <Button
                                        className=" delete-admin-btn col"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="ขอส่งคืน"
                                        variant="outline-success"
                                        style={{
                                          border: "1px solid lightgray",
                                        }}
                                        onClick={() =>
                                          onUpReturn(rices[id].RiceID, "1")
                                        }
                                      >
                                        <IconBs.BsArrowClockwise />
                                      </Button>
                                    ) : (
                                      <div className=" delete-admin-btn col"></div>
                                    )}
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
                                    <div className="col-9 my-3">
                                      {rices[id].RiceCategory}
                                    </div>
                                    {rices[id].RiceReturn == "0" ? (
                                      <Button
                                        className=" delete-admin-btn col"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="ขอส่งคืน"
                                        variant="outline-success"
                                        style={{
                                          border: "1px solid lightgray",
                                        }}
                                        onClick={() =>
                                          onUpReturn(rices[id].RiceID, "1")
                                        }
                                      >
                                        <IconBs.BsArrowClockwise />
                                      </Button>
                                    ) : (
                                      <div className=" delete-admin-btn col"></div>
                                    )}
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
        </div>
      ) : (
        <div
          className="text-center p-5"
          style={{ height: "300px", background: "#FFFF" }}
        >
          <h2>ไม่มีรายการข้าว</h2>
        </div>
      )}
    </div>
  );
}
