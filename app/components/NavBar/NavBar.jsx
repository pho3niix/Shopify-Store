import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Stack,
  Button,
  Menu,
  MenuItem,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import logo from "../../assets/ob_logo.png";
import logo_text from "../../assets/ob_logo_text.png";
import SideMenu from "./DrawerMenu";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar
      component={"nav"}
      className="AppBar"
    >
      <Toolbar className="ToolBar">
        <Stack spacing={1} direction="row" className="leftContainer">
          <Stack
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <SideMenu />
          </Stack>
          <Stack className="logoContainer">
            <Link to="/">
              <IconButton>
                <img src={logo} className="imgLogo" />
                <img src={logo_text} className="imgLogoText" />
              </IconButton>
            </Link>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} className="rightContainer">
          <List className="list">
            <ListItemButton>
              <Link to="/" className="NavLink">
                <Typography>Inicio</Typography>
              </Link>
            </ListItemButton>
            <ListItemButton>
              <Link to="/services" className="NavLink">
                <Typography>Servicios</Typography>
              </Link>
            </ListItemButton>
            <ListItemButton>
              <Link to="/store" className="NavLink">
                <Typography>Tienda</Typography>
              </Link>
            </ListItemButton>
            <ListItemButton>
              <Link to="/about" className="NavLink">
                <Typography>Conócenos</Typography>
              </Link>
            </ListItemButton>
            <ListItemButton>
              <Link to="/contact" className="NavLink">
                <Typography>Contacto</Typography>
              </Link>
            </ListItemButton>
          </List>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
