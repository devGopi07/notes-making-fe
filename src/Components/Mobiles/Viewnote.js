import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar"; 
import { Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { url } from "../../App";
import axios from "axios";

export default function Viewnote({ mode, setMode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  let [data, setData] = useState({});
  let [date, setDate] = useState();

  const token = localStorage.getItem("token");

  const getNote = async () => {
    try {
      let data = await axios.get(`${url}/notes/getNote/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      toast.success(data.data.message);
      setData(data.data.data[0]);
      setDate(data.data.data[0].createdAt.slice(0, 10));
      console.log("DATA", data.data.data[0]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    try {
      if (token) {
        getNote();
      } else {
        toast.error("Token Has been Expired Login Again");
        navigate("/signin");
      }
    } catch (error) {
      if (error.response.status > 399 || error.response.status < 500) {
        toast.error(error.response.data);
        //   navigate("/signin");
      }
    }
  }, []);

  return (
    <div className="view-note">
      <Navbar mode={mode} setMode={setMode} />
      <div
        className="view-note-outer col-lg-10 col-md-8 col-sm-5"
        style={{
          backgroundColor: mode ? "#af18cd" : "White",
          color: mode ? "white" : "Black",
        }}
      >
        <div className="title-date">
          <h3>{data.title}</h3>
          <p style={{ fontFamily: "poppins", fontWeight: "500" }}>
            {" "}
            Created On {date}
          </p>
        </div>
        <p>{data.content}</p>
      </div>
    </div>
  );
}
