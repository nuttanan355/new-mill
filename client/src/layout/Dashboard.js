import React, { useEffect, useState } from "react";
import axios from "axios";
import { linkDB } from "../constant";

import Chart, { Legend } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

export default function Dashboard() {
  // const [rices, setRices] = useState({});
  // const [types, setTypes] = useState({});
  const [riceDashboard, setRiceDashboard] = useState({});

  // const AllRice = Object.keys(rices).map((id) => rices[id].RiceCategory);
  const CHART_COLORS = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)",
    navy: "rgb(10, 38, 71)",
    maroon: "rgb(123, 40, 105)",
    gradient: "rgb(255, 186, 186)",
    red100: "rgb(133, 0, 0)",
  };

  const Totle = Object.keys(riceDashboard).map(
    (id) => riceDashboard[id]["SUM(`RiceQuantity`)"]
  );
  const Count = Object.keys(riceDashboard).map(
    (id) => riceDashboard[id]["COUNT(`RiceQuantity`)"]
  );
  const Type = Object.keys(riceDashboard).map(
    (id) => riceDashboard[id].RiceCategory
  );

  useEffect(() => {
    // axios.get(linkDB + "/rice").then((response) => setRices(response.data));

    // axios.get(linkDB + "/type").then((response) => setTypes(response.data));

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
        backgroundColor: Object.values(CHART_COLORS),
      },
    ],
  };

  return (
    <div className="mt-5 text-center">
      <h4>ปริมาณข้าวและประเภทข้าวที่ฝาก</h4>
      <div className="div-dashbord" style={{ height: "auto", width: "50%" }}>
        <Pie
          // className="w-100 h-100"
          // width='50'
          data={data}
          options={{
            // rotation:true,
            plugins: {
              legend: {
                labels: {
                  usePointStyle: true,
                },
                position: "right",
              },
              // title:{
              //   display:true,
              //   text:'ปริมาณข้าวและประเภทข้าวที่ฝาก'
              // }
            },
          }}
        />
      </div>
    </div>
  );
}
