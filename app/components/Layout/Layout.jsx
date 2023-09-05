import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Stack } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Stack className="layoutContainer">
      <Stack className="headerContainer">
        <NavBar />
      </Stack>
      <Stack className="contentContainer">{children}</Stack>
      <Stack className="footerContainer">
        <Footer />
      </Stack>
    </Stack>
  );
};

export default Layout;
