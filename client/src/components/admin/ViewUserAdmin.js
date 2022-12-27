import React from "react";
import { useParams } from "react-router-dom";

export default function ViewUserAdmin() {
  const { id } = useParams();
  return (
    <div>
      <h1>ViewUserAdmin</h1>
      <h2>{id}</h2>
    </div>
  );
}
