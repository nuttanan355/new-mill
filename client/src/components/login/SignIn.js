import React, { useState } from "react";
import "../../css/signIn.css";

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

    fetch("http://localhost:3030/signIn", {
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
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" type="submit">
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
