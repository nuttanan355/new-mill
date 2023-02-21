import React, { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QRscanner() {
    const QRCode = useRef();
  const [qrscan, setQrscan] = useState("Not Result");



  return (
      <div className="pt-3 text-center"style={{backgroundColor:'red',height:'100vw',maxHeight:'600px'}}>
        <h2>QR Scanner</h2>
        <hr/>
        {qrscan == "Not Result" ? (
       <>
          <div className="container mt-2" style={{ backgroundColor:'gray',height: "25rem", width: "25rem" }}>
            <QrReader
              delay={300}
              onResult={(result, error) =>
                result
                  ? setQrscan(result?.text)
                  : error
                  ? console.info(error)
                  : console.log("Null Var")
              }
              style={{ height: 240, width: 320 }}
            />
          </div>
       </>
        ) : (
        
            window.location.href = qrscan
            // window.location.href = `/view-rice/${qrscan}`
            // window.open(qrscan)

          
        )}

        {/* <div className="form-group">
          <textarea
            className="form-control"
            defaultValue={qrscan}
            value={qrscan}
          ></textarea>
        </div> */}

      </div>
 
  );
}
