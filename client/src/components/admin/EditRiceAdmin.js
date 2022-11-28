import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LinkDB } from "../../LinkDB";
import { QRCodeCanvas } from "qrcode.react";
import { Table } from "react-bootstrap";

var d = new Date();
var saveCurrentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
var saveCurrentTime =
  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var dateKey = saveCurrentDate + "," + saveCurrentTime;

function genKey() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

export default function EditRiceAdmin() {
  const { id } = useParams();

  const [values, setValues] = useState({});
  const [resTemp,setReTemp] = useState({});

  const [temp, setTemp] = useState({
    RiceDayCheck: "dateKey",
    RiceO2: "link",
    RiceMoisture: "link",
  });
  console.log(values);
  console.log(resTemp);


  useEffect(() => {
    var DBRice = LinkDB + "/rice/update";
    axios.post(DBRice, { RiceID: id }).then((response) => {
      // console.log(id);
      console.log(response.data);

      setValues(response.data);
    });

    var DBTemp = LinkDB + "/rice/temp";
    // console.log(DBTemp)
    axios.post(DBTemp, { RiceID: id }).then((response) => {
      // // console.log(id);
      // // console.log(response.data);
      // if(response.data != null){
      setReTemp(response.data);
    // }else{}

      
    });
  }, [id]);

  const handleOnChange = (e) => {
    setTemp({ ...temp, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container py-3">
        <div className="card" style={{ backgroundColor: "white" }}>
          <h2 className="card-title text-center mt-2">{values.RiceCategory}</h2>
          <div className="card-img-top text-center mt-2">
            <QRCodeCanvas value={id} style={{ width: "40%", height: "40%" }} />
          </div>
          <div className="card-body">
            <h5 className="card-title">ผู้ฝาก : {values.RiceDepositor}</h5>
            <div className="row justify-content-center align-items-center g-2">
              <p className="col card-text">วันที่รับ : {values.RiceEntryDate}</p>
              <p className="col card-text">วันส่งคืน : {values.RiceIssueDate?(values.RiceIssueDate):('-')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="table-responsive">
        <h5>ตารางตรวจอุณภูมิ</h5>
          <Table className="table table-striped
          table-hover	
          table-borderless
          table-primary
          align-middle">
            <thead className="table-light">
              <tr>
                <th>วันที่</th>
                <th>ค่า O2</th>
                <th>ค่าความชื้น</th>
              </tr>
              </thead>
              <tbody className="table-group-divider">
                {Object.keys(resTemp).map((id,i)=>{
                  return(
                    <tr className="table-primary" key={i}>
                    <td scope="row">{resTemp[id].RiceDayCheck}</td>
                    <td>{resTemp[id].RiceO2}</td>
                    <td>{resTemp[id].RiceMoisture}</td>
                  </tr>
                  )
                })}
       
              </tbody>    
          </Table>
        </div>
      </div>
    </div>
  );
}
