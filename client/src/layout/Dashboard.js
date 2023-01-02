import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { linkDB } from "../constant";
// import { Bar } from "react-chartjs-2";




export default function Dashboard() {

  const [rices, setRices] = useState({});
  const [types, setTypes] = useState({});
  const [rices1, setRices1] = useState(
    
  );

 
  const AllRice = Object.keys(rices).map((id) => rices[id].RiceCategory);
  const TypeRices = (typeRice) => {
    return AllRice.filter((RiceType) => RiceType === typeRice);
  };

  const Type = Object.keys(types).map((id) => types[id].type);
  // const TypeUsers = (typeUser) => {
  //   return AllUsers.filter((user) => user === typeUser);
  // };

  const UserData = [{

  }]

  useEffect(() => {

    axios.get(linkDB + "/rice").then((response) => {
      setRices(response.data);
    });

    axios.get(linkDB + "/type").then((response) => {
      console.log(response.data);
      setTypes(response.data);
    });



  }, []);


  

  // console.log(RiceCategory);
  console.log(Type);
  console.log(AllRice);
  console.log(rices);
  console.log(types);

  return (
    <div>
      <Container>
        
        {/* <Bar */}
      {/* <Bar data={RiceCategory} />; */}
      </Container>
    </div>
  );
}
