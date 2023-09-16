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
import ShoppingCart, { useDrawer } from '../ShoppingCart/Drawer';
import { useMatches } from '@remix-run/react';
import { useFetchers } from '@remix-run/react';
import { useEffect } from 'react';
import { CartForm } from '@shopify/hydrogen';

const NavBar = () => {
  const [root] = useMatches();
  const cart = root.data?.cart;

  const {
    isOpen,
    openDrawer,
    closeDrawer
  } = useDrawer();

  const fetchers = useFetchers();
  const addToCartFetchers = [];
  for (const fetcher of fetchers) {
    const formData = fetcher.submission?.formData;
    if (formData) {
      const formInputs = CartForm.getFormInput(formData);
      if (formInputs.action === CartForm.ACTIONS.LinesAdd) {
        addToCartFetchers.push(fetcher);
      }
    }
  }
  // When the fetchers array changes, open the drawer if there is an add to cart action
  useEffect(() => {
    if (isOpen || addToCartFetchers.length === 0) return;
    openDrawer();
  }, [addToCartFetchers]);

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
                <ShoppingCart cart={cart} isOpen={isOpen} onClick={openDrawer} onClose={closeDrawer} />
              </Badge>
            </ListItemButton>
          </List>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
