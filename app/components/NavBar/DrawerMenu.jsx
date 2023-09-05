import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const SideMenu = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => setOpenDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box p={3} width={450} textAlign={"left"}>
          <List>
            <ListItemText>
              <Typography variant="h6" color={"text.secondary"}>
                Categoría 1
              </Typography>
            </ListItemText>
            <ListItemButton>
              <Typography color={"text.secondary"}>Elemento 01</Typography>
            </ListItemButton>
            <ListItemButton>
              <Typography color={"text.secondary"}>Elemento 01</Typography>
            </ListItemButton>
            <ListItemButton>
              <Typography color={"text.secondary"}>Elemento 01</Typography>
            </ListItemButton>
            <ListItemButton>
              <Typography color={"text.secondary"}>Elemento 01</Typography>
            </ListItemButton>
            <ListItemButton>
              <Typography color={"text.secondary"}>Elemento 01</Typography>
            </ListItemButton>
          </List>
          <List>
            <ListItemText>
              <Typography variant="h6" color={"text.secondary"}>
                Categoría 2
              </Typography>
            </ListItemText>
            <ListItemButton>
              <Typography color={"text.secondary"}>Elemento 01</Typography>
            </ListItemButton>
            <ListItemButton>
              <Typography color={"text.secondary"}>Elemento 01</Typography>
            </ListItemButton>
            <ListItemButton>
              <Typography color={"text.secondary"}>Elemento 01</Typography>
            </ListItemButton>
            <ListItemButton>
              <Typography color={"text.secondary"}>Elemento 01</Typography>
            </ListItemButton>
            <ListItemButton>
              <Typography color={"text.secondary"}>Elemento 01</Typography>
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SideMenu;
