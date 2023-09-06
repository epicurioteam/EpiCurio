import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import { useState, useEffect } from "react";

import useStyles from "./styles";
import memories from "../../images/memories.png";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/");
  };

  return (
    <nav className="flex flex-1 justify-between max-width-[1300px] h-[50px] bg-tranparent py-2 my-3 mx-[24px]">
      <ul className="inline-flex justify-between gap-8">
        <Link to={"/home"}>
          <img
            src={memories}
            alt="logo"
            className="object-contain w-[40px] h-[40px]"
          />
        </Link>
        <Link to={"/home"}>
          {" "}
          <li className="font-semibold hover:underline text-lg">Home</li>
        </Link>

        <Link to={"/form"}>
          <li className="font-semibold hover:underline text-lg">Add Item</li>
        </Link>
      </ul>
      <ul>
        <Link to={"/admin"}>
          <li className="font-semibold hover:underline text-lg">Admin</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
