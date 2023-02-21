import React from "react";
import "../css/Footer.css";

function Footer() {

  return (
    // <div className="div-footer" style={{position:'absolute',bottom:'0px',width:'100%'}}>
    <div>
      <footer className="text-center text-white" style={{ backgroundColor: "#019067" }}>
        <div className="container p-4 pb-0">   
            <p className="text-white">
              MILL PROJECT
            </p>
        </div>
        <div className="text-center p-3">
          © 2022 By : ----
        </div>
      </footer>
    </div>
  );
}
export default Footer;
