import axios from "axios";
import React, { useEffect, useState } from "react";
import { Nav, Spinner, Tab } from "react-bootstrap";
import { genKey, linkDB, saveCurrentDate } from "../../constant";
import Swal from "sweetalert2";
import { Input, Space, Table, Tag } from "antd";
import * as IconAnt from "@ant-design/icons";
import Link from "antd/es/typography/Link";

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
        // toast: true,
        //     position: "top-end",
        // showConfirmButton: false,
        //     timer: 1000,
        timerProgressBar: true,
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
        Swal.fire({
          title: "ต้องการเพิ่ม admin ?",
          text: "ยืนยันการเพิ่ม admin !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(linkDB + "/signUp", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(jsonData),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.status === "sucess") {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "SignUp sucess",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                  }).then(() => window.location.reload());
                  // alert("SignUp sucess");
                } else {
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "SignUp failed",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                  });
                }
                console.log("Error:", data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
          else{
            setValue ({
              uid: genKey(),
              phone: "",
              fullName: "",
              password: "",
              passwordConfirm: "",
            })
          }
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
    <div className="container pt-3 pb-5" style={{ backgroundColor: "white" }}>
      {admins.length && users.length !== null ? (
        <div className="container">
          <div className="justify-content-center align-items-center g-1 mt-5">
            <Tab.Container id="top-tabs-example" defaultActiveKey="table">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="table">ตาราง Admin</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="addAdmin">เพิ่ม Admin</Nav.Link>
                </Nav.Item>
              </Nav>
              <div className="mt-3">
                <Tab.Content>
                  <Tab.Pane eventKey="table">
                    {/* <div className="table-responsive">
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
                    </div> */}
                    <Table
                      rowKey={(record) => record.uid}
                      bordered
                      size="middle"
                      columns={[
                        { title: "ชื่อ", dataIndex: "name" },
                        { title: "เบอร์โทร", dataIndex: "phone" },
                        {
                          align: "center",
                          title: "Type",
                          dataIndex: "type",
                          render: (record) => (
                            <Tag color={"red"} key={record}>
                              {record.toUpperCase()}
                            </Tag>
                          ),
                        },
                        {
                          title: "Action",
                          key: "action",
                          align: "center",
                          width: 200,

                          render: (record) => (
                            <Space size="middle">
                              <IconAnt.EditTwoTone
                                style={{ fontSize: "18px" }}
                                className="btn-edit"
                                title="แก้ไขผู้ใช้นี้"
                                onClick={() =>
                                  (window.location.hash = "addAdmin")
                                }
                              />

                              <IconAnt.DeleteTwoTone
                                style={{ fontSize: "18px" }}
                                twoToneColor="red"
                                className="btn-del"
                                title="ลบผู้ใช้นี้"
                              />
                            </Space>
                          ),
                        },
                      ]}
                      dataSource={admins}
                    />
                  </Tab.Pane>

                  <Tab.Pane eventKey="addAdmin" href="#addAdmin">
                  <form className="was-validated">
                    <div className="container px-5">
                      <h4 id="date" className="container mt-5 mb-2">
                        เพิ่ม Admin
                      </h4>
                      <div
                        className="row"
                        style={{ margin: "0 auto", width: "80%" }}
                      >
                        
                        <label>
                          Phone
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-control my-3"
                            placeholder="Phone"
                            value={value.phone}
                            onChange={handleOnChange}
                            maxLength={10}
                            required
                          />
                        </label>
                        <label>
                          Full Name
                          <input
                            id="fullName"
                            name="fullName"
                            value={value.fullName}
                            className="col form-control my-3"
                            placeholder="Full Name"
                            onChange={handleOnChange}
                            required
                          />
                        </label>
                        <label>
                          Password
                          <input
                            id="password"
                            type="password"
                            name="password"
                            value={value.password}
                            className="col form-control my-3"
                            placeholder="Password"
                            onChange={handleOnChange}
                            required
                          />
                        </label>
                        <label>
                          Password Confirm
                          <input
                            id="passwordConfirm"
                            name="passwordConfirm"
                            type="password"
                            value={value.passwordConfirm}
                            className="col form-control my-3"
                            placeholder="Password Confirm"
                            onChange={handleOnChange}
                            required
                          />
                        </label>
                        <button
                          type="button"
                          className="btn btn-success mt-3"
                          onClick={async () => handleSubmit()}
                          disabled={ value.phone === "" ||value.fullName === ""||value.password === ""||value.passwordConfirm === ""
                          }
                        >
                          บันทึก{" "}
                        </button>
                      </div>
                    </div>
                    </form>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
          </div>

          <hr />

          <div className="row justify-content-center align-items-center g-1 mt-3">
            <h5 className="col">ตารางผู้ใช้งาน</h5>
          </div>
          <div>
            <Table
              rowKey={(record) => record.uid}
              className="table-user"
              bordered
              size="middle"
              dataSource={users}
              columns={[
                {
                  title: "รหัสสมาชิก",
                  dataIndex: "memberNum",
                  width: 130,
                  align: "center",
                  sorter: (a, b) => a.memberNum - b.memberNum,
                },
                { title: "ชื่อ", dataIndex: "name" },
                { title: "เบอร์โทร", dataIndex: "phone" },
                {
                  align: "center",
                  title: "Type",
                  dataIndex: "type",
                  render: (record) => (
                    <Tag color={"green"} key={record}>
                      {record.toUpperCase()}
                    </Tag>
                  ),
                },
                {
                  title: "Action",
                  key: "action",
                  align: "center",
                  render: (record) => (
                    // <a
                    //   className="btn btn-primary"
                    //   // role="button"
                    //   onClick={() =>
                    //     (window.location.href = `/admin/view-user/${record.uid}`)
                    //   }
                    // >
                    //   <IconAnt.EyeTwoTone />
                    <Space size="middle">
                      <IconAnt.EyeTwoTone
                        style={{ fontSize: "18px" }}
                        className="btn-edit"
                        twoToneColor="#F2921D"
                        title="ดูโปรไฟล์ผู้ใช้นี้"
                        onClick={() =>
                          (window.location.href = `/admin/view-user/${record.uid}`)
                        }
                      />
                    </Space>
                    // </a>
                  ),
                },
              ]}
            />
          </div>

          {/* <div className="table-responsive mt-2">
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
                   
                      <td>
                        <a
                          className="btn btn-primary"
                          role="button"
                          onClick={() =>
                            (window.location.href = `/admin/view-user/${users[id].uid}`)
                          }
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div> */}
        </div>
      ) : (
        <div className="wait-spinner">
          <Spinner animation="border" variant="success" />
        </div>
      )}
    </div>
  );
}
