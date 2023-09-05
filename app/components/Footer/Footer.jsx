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
import { Link } from "react-router-dom";
import footerLogo from "../../assets/ob_logo-black.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Footer = () => {
  return (
    <Stack component={"footer"} className="footer">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        className="container"
      >
        <Stack className="row">
          <img src={footerLogo} alt="" />
        </Stack>
        <Stack className="row">
          <Typography
            variant="h6"
            component="label"
            fontWeight={700}
            className="rowTitle"
          >
            Enlaces
          </Typography>
          <List disablePadding>
            <Link to="/">Inicio</Link>
            <Link to="/services">Servicios</Link>
            <Link to="/store">Tienda</Link>
            <Link to="/about">Conócenos</Link>
          </List>
        </Stack>
        <Stack className="row">
          <Typography
            variant="h6"
            component="label"
            fontWeight={700}
            className="rowTitle"
          >
            Síguenos
          </Typography>
          <List disablePadding>
            <Link to="https://www.facebook.com/obinteriorismo">
              <FacebookIcon fontSize="large" />
            </Link>
            <Link to="https://www.instagram.com/obinteriorismo">
              <InstagramIcon fontSize="large" />
            </Link>
            <Link to="https://www.pinterest.com.mx/obinteriorismo/">
              <PinterestIcon fontSize="large" />
            </Link>
          </List>
        </Stack>
        <Stack className="row">
          <Typography
            variant="h6"
            component="label"
            fontWeight={700}
            className="rowTitle"
          >
            Contáctanos
          </Typography>
          <List disablePadding>
            <Link to="/contact">Contacto</Link>

            <p className="text">
              Boulevard Hacienda El Jacal #1303 Mansiones del Valle
            </p>
            <p className="text">Plaza TreceØTres, Int. 4</p>
            <br />
            <p className="underline">Teléfono: (52) 442-1914784</p>
          </List>
        </Stack>
      </Stack>
      <Typography variant="subtitle2" component="div">
        Powered by: Heracles Web
      </Typography>
    </Stack>
  );
};

export default Footer;
