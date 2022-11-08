import React, { useState } from "react";
import Swal from "sweetalert2";
import "../../css/signIn.css";

function genKey() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

export default function SignUp() {
  const [value, setValue] = useState({
    uid: genKey(),
    phone: "",
    fullName: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value);
  };

  const handleSubmit = () => {
    if (value.fullName === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "ไม่มีข้อมูลชื่อ",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (value.phone === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "ไม่มีข้อมูลเบอร์โทร",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (value.password === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "ไม่มีข้อมูลรหัสผ่าน",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (value.passwordConfirm === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "ไม่มีข้อมูลยืนยันรหัสผ่าน",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (value.password !== value.passwordConfirm) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "รหัสผ่านไม่ตรงกัน",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      try {
        console.log(value);
        console.log("เตรียมเข้า DB");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div
          style={{
            background: "#FFF5E4",
            width: "500px",
            padding: "20px",
            textAlign: "center",
            borderRadius: "15px",
          }}
        >
          <form>
            <h3>Sign Up</h3>
            <br />

            <div className="wrap-input validate-input mb-3">
              <input
                className="input100"
                type="text"
                name="fullName"
                placeholder="ชื่อ - สกุล"
                onChange={handleChange}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-users" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input validate-input mb-3">
              <input
                className="input100"
                placeholder="เบอร์โทร"
                type="number"
                name="phone"
                onChange={handleChange}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-phone" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input validate-input mb-3">
              <input
                className="input100"
                type="password"
                placeholder="รหัส"
                name="password"
                onChange={handleChange}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-key" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input validate-input mb-3">
              <input
                className="input100"
                type="password"
                placeholder="ยืนยันรหัส"
                name="passwordConfirm"
                onChange={handleChange}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-key" aria-hidden="true"></i>
              </span>
            </div>

            <div className="d-grid">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSubmit()}
              >
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/user/sign-in">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
