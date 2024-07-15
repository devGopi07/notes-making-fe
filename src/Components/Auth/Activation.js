import "./Auth.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; 
import { url } from "../../App"; 


export default function Activation() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(5);

  let token = localStorage.getItem("token");

  const Activation = async () => {
    console.log(token);
    let payload = { token };
    console.log(payload);

    try {
      let res = await axios.post(`${url}/users/signUpActivation`, payload);
      console.log(res);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    Activation();
  }, []); 

  if (timer !== 0) {
    setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
  }
  else{
    navigate("/login")
  }

  return (
    <div>
      <h1 className="title" style={{ marginTop: "70px" }}>
        Account Activation
      </h1>
      <div className="login-mainn">
        <div style={{ textAlign: "center", marginTop: "230px" }}>
          <h5>Your Email Is Verified Successfully</h5>
          <h6>You Can Login Now</h6>
          <p>Login Page In {timer}</p>
        </div>
      </div>
    </div>
  );
}
