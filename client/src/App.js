import React, { useState } from 'react'
import { Routes, Route } from 'react-bootstrap';
import axios, { AxiosHeaders } from 'axios';
import { NavBar } from './test/components/NavBar.js';
import { getUser } from './components/admin/getUser';


function App() {
  const [AllUserRole, setAllUserRole] = useState([]);


  const getUserRole = () => {
    axios.get('http://localhost:3030/admin/getuser').then((response) => {
      setAllUserRole(response.data)
    })
  }

  return (
    <div>
      <button onClick={getUserRole}>getUser</button>
      {AllUserRole.map((val, key) => {
        return (
          <div>
            All : {val.AllUser}
            <br />
            Admin : {val.countAdmin}
            <br />
            User : {val.countUser}
          </div>
        )
      })}
    </div>
  )
}

export default App