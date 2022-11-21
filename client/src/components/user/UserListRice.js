import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/Card";
import axios from 'axios';
import { QRCodeCanvas } from "qrcode.react";

export default function UserListRice() {

  const [values, setValues] =useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3030/rice').then((response)=>{
      setValues(response.data);});
  },[]);

  return (
    <div className="flexbox row">
      {Object.keys(values).map((id, index) => {
        return (
          <div
            key={index}
            className="itemflex"
            style={{
              padding: "10px",
              maxWidth: "25%",
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
              <Card className="text-center">
                <div style={{ overflow: "hidden", height: "100px" }}>
                  <QRCodeCanvas
                    style={{ height: "100%", width: "auto" }}
                    value={values[id].RiceID}
                  />
                </div>
               
              </Card>
              <div className="m-2">
              <Card.Text>ผู้ฝาก : {values[id].RiceDepositor}</Card.Text>
              </div>
             
            </Card>
          </div>
        );
      })}
    </div>
  )
}
