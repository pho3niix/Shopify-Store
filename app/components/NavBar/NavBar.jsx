import React from 'react';
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
  Badge,
} from '@mui/material';
import logo from '../../assets/ob_logo.png';
import logo_text from '../../assets/ob_logo_text.png';
import SideMenu from './DrawerMenu';
import { Link } from 'react-router-dom';
import ShoppingCart from '../ShoppingCart/Drawer';
import { useMatches } from '@remix-run/react';
import { useFetchers } from '@remix-run/react';
import { useEffect } from 'react';

const NavBar = () => {
  const [root] = useMatches();
  const cart = root.data?.cart;

  return (
    <AppBar component={'nav'} className="AppBar">
      <Toolbar className="ToolBar">
        <Stack spacing={1} direction="row" className="leftContainer">
          <Stack
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
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
        <Stack direction="row" className="rightContainer">
          <List className="list">
            <ListItemButton sx={{ justifyContent: 'center' }}>
              <Link to="/" className="NavLink">
                <Typography>Inicio</Typography>
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ justifyContent: 'center' }}>
              <Link to="/services" className="NavLink">
                <Typography>Servicios</Typography>
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ justifyContent: 'center' }}>
              <Link to="/store" className="NavLink">
                <Typography>Tienda</Typography>
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ justifyContent: 'center' }}>
              <Link to="/about" className="NavLink">
                <Typography>Conócenos</Typography>
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ justifyContent: 'center' }}>
              <Link to="/contact" className="NavLink">
                <Typography>Contacto</Typography>
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ justifyContent: 'center' }}>
              <Badge badgeContent={4} color="shoppingCar">
                <ShoppingCart cart={cart} />
              </Badge>
            </ListItemButton>
          </List>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
