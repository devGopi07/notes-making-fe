import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar"; 
import { TextField, TextareaAutosize } from "@mui/material";
import { Button } from "react-bootstrap";
import { useNavigate,  useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { url as urll } from "../../App";
import { toast } from "react-toastify";

const noteValidationSchema = yup.object({
  title: yup.string().required("Title field cant be empty"),

  content: yup.string().required("Content field cant be empty")
});

export function UpdateNote({ mode, setMode }) {  
  const { id } = useParams(); 
  const navigate=useNavigate()
  const token=localStorage.getItem("token")
  
  const [note, setNote] = useState(null);

  const getData = async () => {
    try {
      let res = await axios.get(`${urll}/notes/getNote/${id}`);
      console.log(res.data.data[0]);
      setNote(res.data.data[0]);
      toast.success(res.data.message);
      // navigate("/mobiles");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
 

  useEffect(() => {
    try {
      if (token) {
        getData();
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
    <div className="Buypage">
      <Navbar mode={mode} setMode={setMode} />
      {note ? <Updatepage note={note} mode={mode} setMode={setMode} /> : ""} 
    </div>
  );
}

export default function Updatepage({ note, mode, setMode }) {
  let [past, setPast] = useState(note);
  // console.log("past", past.title); 

  const { id } = useParams();


  const navigate = useNavigate();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        title: past.title,
        content: past.content, 
      },
      validationSchema: noteValidationSchema,
      onSubmit: (newMobile) => {
        console.log("Form Values Are", newMobile);
        addMobile(newMobile);
      },
    });

  const addMobile = async (newMovies) => {
    let { title, content } = newMovies;
    let payload = {title, content};
    console.log("this is PAYLOAD", payload);
    try {
      console.log(newMovies);
      let res = await axios.put(`${urll}/notes/updateNote/${id}`, payload);
      console.log(res);
      toast.success(res.data.message);
      navigate("/notes");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="updatepage">
      <Navbar mode={mode} setMode={setMode} />
      <div className="buy-div-outer">
        <form onSubmit={handleSubmit} className="buy-div">
          <h1 className="buy-title">Update Notes</h1>
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
            style={{ backgroundColor: mode ? "#af18cd" : "White",color:mode?"White":"black" }}
            variant="contained"
            type="submit"
          >
            Update
          </Button>
        </form>
      </div> 
    </div>
  );
}
