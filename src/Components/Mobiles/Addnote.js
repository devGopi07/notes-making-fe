import React, { useState } from "react";
import Navbar from "../Navbar/Navbar"; 
import { Button, TextField, TextareaAutosize } from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url as urll } from "../../App";


const notesValidationSchema = yup.object({
  title: yup.string().required("Title field cant be empty"),

  content: yup.string().required("Content field cant be empty"), 
});

export default function Addnote({ mode, setMode }) {

  const email = localStorage.getItem("email");
  const navigate = useNavigate(); 

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        title: "",
        content: "", 
      },
      validationSchema: notesValidationSchema,
      onSubmit: (newNote) => {
        console.log("Form Values Are", newNote);
        addNote(newNote);
      },
    });

  const addNote = async (newNote) => { 
    let { title, content } = newNote;
    let payload = { title, content, email }
    console.log("this is PAYLOAD", payload);
    try {
      let res = await axios.post(`${urll}/notes/addNote`, payload);
      console.log(res);
      toast.success(res.data.message);
      navigate("/notes");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="Addpage">
      <Navbar mode={mode} setMode={setMode} />
      <form onSubmit={handleSubmit} className="buy-div-outer">
        <div className="buy-div">
          <h1 className="buy-title">Add A New Note</h1>
          <TextField
            id="outlined-basic"
            label="Enter The Title Of The Note"
            variant="outlined"
            value={values.title}
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && errors.title} 
          />
          {touched.title && errors.title ? <p style={{color:"red"}}> {errors.title} </p>: null}

          <TextareaAutosize
          placeholder="  Enter The Content Of The Note"
           type="textarea"
            id="outlined-basic" 
            variant="outlined"
            value={values.content}
            name="content"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.content && errors.content}
             style={{height:"200px"}}
          /> 
           {touched.content && errors.content ? <p style={{color:"red"}}> {errors.content} </p>: null}
          <Button
            className="buy-button"
            style={{ backgroundColor: mode ? "#af18cd" : "White" }}
            variant="contained"
            type="submit"
          >
            Add Note
          </Button>
        </div>
      </form> 
    </div>
  );
}
