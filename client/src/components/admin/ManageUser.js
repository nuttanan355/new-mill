import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { genKey, linkDB } from "../../constant";
import Swal from "sweetalert2";

export default function ManaageUser() {
  const [users, setUsers] = useState({});
  const [admins, setAdmins] = useState({});


  useEffect(() => {
    var DbLink = linkDB + "/user";
    axios.post(DbLink, { userType: "Admin" }).then((response) => {
      setAdmins(response.data);
    });

    axios.post(DbLink, { userType: "User" }).then((response) => {
      setUsers(response.data);
    });
    
  }, []);

  const [value, setValue] = useState({
    captcha: "",
    uid: genKey(),
    phone: "",
    fullName: "",
    password: "",
    passwordConfirm: "",
  });

  console.log(admins.length);

  return (
    <div className="container">
      {admins.length !== undefined ? (
        <div className="container">
          <div className="row justify-content-center align-items-center g-1 mt-5">
            <h5 className="col">ตาราง Admin</h5>
            <button
              type="button"
              className="col btn btn-success"
              onClick={async () => {
                const { value: formValues } = await Swal.fire({
                  title: "Add Admins",
                  html:
                    '<input id="fullName" class="swal2-input" placeholder="ชื่อ - สกุล">' +
                    '<input id="swal-input2" class="swal2-input">',
                  focusConfirm: false,
                  preConfirm: () => {
                    return [
                      document.getElementById("swal-input1").value,
                      document.getElementById("swal-input2").value,
                    ];
                  },
                });

                if (formValues) {
                  Swal.fire(JSON.stringify(formValues));
                }
              }}
            >
              เพิ่ม Admin
            </button>
          </div>

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
                  <th className="bg-danger">Type</th>
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
                      <td>{users[id].type}</td>
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
