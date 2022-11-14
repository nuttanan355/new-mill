import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';

export default function ListRiceAdmin() {

  const [values, setValues] = useState({});

  const RicesReturn = Object.keys(values).map((id) => values[id].RiceReturn);
  const RiceRet = (ret) => {
    return RicesReturn.filter((rets) => rets == ret);
  };

  useEffect(() => {
    // firebaseDB
    //   .child("Rice")
    //   //   .orderByChild("ThesisAllow")
    //   //   .equalTo(true)
    //   .on("value", (snapshot) => {
    //     if (snapshot.val() !== null) {
    //       setValues({ ...snapshot.val() });
    //     } else {
    //       setValues({});
    //     }
    //   });
    // return () => {
    //   setValues({});
    // };
  }, []);




  return (
    <div className="container">
    <Row className="mt-3 mb-4 p-2">
      <Col>
        <Card
          style={{
            backgroundImage: "linear-gradient(to right, #CCFFFF, #66CCFF)",
            color: "black",
          }}
        >
          <Card.Body className=" text-center">
            <Card.Title>{RiceRet(true).length} </Card.Title>
          </Card.Body>
          <Card.Footer className="text-right">
            <Card.Text> ส่งคืนแล้ว </Card.Text>
          </Card.Footer>
        </Card>
      </Col>
      <Col>
        <Card
          style={{
            backgroundImage: "linear-gradient(to right, #FFFFCC, #FF9933)",
            color: "Black",
          }}
        >
          <Card.Body className=" text-center">
            <Card.Title>{RiceRet(false).length} </Card.Title>
          </Card.Body>
          <Card.Footer className="text-right">
            <Card.Text> ยังไม่ส่งคืน </Card.Text>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
    <hr />
    <div className="mt-2">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Object.keys(values).map((id, i) => {
          return (
            <div key={i} className="itemflex" 
            style={{
                padding: "10px",
                maxWidth: "50%",
                marginTop: "0px",
                marginBottom: "0px",
                width: "50%", }}>

              <Card>
                <Card.Header
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}>

                  {values[id].RiceCategory}
                </Card.Header>
                <Card.Body>
                  <Row>
                  <div className="col container my-2" style={{marginLeft:"auto",marginRight:"auto"}}>
                      {/* <QRCodeCanvas value={values[id].RiceID} /> */}
                  </div>
                  </Row>
                  <Row>
                    {values[id].RiceReturn ? (
                      <div></div>
                    ) : (
                      <>
                        <Button
                          type="button"
                          className="mx-1 edit-admin-btn col"
                          variant="warning"
                          style={{ textAlign: "center" }}
                          onClick={() =>window.location.href = `/admin/edit-rice/${id}`}
                        >แก้ไข</Button>

                        <Button
                          type="button"
                          className="mx-1 edit-admin-btn col"
                          variant="success"
                          style={{ textAlign: "center" }}
                          // onClick={() => onRiceReturn(id)}
                        >ส่งคืนข้าว</Button>
                      </>
                    )}

                    <Button
                      type="button"
                      style={{ textAlign: "center" }}
                      className="mx-1 delete-admin-btn col"
                      variant="danger"
                      // onClick={() => onDelete(id)}>
                      >
                      ลบ
                    </Button>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  )
}
