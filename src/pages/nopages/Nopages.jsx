import React from "react";
import { useNavigate } from "react-router-dom";



const Nopages = () => {
  const navigate = useNavigate()
  return (
    <div>
      404 Found
     <button onClick={()=> navigate(-1)}>Go Back</button>
    </div>
  );
};

export default Nopages;
