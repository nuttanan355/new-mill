import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { linkDB } from "../constant";

export default function Status() {

  const [rices, setRices] = useState({});
  const RicesReturn = Object.keys(rices).map((id) => rices[id].RiceReturn);

  const RiceRet = (ret) => {
    return RicesReturn.filter((rets) => rets == ret);
  };
  useEffect(() => {
    axios.get(linkDB   + "/rice").then((response) => setRices(response.data));
  }, []);
  return (
    <div>
      <h4>สถานะข้าว</h4>
      <div className="div-statu-all row">
        <div className="col div-statu">
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #CCFFFF, #66CCFF)",
              color: "black",
            }}
          >
            <Card.Body className=" text-center">
              <Card.Title className="div-statu-txt">{RicesReturn.length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right div-statu-txt">
              <Card.Text > ทั้งหมด </Card.Text>
            </Card.Footer>
          </Card>
        </div>

        <div className="col div-statu">
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #FFFFCC, #FF9933)",
              color: "Black",
            }}
          >
            <Card.Body className=" text-center">
              <Card.Title>{RiceRet("0").length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right div-statu-txt">
              <Card.Text> ข้าวที่ฝาก </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div className="col div-statu">
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #FFFFCC, #FF9933)",
              color: "Black",
            }}
          >
            <Card.Body className=" text-center">
              <Card.Title>{RiceRet("1").length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right div-statu-txt">
              <Card.Text > ข้าวขออนุมัติส่งคืน </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div className="col div-statu">
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #FFFFCC, #FF9933)",
              color: "Black",
            }}
          >
            <Card.Body className=" text-center">
              <Card.Title>{RiceRet("2").length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text> ส่งคืนแล้ว </Card.Text>
            </Card.Footer>
          </Card>
        </div>
      </div>
      {/* </Row> */}
    </div>
  );
}
