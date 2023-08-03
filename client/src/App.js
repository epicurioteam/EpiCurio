import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Switch } from "react-router";

import NavBar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { useState, useEffect } from "react";

// what lies in curly braces are JavaScript functions. They can be used the same as HTML mark-up components

const App = () => {

  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <Container maxWidth="lg">{/* NavBar always show*/}
        <Routes>
          <Route path="/" element={<Auth setUser={setUser}/>} />
          <Route path="/auth" element={<Home/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
