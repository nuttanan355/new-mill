import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

var d = new Date();
var saveCurrentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
var saveCurrentTime =
  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var dateKey = saveCurrentDate + "," + saveCurrentTime;

function genKey() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

export default function EditRiceAdmin() {
  const { id } = useParams();
  const [users, setUsers] = useState({});
  const [values, setValues] = useState({});

  const RiceID = Object.keys(values).map((id) => values[id].RiceID);
  const RiceId = (ret) => {
    return RiceID.filter((rets) => rets == ret);
  };
  console.log(RiceId(id));

  const [temp, setTemp] = useState({
    RiceDayCheck: "dateKey",
    RiceO2: "link",
    RiceMoisture: "link",
  });

  useEffect(() => {
    axios.get("http://localhost:3030/rice").then((response) => {
      setValues(response.data);
    });
  }, []);

  const handleOnChange = (e) => {
    setTemp({ ...temp, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
