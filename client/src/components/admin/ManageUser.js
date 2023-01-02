import axios from "axios";
import React, { useEffect, useState } from "react";
import { Nav, Spinner, Tab, Table } from "react-bootstrap";
import { genKey, linkDB, saveCurrentDate } from "../../constant";
import Swal from "sweetalert2";

export default function ManaageUser() {
  const [users, setUsers] = useState({});
  const [admins, setAdmins] = useState({});
  const [value, setValue] = useState({
    uid: genKey(),
    phone: "",
    fullName: "",
    password: "",
    passwordConfirm: "",
  });


  useEffect(() => {
    var DbLink = linkDB + "/user";
    axios.post(DbLink, { userType: "Admin" }).then((response) => {
      setAdmins(response.data);
    });

    axios.post(DbLink, { userType: "User" }).then((response) => {
      setUsers(response.data);
    });
    
  }, []);

  const handleOnChange = (e) => {
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
          type: "Admin",
          memberNum: null,
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


  // console.log(admins.length);

  return (
    <div className="container">
      {admins.length !== undefined ? (
        <div className="container">
          <div className="justify-content-center align-items-center g-1 mt-5">
          <Tab.Container id="top-tabs-example" defaultActiveKey="table">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="table">ตาราง Admin</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="addTemp">เพิ่ม Admin</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="mt-3">
            <Tab.Content>

              <Tab.Pane eventKey="table">
              <div className="table-responsive">
            <Table className="table table-striped table-hover table-borderless table-primary align-middle mt-2">
              <thead>
                <tr>
                  <th className="bg-warning">ชื่อ</th>
                  <th className="bg-warning">เบอร์โทร</th>
                  <th className="bg-warning">Type</th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {Object.keys(admins).map((id, i) => {
                  return (
                    <tr className="table-warning" key={i}>
                      <td scope="row">{admins[id].name}</td>
                      <td>{admins[id].phone}</td>
                      <td>{admins[id].type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
              </Tab.Pane>

              <Tab.Pane eventKey="addTemp">
                <div className="container px-5">
                  <h4 id="date" className="container mt-5 mb-2">
                  เพิ่ม Admin
                  </h4>
                  {/* phone: "",
    fullName: "",
    password: "",
    passwordConfirm: "", */}
                  <div className="row justify-content-center align-items-center g-4">
                    <input
                      id="phone"
                      name="phone"
                      className="col form-control mx-3"
                      placeholder="Phone"
                      onChange={handleOnChange}
                      required
                    />
                     <input
                      id="fullName"
                      name="fullName"
                      className="col form-control mx-3"
                      placeholder="Full Name"
                      onChange={handleOnChange}
                      required
                    />   
                    <input
                      id="password"
                      name="password"
                      className="col form-control mx-3"
                      placeholder="Password"
                      onChange={handleOnChange}
                      required
                    />    
                       <input
                      id="passwordConfirm"
                      name="passwordConfirm"
                      className="col form-control mx-3"
                      placeholder="Password Confirm"
                      onChange={handleOnChange}
                      required
                    />    
                       
                  </div>
                  <button
                    type="button"
                    className="col btn btn-success mt-3"
                    onClick={async () => handleSubmit()}
                  >
                    บันทึก{" "}
                  </button>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
          </div>

          <hr />

          <div className="row justify-content-center align-items-center g-1 mt-3">
            <h5 className="col">ตารางผู้ใช้งาน</h5>
          </div>

          <div className="table-responsive mt-2">
            <Table
              className="table table-striped
                  table-hover	
                  table-borderless
                  table-primary
                  align-middle mt-2"
            >
              <thead className="table-light">
                <tr>
                  <th className="bg-danger">รหัสสมาชิก</th>
                  <th className="bg-danger">ชื่อ</th>
                  <th className="bg-danger">เบอร์โทร</th>
                  {/* <th className="bg-danger">Type</th> */}
                  <th className="bg-danger">Update</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {Object.keys(users).map((id, i) => {
                  return (
                    <tr className="table-danger" key={i}>
                      <td scope="row">{users[id].memberNum}</td>
                      <td>{users[id].name}</td>
                      <td>{users[id].phone}</td>
                      {/* <td>{users[id].type}</td> */}
                      <td><a className="btn btn-primary" role="button" onClick={()=>window.location.href = `/admin/view-user/${users[id].uid}`}>View</a></td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="wait-spinner">
          <Spinner animation="border" variant="success" />
        </div>
      )}
    </div>
  );
}
