import React from 'react'

export default function 
() {
  return (
    <div className="container">
        <div className="table-responsive-sm">
            <table className="table table-striped
            table-hover	
            table-borderless
            table-primary
            align-middle">
                <thead className="table-light">
                    <caption>Table Name</caption>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                        <th>Column 3</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        <tr className="table-primary" >
                            <td scope="row">Item</td>
                            <td>Item</td>
                            <td>Item</td>
                        </tr>
                        <tr className="table-primary">
                            <td scope="row">Item</td>
                            <td>Item</td>
                            <td>Item</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        
                    </tfoot>
            </table>
        </div>
        
    </div>
  )
}
