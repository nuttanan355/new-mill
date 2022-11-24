import React, { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QRscanner() {
    const QRCode = useRef();
  const [qrscan, setQrscan] = useState("Not Result");



  return (
    <div>
      <div>
        <span>QR Scanner</span>
        {qrscan == "Not Result" ? (
       <>
          <div className="container my-3" style={{ backgroundColor:'blue',height: 400, width: 400 }}>
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
        
            window.location.href = `/admin/edit-rice/${qrscan}`
          
        )}

        <div className="form-group">
          <textarea
            className="form-control"
            defaultValue={qrscan}
            value={qrscan}
          ></textarea>
        </div>

      </div>
    </div>
  );
}
