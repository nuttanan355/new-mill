import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";

export default function HomeUser() {
  const [values, setValues] = useState({});
  setValues('');

  const RicesReturn = Object.keys(values).map((id) => values[id].RiceReturn);
  const RiceRet = (ret) => {
    return RicesReturn.filter((rets) => rets === ret);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3030/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("token sucess");
          // localStorage.setItem("token", data.token);
          // window.location = "/";
        } else {
          alert("token failed");
          localStorage.removeItem('token');

        }

        // console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="container mt-2 h-100">
      <h1>รับฝากข้าว</h1>
      <Row className="mt-3 mb-4 p-2">
        <Col>
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #CCFFFF, #66CCFF)",
              color: "black",
            }}
          >
            <Card.Body className=" text-center">
              <Card.Title>{RiceRet(true).length} </Card.Title>
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
              <Card.Title>{RiceRet(false).length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text> ยังไม่ส่งคืน </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <hr />
      <div className="container">{/* <UserListRice />   */}</div>
    </div>
  );
}
