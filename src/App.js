 
import "./App.css"; 
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, Paper } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./Components/Auth/Signin";
import Signup from "./Components/Auth/Signup";
import Activation from "./Components/Auth/Activation";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword";   
import Addnote from "./Components/Mobiles/Addnote";
import Notes from "./Components/Mobiles/Notes";
import Viewnote from "./Components/Mobiles/Viewnote";
import { UpdateNote } from "./Components/Mobiles/UpdateNote";
 
export const url="https://notes-taking-application-backend-yidi.onrender.com" 


function App() {
  const [mode, setMode] = useState(true);
  const [search,setSearch]=useState("")
  const darkTheme = createTheme({
    palette: {
      mode: mode ? "light" : "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={{marginTop:"61px" }}>  
        <div className="App">
        <Routes>   
        <Route path="/signin" element={<Signin/>}/> 
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signUpActivation/:id" element={<Activation/>} />
        <Route path="/forget" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:id" element={<ResetPassword/>} /> 

 
        <Route path="/notes" element={<Notes mode={mode} setMode={setMode} search={search} setSearch={setSearch}/>} />  
        <Route path="/notes/:id" element={<Viewnote mode={mode} setMode={setMode} />} />    
        <Route path="/Addnote" element={<Addnote mode={mode} setMode={setMode} />} />  
        <Route path="/updatenote/:id" element={<UpdateNote mode={mode} setMode={setMode} />}  />      
      <Route path="/*" element={<Navigate to="/signin"/>}/> 
      </Routes> 
        </div> 

      {/* Pass In Comp For Theme mode={mode} setMode={setMode}  */}
        {/* <Navbar mode={mode} setMode={setMode} />
        <main>This app is using the dark mode</main> */}
      </Paper>
    </ThemeProvider>
  );
}

export default App;
