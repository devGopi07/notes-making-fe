import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Notes.css";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../../App";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import OpenWithRoundedIcon from "@mui/icons-material/OpenWithRounded";

export default function Notes({ mode, setMode, search, setSearch }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  let [data, setData] = useState([]);
  let [data1, setData1] = useState([]);

  const getNotes = async () => {
    try {
      let payload = { email };
      console.log(payload);
      let data = await axios.post(`${url}/notes`, payload);
      console.log(data);
      toast.success(data.data.message);
      setData(data.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteNote = async (id) => {
    console.log(id);

    try {
      let data = await axios.delete(`${url}/notes/deleteNote/${id}`);
      console.log(data);
      toast.error(data.data.message);
      getNotes();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    try {
      if (token) {
        getNotes();
      } else {
        toast.error("Token Has been Expired Login Again");
        navigate("/signin");
      }
    } catch (error) {
      if (error.response.status > 399 || error.response.status < 500) {
        toast.error(error.response.data);
        navigate("/signin");
      }
    }
  }, []);

  useEffect(() => {
    if ( search ==="") { 
      setData(data);
      getNotes();
      // console.log(data);
    }  
  }, [search]);

  return (
    <div className="notes">
      <Navbar
        mode={mode}
        setMode={setMode}
        search={search}
        setSearch={setSearch}
      />
      <div className="notes-outer container">
        
         {search=="" ? data.map((data, idx) => {
        console.log(data.title==search);
          return (
            <Card
            key={idx}
            style={{
              Height: "100px",
              width: "300px",
              backgroundColor: mode ? "#af18cd" : "White",
            }}
          >
            <Card.Body
              style={{ padding: "5px" }}
              className="main-carouselcardsbody"
            >
              <Card.Text
                className="main-title"
                style={{ padding: "5px", color: mode ? "White" : "black" }}
              >
                {data.title}
              </Card.Text>
              <Card.Text
                className="main-content"
                style={{ padding: "5px", color: mode ? "White" : "black" }}
              >
                {data.content}
              </Card.Text>
              <div className="main-date-div">
                <Card.Text
                  className="main-date"
                  style={{ padding: "5px", color: mode ? "White" : "black" }}
                >
                  Created On
                </Card.Text>
                <Card.Text
                  className="main-date"
                  style={{ padding: "5px", color: mode ? "White" : "black" }}
                >
                  {data.createdAt.slice(0, 10)}
                </Card.Text>
              </div>

              <div className="btns">
                <OpenWithRoundedIcon
                  style={{
                    color: mode ? "white" : "black",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/notes/${data._id}`)}
                />
                <EditRoundedIcon
                  style={{
                    color: mode ? "white" : "black",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/updatenote/${data._id}`)}
                />
                <DeleteRoundedIcon
                  style={{
                    color: mode ? "white" : "black",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteNote(data._id)}
                />
              </div>
            </Card.Body>
          </Card>  ); 
        }):data.map((data, idx) => {
        console.log(data.title==search);
          return (
            data.title===search ?  <Card
            key={idx}
            style={{
              Height: "100px",
              width: "300px",
              backgroundColor: mode ? "#af18cd" : "White",
            }}
          >
            <Card.Body
              style={{ padding: "5px" }}
              className="main-carouselcardsbody"
            >
              <Card.Text
                className="main-title"
                style={{ padding: "5px", color: mode ? "White" : "black" }}
              >
                {data.title}
              </Card.Text>
              <Card.Text
                className="main-content"
                style={{ padding: "5px", color: mode ? "White" : "black" }}
              >
                {data.content}
              </Card.Text>
              <div className="main-date-div">
                <Card.Text
                  className="main-date"
                  style={{ padding: "5px", color: mode ? "White" : "black" }}
                >
                  Created On
                </Card.Text>
                <Card.Text
                  className="main-date"
                  style={{ padding: "5px", color: mode ? "White" : "black" }}
                >
                  {data.createdAt.slice(0, 10)}
                </Card.Text>
              </div>

              <div className="btns">
                <OpenWithRoundedIcon
                  style={{
                    color: mode ? "white" : "black",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/notes/${data._id}`)}
                />
                <EditRoundedIcon
                  style={{
                    color: mode ? "white" : "black",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/updatenote/${data._id}`)}
                />
                <DeleteRoundedIcon
                  style={{
                    color: mode ? "white" : "black",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteNote(data._id)}
                />
              </div>
            </Card.Body>
          </Card>
          :
           "" ); 
        })}
       

        
      </div>
    </div>
  );
}
