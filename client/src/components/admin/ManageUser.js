import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { LinkDB } from '../../LinkDB';

export default function ManaageUser() {

const [users,setUsers] = useState({});

useEffect(()=>{
var DbLink = LinkDB+"user";
axios.post(DbLink).then((response) => {
  console.log(response.data);
  setUsers(response.data);
});


},[])



  return (
    <div className="container">
      

      <div className="container">
        <div className="table-responsive mt-5">
        <h5>ตารางผู้ใช้งาน</h5>
          <Table className="table table-striped
          table-hover	
          table-borderless
          table-primary
          align-middle">
            <thead className="table-light">
              <tr>
                <th>ชื่อ</th>
                <th>เบอร์โทร</th>
                <th>Type</th>
              </tr>
              </thead>
              <tbody className="table-group-divider">
                {Object.keys(users).map((id,i)=>{
                  return(
                    <tr className="table-primary" key={i}>
                    <td scope="row">{users[id].name}</td>
                    <td>{users[id].phone}</td>
                    <td>{users[id].type}</td>
                  </tr>
                  )
                })}
       
              </tbody>    
          </Table>
        </div>
      </div>
      
    </div>
  )
}
