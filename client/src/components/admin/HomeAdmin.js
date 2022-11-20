import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ModalDialog,
  Row,
} from "react-bootstrap";
import ListRiceAdmin from "./ListRiceAdmin";
import { QrReader } from "react-qr-reader";
import { Grid, Icon, Link } from "@mui/material";
import * as IconMd from "react-icons/md";
import { color } from "@mui/system";
// import { mdiQrcodeScan } from '@mdi/js';

// import QrScan from 'react-qr-reader';

export default function HomeAdmin() {
  const [values, setValues] = useState({});
  const [users, setUsers] = useState({});

  const AllRice = Object.keys(values).map((id) => values[id].RiceCategory);
  const TypeRices = (typeRice) => {
    return AllRice.filter((RiceType) => RiceType === typeRice);
  };

  const AllUsers = Object.keys(users).map((id) => users[id].type);
  const TypeUsers = (typeUser) => {
    return AllUsers.filter((user) => user === typeUser);
  };

  const [data, setData] = useState("No result");
  const handleScan = (data) => console.log(data);
  const handleError = (err) => console.error(err);

  useEffect(() => {
    // firebaseDB.child("Rice").once("value", (snapshot) => {
    //   if (snapshot.val() !== null) {
    //     setValues({ ...snapshot.val() });
    //   } else {
    //     setValues({});
    //   }
    // });
    // return () => {
    //   setValues({});
    // };
  }, []);

  useEffect(() => {
    // firebaseDB.child("Users").once("value", (snapshot) => {
    //   if (snapshot.val() !== null) {
    //     setUsers({ ...snapshot.val() });
    //   } else {
    //     setUsers({});
    //   }
    // });
    // return () => {
    //   setUsers({});
    // };
  }, []);

  return (
    <div className="container mt-3">
      <Container> 
      <h1>Scan QR</h1>
          <hr />
            <Link className="mb-5 btn btn-info" href="admin/qr-scanner">
              <IconMd.MdOutlineQrCodeScanner
                style={{ height: 240, width: 320 ,color: 'black'}}
              />
            </Link>
      </Container>



      {/* <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ display: "block", width: "100%" }}>
          <h1>All Rice : {AllRice.length}</h1>
        </div>
        <div
          className="itemflex"
          style={{
            padding: "10px",
            maxWidth: "50%",
            marginTop: "0px",
            marginBottom: "0px",
            width: "20%",
          }}
        >
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)",
            }}
          >
            <Card.Body className="mx-auto text-center">
              <Card.Title>
                {" "}
                {TypeRices("ข้าวหอมมะลิทุ่งกุลา").length}{" "}
              </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {" "}
                ข้าวหอมมะลิทุ่งกุลา{" "}
              </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div
          className="itemflex"
          style={{
            padding: "10px",
            maxWidth: "50%",
            marginTop: "0px",
            marginBottom: "0px",
            width: "20%",
          }}
        >
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)",
            }}
          >
            <Card.Body className="mx-auto text-center">
              <Card.Title> {TypeRices("ข้าวหอมมะลิ 105").length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {" "}
                ข้าวหอมมะลิ 105{" "}
              </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div
          className="itemflex"
          style={{
            padding: "10px",
            maxWidth: "50%",
            marginTop: "0px",
            marginBottom: "0px",
            width: "20%",
          }}
        >
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)",
            }}
          >
            <Card.Body className="mx-auto text-center">
              <Card.Title>
                {" "}
                {TypeRices("ข้าวเหนียวพันธุ์ กข.6").length}{" "}
              </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {" "}
                ข้าวเหนียวพันธุ์ กข.6{" "}
              </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div
          className="itemflex"
          style={{
            padding: "10px",
            maxWidth: "50%",
            marginTop: "0px",
            marginBottom: "0px",
            width: "20%",
          }}
        >
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)",
            }}
          >
            <Card.Body className="mx-auto text-center">
              <Card.Title> {TypeRices("ข้าวเหนียวเขาวง").length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {" "}
                ข้าวเหนียวเขาวง{" "}
              </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div
          className="itemflex"
          style={{
            padding: "10px",
            maxWidth: "50%",
            marginTop: "0px",
            marginBottom: "0px",
            width: "20%",
          }}
        >
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)",
            }}
          >
            <Card.Body className="mx-auto text-center">
              <Card.Title>
                {" "}
                {TypeRices("ข้าวเหนียวเขี้ยวงู้").length}{" "}
              </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {" "}
                ข้าวเหนียวเขี้ยวงู้{" "}
              </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div
          className="itemflex"
          style={{
            padding: "10px",
            maxWidth: "50%",
            marginTop: "0px",
            marginBottom: "0px",
            width: "20%",
          }}
        >
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)",
            }}
          >
            <Card.Body className="mx-auto text-center">
              <Card.Title>
                {" "}
                {TypeRices("ข้าวเหนียวดำ(ข้าวก่ำ)").length}{" "}
              </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {" "}
                ข้าวเหนียวดำ(ข้าวก่ำ){" "}
              </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div
          className="itemflex"
          style={{
            padding: "10px",
            maxWidth: "50%",
            marginTop: "0px",
            marginBottom: "0px",
            width: "20%",
          }}
        >
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)",
            }}
          >
            <Card.Body className="mx-auto text-center">
              <Card.Title> {TypeRices("ข้าวเหลืองปะทิว").length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {" "}
                ข้าวเหลืองปะทิว{" "}
              </Card.Text>
            </Card.Footer>
          </Card>
        </div>

        <div
          className="itemflex"
          style={{
            padding: "10px",
            maxWidth: "50%",
            marginTop: "0px",
            marginBottom: "0px",
            width: "20%",
          }}
        >
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)",
            }}
          >
            <Card.Body className="mx-auto text-center">
              <Card.Title> {TypeRices("ข้าวเจ๊กเชยเสาไห้").length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {" "}
                ข้าวเจ๊กเชยเสาไห้{" "}
              </Card.Text>
            </Card.Footer>
          </Card>
        </div>

        <div
          className="itemflex"
          style={{
            padding: "10px",
            maxWidth: "50%",
            marginTop: "0px",
            marginBottom: "0px",
            width: "20%",
          }}
        >
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)",
            }}
          >
            <Card.Body className="mx-auto text-center">
              <Card.Title> {TypeRices("ข้าวกล้อง").length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {" "}
                ข้าวกล้อง{" "}
              </Card.Text>
            </Card.Footer>
          </Card>
        </div>

        <div
          className="itemflex"
          style={{
            padding: "10px",
            maxWidth: "50%",
            marginTop: "0px",
            marginBottom: "0px",
            width: "20%",
          }}
        >
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)",
            }}
          >
            <Card.Body className="mx-auto text-center">
              <Card.Title> {TypeRices("ข้าวไรซ์เบอร์รี่").length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {" "}
                ข้าวไรซ์เบอร์รี่{" "}
              </Card.Text>
            </Card.Footer>
          </Card>
        </div>

        <div
          className="itemflex"
          style={{
            padding: "10px",
            maxWidth: "50%",
            marginTop: "0px",
            marginBottom: "0px",
            width: "20%",
          }}
        >
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)",
            }}
          >
            <Card.Body className="mx-auto text-center">
              <Card.Title> {TypeRices("ข้าวมันปู").length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {" "}
                ข้าวมันปู{" "}
              </Card.Text>
            </Card.Footer>
          </Card>
        </div>

        <div
          className="itemflex"
          style={{
            padding: "10px",
            maxWidth: "50%",
            marginTop: "0px",
            marginBottom: "0px",
            width: "20%",
          }}
        >
          <Card
            style={{
              backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)",
            }}
          >
            <Card.Body className="mx-auto text-center">
              <Card.Title>
                {" "}
                {TypeRices("ข้าวสังข์หยดพัทลุง").length}{" "}
              </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {" "}
                ข้าวสังข์หยดพัทลุง{" "}
              </Card.Text>
            </Card.Footer>
          </Card>
        </div>
      </div> */}

      <Container>
        <Row>
          <h1>List Users</h1>
          <hr />
          <Col>
            <Card
              style={{
                backgroundImage: "linear-gradient(to right, #00DE32, #038905)",
                color: "white",
              }}
            >
              <Card.Body className=" text-center">
                <Card.Title>{AllUsers.length} </Card.Title>
              </Card.Body>
              <Card.Footer className="text-right">
                <Card.Text> ALL USER </Card.Text>
              </Card.Footer>
            </Card>
          </Col>
          <Row className="mt-3 mb-4 p-2">
            <Col>
              <Card
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #00DE32, #038905)",
                  color: "white",
                }}
              >
                <Card.Body className=" text-center">
                  <Card.Title>{TypeUsers("Admin").length} </Card.Title>
                </Card.Body>
                <Card.Footer className="text-right">
                  <Card.Text> ADMIN </Card.Text>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #FF6D24, #FF2A00)",
                  color: "white",
                }}
              >
                <Card.Body className=" text-center">
                  <Card.Title>{TypeUsers("User").length} </Card.Title>
                </Card.Body>
                <Card.Footer className="text-right">
                  <Card.Text> USER </Card.Text>
                </Card.Footer>
              </Card>
            </Col>
          </Row>

          <h1>รายการข้าว</h1>
          <hr />
          <ListRiceAdmin />
        </Row>
      </Container>
    </div>
  );
}
