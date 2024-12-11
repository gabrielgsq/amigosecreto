import React from 'react'
import { Outlet, Link } from 'react-router-dom';

function Landingpage() {
  return (
    <div>
      <h1>Landing page</h1>
      <Link to="/about">oi</Link>
      <Outlet/>
    </div>
  )
}

export default Landingpage
