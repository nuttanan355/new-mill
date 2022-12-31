import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Button, Form, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import QRcode from "qrcode.react";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import { genKey, linkDB, saveCurrentDate } from "../../constant";
import { useParams } from "react-router-dom";

export default function AddRiceAdmin() {
  const { id } = useParams();

  const [users, setUsers] = useState({});
  const [typeRice, setTypeRice] = useState([]);

  const [values, setValues] = useState({
    RiceID: genKey(),
    RiceDepositor: id,
    RiceCategory: "",
    RiceQuantity: "",
    RiceReturn: "0",
    RiceEntryDate: saveCurrentDate,
    RiceIssueDate: "",
  });

  const [temp, setTemp] = useState({
    RiceID: values.RiceID,
    RiceDayCheck: saveCurrentDate,
    RiceO2: "",
    RiceMoisture: "",
    RiceURL: "",
  });

  useEffect(() => {
    axios.get(linkDB + "/type").then((response) => {
      setTypeRice(response.data);
    });

    axios.post(linkDB + "/user/my-rice", { uid: id }).then((response) => {
      console.log(response.data[0]);
      setUsers(response.data[0]);
    });
  }, []);

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOnChangeTeamp = (e) => {
    setTemp({ ...temp, [e.target.name]: e.target.value });
  };
  const handleOnChangeTeampFile = (e) => {
    setTemp({ ...temp, [e.target.name]: e.target.files[0] });
  };

  const downloadQR = async () => {
    const divQR = document.getElementById("myqr");
    const canvas = await html2canvas(divQR);
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "download.png", "image/png");
  };

  const createRice = () => {
    var formData = new FormData();
    formData.append("RiceURL", temp.RiceURL);
    formData.append("RiceID", temp.RiceID);
    formData.append("RiceMoisture", temp.RiceMoisture);
    formData.append("RiceO2", temp.RiceO2);
    formData.append("RiceDayCheck", temp.RiceDayCheck);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(linkDB + "/add-rice", values)
      .then(() => {
        axios
          .post(linkDB + "/update-temp-rice", formData, config)
          .then(async () => {
            await downloadQR();
            alert("Update Temp sucess");
            window.location.href = `/admin/view-user/${id}`;
          })
          .catch((err) => {
            console.error("Error:", err);
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <h3 className="col">Add Rice</h3>
      </div>
      <hr />

      <div className="row justify-content-center align-items-center g-2">
      <div className="col-4 me-5">
          <div className="container card  text-center" style={{ width: "" }}>
            <div id="myqr" className="container card-body">
              <QRcode
                className="card-img-top"
                value={values.RiceID}
                size={250}
                includeMargin={true}
              />
              <h4 className="card-title">{values.RiceCategory}</h4>
              <p className="card-text">ผู้ฝาก : {users.name}</p>
              <p className="card-text">ปริมาณข้าว : {values.RiceQuantity}</p>
              <div className="card-footer text-muted">{saveCurrentDate}</div>
            </div>
            {/* <Button className="mx-3 my-3" onClick={downloadQR}>
          โหลด
        </Button> */}
          </div>
        </div>
        <div className="col">
          <div className="container  px-auto mt-3">
            <h3 className="col mt-5">ผู้ฝาก : {users.name}</h3>
            <form className="was-validated">
              <div className="form-group mt-3">
                <label htmlFor="RiceCategorys">ประเภทข้าว</label>
                <Form.Select
                  aria-label="Default select example"
                  id="RiceCategory"
                  name="RiceCategory"
                  className="form-select"
                  onChange={handleOnChange}
                  required
                >
                  <option value="">ประเภทข้าว</option>
                  {Object.keys(typeRice).map((item, keys) => {
                    return (
                      <option
                        name="RiceCategory"
                        key={keys}
                        value={typeRice[item].type}
                      >
                        {typeRice[item].type}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>

              <div className="form-group mt-3">
                <div htmlFor="RiceQuantity">ปริมาณข้าวที่ฝาก</div>
                <input
                  type="text"
                  id="RiceQuantity"
                  name="RiceQuantity"
                  className="form-control"
                  placeholder="ปริมาณข้าวที่ฝาก"
                  onChange={handleOnChange}
                  pattren="[A-Za-zก-๏]{1,250}"
                  title="ใส่เป็นตัวอักษรเท่านั้น"
                  required
                />
              </div>

              <h5 className="mt-5">ค่าอุหณภูมิ</h5>
              <hr />
              <div className="form-group mt-3">
                <label htmlFor="RiceO2">ค่า O2</label>
                <input
                  type="text"
                  id="RiceO2"
                  name="RiceO2"
                  className="form-control"
                  placeholder="ค่า O2"
                  onChange={handleOnChangeTeamp}
                  pattren="[A-Za-zก-๏]{1,250}"
                  title="ใส่เป็นตัวอักษรเท่านั้น"
                  required
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="RiceMoisture">ค่าความชื้น</label>
                <input
                  type="text"
                  id="RiceMoisture"
                  name="RiceMoisture"
                  className="form-control"
                  placeholder="ค่าความชื้น"
                  onChange={handleOnChangeTeamp}
                  pattren="[A-Za-zก-๏]{1,250}"
                  title="ใส่เป็นตัวอักษรเท่านั้น"
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="RiceURL">ไฟล์ PDF</label>
                <input
                  className="form-control"
                  type="file"
                  name="RiceURL"
                  id="RiceURL"
                  accept=".pdf"
                  onChange={handleOnChangeTeampFile}
                  maxLength="5"
                  required
                />
              </div>

              {/* --------------------------------------------------------------BUTTON---------------------------------------------------------------- */}
              <div className="row mt-3">
                <button
                  className="btn btn-success col mx-3"
                  type="button"
                  onClick={() => createRice()}
                  disabled={
                    values.RiceCategory === "" ||
                    values.RiceQuantity === "" ||
                    temp.RiceO2 === "" ||
                    temp.RiceMoisture === "" ||
                    temp.RiceURL === ""
                  }
                >
                  Submit
                </button>
                <button
                  type="reset "
                  className="btn btn-warning col mx-3"
                  style={{ color: "white" }}
                >
                  Clear
                </button>
              </div>
            </form>
            <br />
          </div>
        </div>

      </div>

      <br />
    </div>
  );
}
