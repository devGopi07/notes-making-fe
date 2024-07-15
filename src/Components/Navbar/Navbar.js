import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

import Brightness3Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Navbar({ mode, setMode, search, setSearch }) {
  let [value, setValue] = useState("");
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }
  return (
    <div className="Navbar">
      <AppBar sx={{ backgroundColor: mode ? "#af18cd" : "" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Button
              component="a"
              sx={{
                mr: 2,
                ml: 0,
                display: { md: "flex" },
                color: "white",
                fontFamily: "poppins",
              }}
              onClick={() => navigate("/notes")}
            >
              <h3 style={{ marginBottom: "0px" }}>Notes Maker</h3>
            </Button>
            <Box sx={{ flexGrow: 1, display: "flex", gap: "10px" }}>
              <Button
                color="inherit"
                // variant="contained"
                onClick={(mode) => navigate("/notes")}
              >
                Notes
              </Button>

              <Button color="inherit" onClick={() => navigate("/Addnote")}>
                Add New Note
              </Button>
            </Box>

            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              style={{ color: "white", backgroundColor: "white" }}
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            > 
            </TextField> 
            <Button
              color="inherit"
              onClick={() => setMode(!mode)}
              endIcon={mode ? <Brightness7Icon /> : <Brightness3Icon />}
            > 
            </Button>

            <Tooltip title="Logout">
              <IconButton
                color="inherit"
                style={{ marginLeft: 5, padding: "0px ! important" }}
                onClick={() => logout()}
              >
                <LogoutIcon fontSize="medium" sx={{ color: "white " }} />
                <p
                  style={{
                    color: "white",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    margin: "0px 0px 0px 0px",
                    fontSize: "15px",
                  }}
                >
                  Logout
                </p>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
