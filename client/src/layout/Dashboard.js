import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { linkDB } from "../constant";

import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

export default function Dashboard() {
  const [rices, setRices] = useState({});
  const [types, setTypes] = useState({});
  const [riceDashboard, setRiceDashboard] = useState({});

  const AllRice = Object.keys(rices).map((id) => rices[id].RiceCategory);

  const Totle = Object.keys(riceDashboard).map(
    (id) => riceDashboard[id]["SUM(`RiceQuantity`)"]
  );
  const Count = Object.keys(riceDashboard).map(
    (id) => riceDashboard[id]["COUNT(`RiceQuantity`)"]
  );
  const Type = Object.keys(riceDashboard).map(
    (id) => riceDashboard[id].RiceCategory
  );

  const TypeRices = (typeRice) => {
    return AllRice.filter((RiceType) => RiceType === typeRice);
  };

  // const Type = Object.keys(types).map((id) => types[id].type);

  useEffect(() => {
    axios.get(linkDB + "/rice").then((response) => setRices(response.data));

    axios.get(linkDB + "/type").then((response) => setTypes(response.data));

    axios
      .get(linkDB + "/type-dashboard")
      .then((response) => setRiceDashboard(response.data));
  }, []);

  console.log("Rice Dashboard", riceDashboard);
  console.log("Count", Count);
  console.log("Totle", Totle);
  console.log("Rice Category", Type);

  const data = {
    labels: Type,
    datasets: [
      {
        label: "ปริมาณ ",
        data: Totle,
        borderWidth: 2,
      },
    ],
  };

  return (
    <Container>
      <h2 style={{ textAlign: "center" }}>ปริมาณข้าว</h2>
      {/* <table id="column-example-20" className="charts-css column show-labels">
          <tbody>
            {Type.map((index, value) => (
              <tr key={index}>
               <th scope="row" style={{fontSize:'5px',overflow:'hidden',textOverflow:'ellipsis'}}>{Type[value]}</th>
                <td style={{ "--size": TypeRices(Type[value]).length/rices.length }}></td>
              </tr>
            ))}
          </tbody>
          
      </table> */}
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "ปริมาณข้าวและประเภทข้าวที่ฝาก",
            },
          },
        }}
      />
    </Container>
  );
}
