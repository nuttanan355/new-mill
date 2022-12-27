import React, { useState } from "react";
import axios from 'axios';
import "../../css/signIn.css";
import Swal from 'sweetalert2'
import { linkDB } from "../../constant";


export default function SignIn() {
  const [value, setValue] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(linkDB+"/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("login sucess");
          localStorage.setItem("token", data.token);
          localStorage.setItem("type", data.type);
          window.location = "/";
        } else {
          alert("login failed");
        }

        // console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  ////////////////////////////////
  const [phoneReg, setPhone] = useState('');
  const [passwordReg, setPassword] = useState('');

  const login = () => {
    axios.post(linkDB+'/login', {
      phone: phoneReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response)

    })
  }
  ////////////////////////////////
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
          <form onSubmit={handleSubmit}>
            {/* <form > */}
            <span className="login100-form-title">Member Login</span>
            {/* <LoginGoogle variant="primary"/> */}

            <div
              className="wrap-input100 validate-input"
              data-validate="Phone is required"
            >
              <input
                className="input100"
                type="text"
                name="phone"
                placeholder="phone"
                onChange={handleChange}
              // onChange={(e) => {
              //   setPhone(e.target.value)
              // }}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-phone" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              // onChange={(e) => {
              //   setPassword(e.target.value)
              // }}
              />

              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" >
                {/* onClick={login} */}
                Login
              </button>
            </div>
            <div className="text-center p-t-136">
              <a className="txt2" href="/user/sign-up">
                Create your Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
