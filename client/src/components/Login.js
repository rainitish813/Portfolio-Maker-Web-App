import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import NavBar from "./NavBar";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Login = () => {
  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:4000/login"
    
  );
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "794968404021-vr1ps70ib6lm90c3oa2o1jrd79v94u3d.apps.googleusercontent.com",
        callback: handleGoogle
      });
      if (window.google) {
        google.accounts.id.renderButton(document.getElementById("loginDiv"), {
          theme: "filled_black",
          text: "signin_with",
          shape: "pill",
        });
        google.accounts.id.prompt();
      }
    }
  }, [handleGoogle]);



  return (
    <div>
      <NavBar></NavBar>
      <br />
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
      >
        <ArrowBackIcon style={{ marginRight: "5px" }} /> Back
      </Button>
      <br />
      <br />

      <header style={{ textAlign: "center" }}>
        <h1>LOGIN TO CONTINUE</h1>
      </header>
      <br />
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
      </main>
      <footer></footer>
    </div>
  );
};

export default Login;
