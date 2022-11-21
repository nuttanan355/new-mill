import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Button,
  Form,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import QRcode from "qrcode.react";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

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

export default function AddRiceAdmin() {
  const [users, setUsers] = useState({});
  const [typeRice, setTypeRice] = useState([]);

  const [values, setValues] = useState({
    RiceID: genKey(),
    RiceDepositor: "",
    RiceCategory: "",
    RiceQuantity: "",
    RiceReturn: false,
    RiceTemp: [],
  });
  const [temp, setTemp] = useState({
    RiceDayCheck: "dateKey",
    RiceO2: "link",
    RiceMoisture: "link"
  });



  useEffect(() => {
    axios.get("http://localhost:3030/type").then((response) => {
      setTypeRice(response.data);
    });
    axios.get("http://localhost:3030/user").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const downloadQR = async () => {
    const divQR = document.getElementById("myqr");
    const canvas = await html2canvas(divQR);
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "download.png", "image/png");
  };

  console.log(values);
  return (
    <div className="container" style={{ width: "60%" }}>
      <br />
      <div className="row">
        <h3 className="col">Add Rice</h3>
      </div>
      <hr />

      <div className="container  px-5 mt-3">
        <form className="was-validated">
          <div className="form-group mt-3">
            <label htmlFor="RiceCategorys">ประเภทสินค้า</label>
            <Form.Select
              aria-label="Default select example"
              id="RiceCategory"
              name="RiceCategory"
              className="form-select"
              onChange={handleOnChange}
              required
            >
              <option value="">ประเภทสินค้า</option>
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
            <label htmlFor="ThesisDev">ผู้ฝาก</label>
            <Form.Select
              aria-label="Default select example"
              id="RiceDepositor"
              name="RiceDepositor"
              className="form-select"
              onChange={handleOnChange}
              required
            >
              <option value="">ผู้ฝาก</option>
              {Object.keys(users).map((item, keys) => {
                return (
                  <option
                    name="RiceDepositor"
                    key={keys}
                    value={users[item].name}
                  >
                    {users[item].name}
                  </option>
                );
              })}
            </Form.Select>
          </div>

          <div className="form-group mt-3">
            <div htmlFor="ThesisDev">จำนวน</div>

            <ToggleButtonGroup
              type="radio"
              name="RiceQuantity"
              defaultValue={1}
              size="lg"
            >
              <ToggleButton
                className="mx-2 px-5"
                variant="outline-danger"
                id="S"
                value={"S"}
                onChange={handleOnChange}
              >
                S
              </ToggleButton>
              <ToggleButton
                className="px-5"
                variant="outline-danger"
                id="M"
                value={"M"}
                onChange={handleOnChange}
              >
                M
              </ToggleButton>
              <ToggleButton
                className="mx-2 px-5"
                variant="outline-danger"
                id="L"
                value={"L"}
                onChange={handleOnChange}
              >
                L
              </ToggleButton>
              <ToggleButton
                className="px-5"
                variant="outline-danger"
                id="XL"
                value={"XL"}
                onChange={handleOnChange}
              >
                XL
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <h5 className="mt-4">ค่าอุหณภูมิ</h5>
          <hr />
          <div className="form-group mt-3">
            <label htmlFor="ThesisDev">ค่า O2</label>
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              accept="image/*"
              // onChange={ImgMosOnChange}
              maxLength="5"
              required
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="ThesisDev">ค่าความชื้น</label>
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              accept="image/*"
              // onChange={ImgDntOnChange}
              maxLength="5"
              required
            />
          </div>

          {/* --------------------------------------------------------------BUTTON---------------------------------------------------------------- */}
          <div className="row mt-3">
            {/* <Link
            className="btn col mx-3"
            to="/"
            style={{ color: "gray", fontSize: "24px" }}
          >
            <IoIosArrowBack />
          </Link> */}
            <button
              className="btn btn-success col mx-3"
              // onClick={createRice}
              disabled={
                // RiceMoisture: [],
                // RiceDensity: [],
                // RiceMoth: [],
                values.RiceCategory === "" ||
                values.RiceDepositor === "" ||
                values.RiceQuantity === "" ||
                values.RiceDescription === ""
                // ShowImgMoisture.length === 0 ||
                // ShowImgDensity.length === 0 ||
                // ShowImgMoth.length === 0
              }
              // type="button"
              // onClick={postRice}
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

      <div className="container card  text-center" style={{ width: "" }}>
        <div id="myqr" className="container card-body">
          <QRcode
            className="card-img-top"
            value={values.RiceID}
            size={250}
            includeMargin={true}
          />
          <h4 className="card-title">{values.RiceCategory}</h4>
          <p className="card-text">ผู้ฝาก : {values.RiceDepositor}</p>
          <p className="card-text">Size : {values.RiceQuantity}</p>
          <div class="card-footer text-muted">{saveCurrentDate}</div>
        </div>
        <Button className="mx-3 my-3" onClick={downloadQR}>
          โหลด
        </Button>
      </div>
      <br />
    </div>
  );
}
