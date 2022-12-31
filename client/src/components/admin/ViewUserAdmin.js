import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { linkDB } from "../../constant";
import * as IconBs from "react-icons/bs";

export default function ViewUserAdmin() {
  const { id } = useParams();

  const [values, setValues] = useState({});
  const [rices, setRices] = useState({});

  useEffect(() => {
    axios.post(linkDB + "/user/my-rice", { uid: id }).then((response) => {
      // console.log(response.data[0]);
      setValues(response.data[0]);
    });

    axios
      .post(linkDB + "/rice/my-rice", { RiceDepositor: id })
      .then((response) => {
        console.log(response.data);
        setRices(response.data);
      })
      .catch((err) => {
        setRices();
        console.log(err);
      });
  }, [id]);

  console.log(rices);
  console.log(values);

  return (
    <div className="container mt-5">
      <h1>ViewUserAdmin</h1>
      <div className="card mb-3 mt-5" style={{ backgroundColor: "white" }}>
        <div className="card-body">
          <h2 className="card-title text-center">คุณ {values.name}</h2>
          <h5 className="card-title my-2"></h5>
          <h6 className="card-text my-2">หมายเลขสมาชิก : {values.memberNum}</h6>
          <h6 className="card-text my-2">เบอร์โทร : {values.phone}</h6>
          {/* <h6 className="card-text my-2">
                  สถานะ :{" "}
                  {values.RiceReturn == "0"
                    ? "กำลังฝาก"
                    : values.RiceReturn == "1"
                    ? "รออนุมัติส่งคืน"
                    : "ส่งคืนแล้ว"}
                </h6> */}
          <div className="row justify-content-center align-items-center g-2 my-2">
            <p className="col card-text" style={{ color: "blue" }}>
              จำนวนข้าวที่ฝาก : {rices ? rices.RiceIssueDate : " - "}
            </p>
            <p className="col card-text" style={{ color: "red" }}>
              ปริมาณข้าวที่ฝาก :{rices ? rices.RiceIssueDate : " - "}
            </p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center align-items-center g-1 mt-5 mb-2">
        <h5 className="col">รายการข้าว</h5>
        <button
          type="button"
          className="col btn btn-success"
          onClick={async () => {window.location.href = `/admin/add-rice/${id}`}}
        >
          เพิ่มรายการข้าว
        </button>
      </div>

      {rices.length !== 0 ? (
       <div className="mb-5 mt-2">
       <div className="row g-4" style={{ display: "flex", flexWrap: "wrap" }}>
          {Object.keys(rices).map((id, i) => {
            return (
              <div key={i} className="itemflex col-sm-3">
                <Card
                  className="div-btn"
                  variant="warning"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="ตรวจรายการข้าวนี้"
                  onClick={() =>
                    (window.location.href = `/admin/edit-rice/${rices[id].RiceID}`)
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
                      <div className="col-9">{rices[id].RiceCategory}</div>
                      <Button
                        className=" delete-admin-btn col mx-1"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="ลบรายการข้าวนี้"
                        variant="outline-danger"
                        style={{ border: "1px solid lightgray" }}

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
                        <QRCodeCanvas value={rices[id].RiceID} />
                      </div>
                    </Row>
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
                    }</div> */}
                  </Card.Body>
                </Card>
              </div>
            );
          })}
          </div>
        </div>
      ) : (
        <div className="text-center p-5" style={{height:'300px',background:'#FFFF'}}>
          <h2>ไม่มีรายการข้าว</h2>
        </div>
      )}
    </div>
  );
}
