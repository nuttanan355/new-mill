import React from 'react'
import { Link } from 'react-router-dom';


function testrouter() {
    return (
        <div>
            <a as={Link} to='/'>Home</a>
            <a as={Link} to='/rice'>Rice</a>
        </div>
    )
}

export default testrouter