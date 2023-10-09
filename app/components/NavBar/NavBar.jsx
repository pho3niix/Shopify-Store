import React, { useState } from 'react';
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
import { Suspense } from 'react';
import { Await } from '@remix-run/react';

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
    const [openAlert, setOpenAlert] = useState(false);

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
        setTimeout(() => {
            setOpenAlert(true)
        }, 500)
        setTimeout(() => {
            setOpenAlert(false)
        }, 3000)
    }, [addToCartFetchers]);

    return (
        <AppBar component={'nav'} className="AppBar">
            {/* Nav Section Web-view */}
            <Toolbar
                className="ToolBar"
                sx={{
                    display: { xs: "none", sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }
                }}
            >
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
                            <Await resolve={cart}>
                                {(data) => {
                                    return (
                                        <Badge badgeContent={data?.totalQuantity || 0} color="shoppingCar">
                                            <ShoppingCart data={data} isOpen={isOpen} onClick={openDrawer} onClose={closeDrawer} openAlert={openAlert} />
                                        </Badge>);
                                }}
                            </Await>
                        </ListItemButton>
                    </List>
                </Stack>
            </Toolbar>
            {/* Nav Section Mobile-view */}
            <Toolbar
                sx={{
                    display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' },
                    width: '100%'
                }}
            >
                <Stack
                    direction="row"
                    display={'flex'}
                    width={'100%'}
                    justifyContent={'space-between'}
                >
                    <Stack
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <SideMenu />
                    </Stack>
                    <Stack
                        display={'flex'}
                        flexDirection={'row'}
                        alignItems={'center'}
                    >
                        <Link to="/">
                            <IconButton>
                                <Box component="img" src={logo} width={'50px'} height={'60px'} />
                                <Box component="img" src={logo_text} width={'100px'} height={'auto'} />
                            </IconButton>
                        </Link>
                    </Stack>
                    <Stack
                        display={'flex'}
                        justifyContent={'center'}
                    >
                        <Await resolve={cart}>
                            {(data) => {
                                return (
                                    <Badge badgeContent={data?.totalQuantity || 0} color="shoppingCar">
                                        <ShoppingCart data={data} isOpen={isOpen} onClick={openDrawer} onClose={closeDrawer} openAlert={openAlert} />
                                    </Badge>);
                            }}
                        </Await>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
