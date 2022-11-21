import React, { useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import axios from "axios";




export default function Dashbord() {
  

  useEffect(() => {
    axios.get("http://localhost:3030/rice").then((response) => {
      setValues(response.data);
    });
  }, []);

  const [values, setValues] = useState({});
  const RiceCategory = Object.keys(values).map((id) => values[id].RiceCategory);

  console.log(RiceCategory);
  console.log(values);

  return (
    <div>
      <Container>
      
      </Container>
    </div>
  );
}
