import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { linkDB, saveCurrentDate } from "../../constant.js";
import { QRCodeCanvas } from "qrcode.react";
import { Button, Col, Nav, Row, Tab, Table } from "react-bootstrap";
import * as IconBs from "react-icons/bs";

export default function ViewRice() {
  const { id } = useParams();

  const [values, setValues] = useState({});
  const [resTemp, setReTemp] = useState({});
  const [result, setResult] = useState([]);

  const [temp, setTemp] = useState({
    RiceID: id,
    RiceDayCheck: saveCurrentDate,
    RiceO2: "",
    RiceMoisture: "",
    RiceURL: "",
  });
  // console.log(values);
  // console.log(resTemp);

  useEffect(() => {
    axios.post(linkDB + "/rice/update", { RiceID: id }).then((response) => {
      // console.log(response.data);
      setValues(response.data);
    });

    axios.get(linkDB + "/search/user-admin").then((response) => {
      setResult(response.data);
    });

    axios.post(linkDB + "/rice/temp", { RiceID: id }).then((response) => {
      setReTemp(response.data);
    });
  }, [id]);

  return (
    <div>
      <div className="container py-3">
        <div className="card mb-3 mt-5" style={{ backgroundColor: "white" }}>
          <div className="row g-0">
            <div className="col-md-3 text-center py-4">
              <QRCodeCanvas className="img-fluid rounded-start" value={id} />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <h2 className="card-title text-center">
                  {values.RiceCategory}
                </h2>
                <h5 className="card-title my-2">
                  {result
                    .filter((item) => {
                      const uid = item.uid.toLowerCase();
                      const uidRiDep = values.RiceDepositor.toLowerCase();
                      return uid.startsWith(uidRiDep);
                    })
                    .map((item, keys) => (
                      <div key={keys}>ผู้ฝาก : {item.name}</div>
                    ))}
                </h5>
                <h6 className="card-text my-2">
                  ปริมาณ : {values.RiceQuantity}
                </h6>
                <h6 className="card-text my-2">
                  สถานะ :{" "}
                  {values.RiceReturn == "0"
                    ? "กำลังฝาก"
                    : values.RiceReturn == "1"
                    ? "รออนุมัติส่งคืน"
                    : "ส่งคืนแล้ว"}
                </h6>
                <div className="row justify-content-center align-items-center g-2 my-2">
                  <p className="col card-text" style={{ color: "blue" }}>
                    วันที่รับ : {values.RiceEntryDate}
                  </p>
                  <p className="col card-text" style={{ color: "red" }}>
                    วันส่งคืน :{" "}
                    {values.RiceIssueDate ? values.RiceIssueDate : " - "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h5>ตารางตรวจอุณภูมิ</h5>
        <div className="table-responsive">
          <Table className="table table-striped table-hover table-borderless table-primary align-middle my-3">
            <thead className="bg-success text-center">
              <tr>
                <th className="bg-success ">วันที่</th>
                <th className="bg-success ">ค่า O2</th>
                <th className="bg-success ">ค่าความชื้น</th>
                <th className="col-2 bg-success">รายละเอียด PDF</th>
              </tr>
            </thead>
            <tbody className="table-group-divider text-center">
              {Object.keys(resTemp).map((id, i) => {
                const url = require(`../../uploads/${resTemp[id].RiceURL}`);

                return (
                  <tr className="table-success" key={i}>
                    <td>{resTemp[id].RiceDayCheck}</td>
                    <td>{resTemp[id].RiceO2}</td>
                    <td>{resTemp[id].RiceMoisture}</td>
                    <td>
                      <a href={url} target="_blank">
                        <IconBs.BsArrowUpRightSquareFill />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
