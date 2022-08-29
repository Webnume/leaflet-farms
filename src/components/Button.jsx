import React from "react";
import { Link } from "react-router-dom";

function Button() {
  return(
    <Link to="/mymap"><button className="button">Start</button></Link>
     
  )
}

export default Button;
