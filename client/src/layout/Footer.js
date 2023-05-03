import React, { useState, useEffect } from "react";
import "../css/Footer.css";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as RiIcons from "react-icons/ri";
import Swal from "sweetalert2";


function Footer() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // firebase.auth().onAuthStateChanged((user) => {
    //   setUser(user);
    // });
  }, []);
  function myFunction() {
    /* Get the text field */
    var copyText = document.getElementById("myInput");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
    /* Alert the copied text */
    // alert("คัดลอก" + copyText.value + " เรียบร้อย");
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "คัดลอก " + copyText.value,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  return (
    <div>
      <footer className="text-center text-white" style={{ backgroundColor: "#019067" }}>
        <div className="container p-4 pb-0">   
            <p className="text-white">
              MILL PROJECT
            </p>
        </div>
        <div className="text-center p-3">
          © 2022 By : KMUTNB-TCT30
        </div>
      </footer>
    </div>
  );
}
export default Footer;
