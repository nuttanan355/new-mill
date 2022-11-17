import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import {
  Button,
  Card,
  Form,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import QRcode from "qrcode.react";

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
  console.log(genKey());

  const [users, setUsers] = useState({});

  useEffect(() => {
    setValues({ RiceID: genKey() });
  }, []);

  const [values, setValues] = useState({
    RiceCategory: "",
    RiceDepositor: "",
    RiceQuantity: "",
    RiceReturn: {
      RiceO2: [],
      RiceMoisture: [],
    },
    // RiceDescription: "",
    RiceMoth: [],
    RiceReturn: false,
    RiceID: genKey(),
  });

  function postRice() {
    axios.post('http://localhost:3030/admin/addrice', {
      category: values.RiceCategory
    })
  }

  console.log(values);

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const downloadQR = () => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "myqr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <h3 className="col">Add Rice</h3>
        {/* <h4 className='col'>{dateKey}</h4> */}
      </div>
      <hr />

      <div className="container  p-5">
        <div>
          <h1 id="myqr">sdfsdf</h1>
          <QRcode id="myqr" value={genKey()} size={320} includeMargin={true} />
        </div>
        <Button onClick={downloadQR}>โหลด</Button>
        <form className="was-validated">
          <div className="form-group mt-3">
            <label htmlFor="RiceCategorys">ประเภทสินค้า</label>
            {/* <Form.Select
            aria-label="Default select example"
            id="RiceCategory"
            name="RiceCategory"
            className="form-select"
            onChange={handleOnChange}
            required
          >
            <option value="">ประเภทสินค้า</option>
            {TypeRice.map((item, keys) => {
              return (
                <option name="RiceCategory" key={keys} value={item.title}>
                  {item.title}
                </option>
              );
            })}
          </Form.Select> */}
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
              <option value="ผู้ฝาก">ผู้ฝาก</option>
              <option value="ผู้ฝาก1">ผู้ฝาก1</option>
              <option value="ผู้ฝาก2">ผู้ฝาก2</option>
              {Object.keys(users).map((item, keys) => {
                return (
                  <option
                    name="RiceDepositor"
                    key={keys}
                    value={users[item].full_name}
                  >
                    {users[item].full_name}
                  </option>
                );
              })}
            </Form.Select>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="ThesisDev">จำนวน</label>
            <ToggleButtonGroup type="radio" name="RiceQuantity" defaultValue={1}>
              <ToggleButton id="S" value={"S"} onChange={handleOnChange} >
                S
              </ToggleButton>
              <ToggleButton id="M" value={"M"} onChange={handleOnChange}>
                M
              </ToggleButton>
              <ToggleButton id="L" value={"L"} onChange={handleOnChange}>
                L
              </ToggleButton>
              <ToggleButton id="XL" value={"XL"} onChange={handleOnChange}>
                XL
              </ToggleButton>
            </ToggleButtonGroup>
            {/* <input
              type="number"
              id="RiceQuantity"
              name="RiceQuantity"
              className="form-control"
              placeholder="Rice Quantity"
              onChange={handleOnChange}
              required
            /> */}
          </div>

          {/* <div className="form-group mt-3">
          <label htmlFor="RiceDescription">รายละเอียด</label>
          <textarea
            type="text"
            id="RiceDescription"
            name="RiceDescription"
            className="form-control"
            placeholder="RiceDescription"
            onChange={handleOnChange}
            required
          />
        </div> */}
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
              type="button"
              onClick={postRice}
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
      <br />
    </div>
  );
}
