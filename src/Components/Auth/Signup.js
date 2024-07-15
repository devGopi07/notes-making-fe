import "./Auth.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button"; 
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { Checkbox, TextField } from "@mui/material"; 
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../../App";

const CreateSchemaValidation = yup.object({
  name: yup.string().required("Please Enter Your Name"),
  email: yup.string().email().required("Please Enter A Valid Email"),
  password: yup.string().required("Minimum 8 Characters Required").min(8),
  confirmPassword: yup.string().required("Password Doesn't Match").min(1),
});

export default function Signup() {
  const navigate = useNavigate();
  let [show, setShow] = useState(false);
  const [sent,setSent]=useState(false)


  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: CreateSchemaValidation,
      onSubmit: (val) => {
        Create(val);
      },
    });

  const Create = async (val) => {
    let { name, email, password, confirmPassword } = val;
    let payload = { name, email, password, confirmPassword };
    try {
      let res = await axios.post(`${url}/users/signUp`, payload);
      console.log("RESULT",res);
      localStorage.setItem("token",res.data.token)
      toast.success(res.data.message);
      setSent(!sent)
      navigate("/signin");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="login-main"> 
      {sent?<form
          className="outer-div shadow-lg p-3 bg-white rounded"
          onSubmit={handleSubmit}
        >
          <h2 className="title">{sent?"Account Created":"Create A New Account"}</h2>
           <h5 className="signup-p"> We Sent You A Account Activation Link To Your Mail Id Click It To Verify Your Account. </h5>
          <div className="login-bottom">
            <Link to="/login">Already Have An Account? Login.</Link>
            <Link to="/forget">Forget Password</Link>
          </div>
        </form>:<form
          className="outer-div shadow-lg p-3 bg-white rounded"
          onSubmit={handleSubmit}
        >
          <h2 className="title">Create A New Account</h2>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name? <p style={{color:"red"}}>*{errors.name}</p>: ""}
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email? <p style={{color:"red"}}>*{errors.email}</p>: ""}
          <TextField
            label="Password"
            variant="outlined"
            type={show ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password? <p style={{color:"red"}}>*{errors.password}</p>: ""}
          <TextField
            label="Confirm Password"
            variant="outlined"
            type={show ? "text" : "password"}
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmPassword && errors.confirmPassword ? <p style={{color:"red"}}>*{errors.confirmPassword}</p>: ""}
          {touched.confirmPassword &&(values.confirmPassword.length > 0 && values.confirmPassword!==values.password)? <p style={{color:"red"}}>* Password Doesn't Match</p>: ""}
          <div className="checkbox-div">
            <Checkbox onClick={() => setShow(!show)} />
            <p>Show Password</p>
          </div>
          <Button
              style={{ 
                backgroundColor: "#4e73df",
                borderColor: "#4e73df",
                color: "#fff",
                borderRadius: "20px",
              }}
              variant="primary"
              type="submit" 
            >
              Submit
            </Button>
          <div className="login-bottom">
            <Link to="/login">Already Have An Account? Login.</Link>
            <Link to="/forget">Forget Password</Link>
          </div>
        </form>} 
    </div>
  );
}





        // <Form
        //   className=" shadow-lg p-3 mb-5 bg-white rounded"
        //   onSubmit={handleSubmit}
        // >
        //   <div style={{ textAlign: "center", fontFamily: "Montserrat" }}>
        //     <h2 style={{}}>Create A New Account</h2>
        //   </div>
        //   <div className="login-fields">
        //     <TextField
        //       className="input-field"
        //       label="name"
        //       variant="outlined"
        //       onBlur={handleBlur}
        //       name="name"
        //       value={values.name}
        //       onChange={handleChange}
        //       style={{
        //         marginTop: "20px",
        //         fontSize: "15px",
        //       }}
        //     />
        //     {touched.name && errors.name ? (
        //       <p style={{ color: "red" }}>{errors.name}</p>
        //     ) : (
        //       ""
        //     )}

        //     <TextField
        //       label="Email"
        //       variant="outlined"
        //       onBlur={handleBlur}
        //       name="email"
        //       value={values.email}
        //       onChange={handleChange}
        //       style={{
        //         marginTop: "20px",
        //         fontSize: "15px",
        //       }}
        //     />
        //     {touched.email && errors.email ? (
        //       <p style={{ color: "red" }}>{errors.email}</p>
        //     ) : (
        //       ""
        //     )}

        //     <TextField
        //       label="Password"
        //       type={show ? "text" : "password"}
        //       variant="outlined"
        //       onBlur={handleBlur}
        //       name="password"
        //       value={values.password}
        //       onChange={handleChange}
        //       style={{
        //         marginTop: "20px",
        //         fontSize: "15px",
        //       }}
        //     />
        //     {touched.password && errors.password ? (
        //       <p style={{ color: "red" }}>{errors.password}</p>
        //     ) : (
        //       ""
        //     )}

        //     <TextField
        //       label="Confirm Password"
        //       type={show ? "text" : "password"}
        //       variant="outlined"
        //       onBlur={handleBlur}
        //       name="confirmPassword"
        //       value={values.confirmPassword}
        //       onChange={handleChange}
        //       style={{
        //         marginTop: "20px",
        //         fontSize: "15px",
        //       }}
        //     />
        //     {touched.confirmPassword && errors.confirmPassword ? (
        //       <p style={{ color: "red" }}>{"Enter the Confirm Password"}</p>
        //     ) : (
        //       ""
        //     )}

        //     {values.confirmPassword.length &&
        //     values.password !== values.confirmPassword ? (
        //       <p style={{ color: "red" }}>{"Password Doesn't Match"}</p>
        //     ) : (
        //       ""
        //     )}

        //     <div className="checkbox-div">
        //       <Checkbox onClick={() => setShow(!show)} />
        //       <p>Show Password</p>
        //     </div>
        //     <Button
        //       style={{
        //         marginTop: "15px",
        //         backgroundColor: "#4e73df",
        //         borderColor: "#4e73df",
        //         color: "#fff",
        //         borderRadius: "20px",
        //       }}
        //       variant="primary"
        //       type="submit"
        //       // onClick={() => login()}
        //     >
        //       Create
        //     </Button>
        //   </div>

        //   <div style={{ marginTop: "25px" }}>
        //     <div className="text-center mb-1">
        //       <Link to="/forget" underline="hover">
        //         Forgot Password?
        //       </Link>
        //     </div>
        //     <div className="text-center">
        //       <Link to="/" underline="hover">
        //         Already Have A Account? Login.
        //       </Link>
        //     </div>
        //   </div>
        // </Form>