import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../css/signIn.css";
import ReCAPTCHA from "react-google-recaptcha";
import { genKey, linkDB } from "../../constant";
// import { response } from "express";

export default function SignUp() {
  var DbLink = linkDB + "/user";

  const [users, setUsers] = useState({});
  const [Verified, setVerified] = useState(false);

  const [value, setValue] = useState({
    uid: genKey(),
    phone: "",
    fullName: "",
    password: "",
    passwordConfirm: "",
    memberNums: 0,
  });

  useEffect(() => {
    axios.post(DbLink, { phone: value.phone }).then((response) => {
      if (response.data[0] != null) {
        setUsers(response.data[0].phone);
        // console.log(response.data[0].phone);
      } else {
        setUsers({});
      }
    });
  }, [value.phone]);

  useEffect(() => {
    axios.post(DbLink, { userType: "User" }).then((response) => {
      setValue({ ...value, memberNums: response.data.length + 1 });
    });
  }, []);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    // console.log(value);
  };

  const onChangeReCAPTCHA = (value) => {
    if (value !== null) {
      setVerified(true);
    }
  };

  // console.log(users);


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
    } else if (value.phone === users) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "เบอร์โทรนี้มีอยู่แล้วกรุณาตรวจสอบใหม่",
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
        const jsonData = {
          uid: value.uid,
          name: value.fullName,
          phone: value.phone,
          password: value.passwordConfirm,
          type: "User",
          memberNum: value.memberNums,
        };

        // ----------------------------axja--------------

        fetch(linkDB + "/signUp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "sucess") {
              alert("SignUp sucess");
              window.location = "/";
            } else {
              alert("SignUp failed");
            }
            // console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        //   axios
        //     .post(linkDB + "/signUp", jsonData)
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log(data);
        //       if (data.status === "sucess") {
        //         alert("SignUp sucess");
        //         window.location = "/";
        //       } else {
        //         alert("SignUp failed");
        //       }
        //     })
        //     .catch((err) => {
        //       console.error("Error:", err);
        //     });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="limiter" style={{ background: "#EEF1FF" }}>
      <div className="container-login100">
        <div
          style={{
            background: "white",
            width: "500px",
            padding: "30px",
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
                // pattern="\d{3}[\-]\d{3}[\-]\d{4}"
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
            <div className="col-xs-1-12 ">
              <ReCAPTCHA
                name="captcha"
                sitekey="6LddEL4jAAAAACBVE-OlaKcarcT1tmjbqt2YZ6Iw"
                onChange={onChangeReCAPTCHA}
              />
            </div>

            <div className="d-grid mt-4">
              <button
                type="button"
                className="btn btn-primary"
                disabled={!Verified}
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
