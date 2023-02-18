import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import UserListRice from "./UserListRice";
import { linkDB } from "../../constant";
import Dashboard from "../../layout/Dashboard";

export default function HomeUser() {
  const [values, setValues] = useState([]);



  console.log(values);

  const RicesReturn = Object.keys(values).map((id) => values[id].RiceReturn);

  const RiceRet = (ret) => {
    return RicesReturn.filter((rets) => rets === ret);
  };

  useEffect(() => {

    const token = localStorage.getItem("token");
    
    if(token != null){
      fetch(linkDB+"/authen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            // alert("token sucess");
            // localStorage.setItem("token", data.token);
            // window.location = "/";
          } else {
            alert("token failed");
            localStorage.removeItem('token');
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

   
      axios.get(linkDB+'/rice').then((response) => {
        setValues(response.data);
        // console.log(` ${response.data}`)
      });
 

  }, []);



  return (
    <div className="container pt-2 h-100" style={{backgroundColor:'white'}}>

      <Dashboard/>
      <h1>รับฝากข้าว</h1>
    
      <div className="container mt-3">
        <UserListRice />
        {/* {values.map((id,index)=>{
          return(
            <div className="card-deck" key={index}>
              <div className="card">
                <p>R ID : {id.RiceID}</p>
              </div>
            </div>
          );
        })} */}

      </div>
    </div>
  );
}
