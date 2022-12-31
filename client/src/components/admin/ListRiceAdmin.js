import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { linkDB } from "../../constant";
import * as IconBs from "react-icons/bs";

export default function ListRiceAdmin() {
  const [values, setValues] = useState({});
  const [result, setResult] = useState([]);

  const RicesReturn = Object.keys(values).map((id) => values[id].RiceReturn);
  const RiceRet = (ret) => {
    return RicesReturn.filter((rets) => rets == ret);
  };

  useEffect(() => {
    axios.get(linkDB + "/rice").then((response) => {
      setValues(response.data);
    });

    axios.get(linkDB + "/search/user-admin").then((response) => {
      setResult(response.data);
    });

  }, []);

  return (
    <div className="container">
      <Row className="mt-3 mb-4 p-2">
        <Col>
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #CCFFFF, #66CCFF)",
              color: "black",
            }}
          >
            <Card.Body className=" text-center">
              <Card.Title>{RiceRet('2').length} </Card.Title>
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
              <Card.Title>{RiceRet('0').length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text> ยังไม่ส่งคืน </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <hr />
      <div className="mb-5 mt-2">
        <div className="row g-4" style={{ display: "flex", flexWrap: "wrap" }}>
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
                    (window.location.href = `/admin/edit-rice/${values[id].RiceID}`)
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

                    <div> {
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
        </div>
      </div>
    </div>
  );
}
