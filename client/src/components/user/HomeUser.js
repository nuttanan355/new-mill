import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import UserListRice from "./UserListRice";
import { linkDB } from "../../constant";

export default function HomeUser() {
  const [values, setValues] = useState([]);

  console.log(values);

  const RicesReturn = Object.keys(values).map((id) => values[id].RiceReturn);

  const RiceRet = (ret) => {
    return RicesReturn.filter((rets) => rets === ret);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token != null){
      fetch(linkDB+"/authen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            // alert("token sucess");
            // localStorage.setItem("token", data.token);
            // window.location = "/";
          } else {
            alert("token failed");
            localStorage.removeItem('token');
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
   



      axios.get(linkDB+'/rice').then((response) => {
        setValues(response.data);
        // console.log(` ${response.data}`)
      });

  }, []);

  /////////////////////////////////////////
  const [Rice, setRice] = useState([]);



  useEffect(() => {
    axios.get(linkDB+'/showrice').then(result => setRice(result.data));
    console.log(Rice)
  }, [])
  /////////////////////////////////////////



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
              <Card.Title>{RiceRet(1).length}  </Card.Title>

              {/* {Rice.map(item => {
                return <Card.Title> {item.Returned} </Card.Title>
              })} */}

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
              <Card.Title>{RiceRet(0).length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text> ยังไม่ส่งคืน </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <hr />
      <div className="container">
        <UserListRice />
        {/* {values.map((id,index)=>{
          return(
            <div className="card-deck" key={index}>
              <div className="card">
                <p>R ID : {id.RiceID}</p>
              </div>
            </div>
          );
        })} */}

      </div>
    </div>
  );
}
