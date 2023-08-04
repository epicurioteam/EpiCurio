import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Switch } from "react-router";

import NavBar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { useState, useEffect } from "react";

// what lies in curly braces are JavaScript functions. They can be used the same as HTML mark-up components

const App = () => {

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Auth/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
