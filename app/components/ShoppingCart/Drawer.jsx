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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from "react";
import { Suspense } from 'react';
import { Await, Link } from '@remix-run/react';
import { CartLineItems, CartActions, CartSummary } from '../ShoppingCart/ShoppingCart';
import MAlert from '@mui/material/Alert';
import { Stack } from '@mui/system';

export function useDrawer(openDefault = false) {
    const [isOpen, setIsOpen] = useState(openDefault);

    function openDrawer() {
        setIsOpen(true);
    }
    function closeDrawer() {
        setIsOpen(false);
    }
    return {
        isOpen,
        openDrawer,
        closeDrawer,
    };
}

const CartDrawer = ({ data, isOpen, onClose, onClick, openAlert }) => {

    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                onClick={onClick}
            >
                <ShoppingCartIcon />
            </IconButton>
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={onClose}
            >
                <Box
                    color={"black"}
                    width={{
                        xs: '20em',
                        md: 450
                    }}
                    textAlign={"left"}
                >
                    <Stack
                        padding={3}
                    >
                        <h2 className="General-Text">Carrito de compras</h2>
                    </Stack>
                    <MAlert className="Cart-Alert" severity="success" sx={{ width: '100%', display: openAlert ? 'flex' : 'none', marginBottom: 1 }}>
                        Producto agregado con éxito.
                    </MAlert>
                    {data?.totalQuantity > 0 ? (
                        <Stack
                            display={'flex'}
                            direction={'column'}
                            justifyContent={'space-between'}
                        >
                            <Stack
                                padding={3}
                            >
                                <CartLineItems linesObj={data.lines} />
                            </Stack>
                            <Stack
                                display={'flex'}
                                direction={'column'}
                                justifyContent={'space-around'}
                                height={'10vh'}
                                bgcolor={'#f7f7f7'}
                            >
                                <CartSummary cost={data.cost} />
                                <Stack
                                    display={'flex'}
                                    alignItems={'center'}
                                >
                                    <CartActions checkoutUrl={data.checkoutUrl} />
                                </Stack>
                            </Stack>
                        </Stack>
                    ) : (
                        <Stack padding={3}>
                            <Typography className="General-Text">
                                Su carrito está actualmente vacío.
                            </Typography>
                            <Stack marginTop={2}>
                                <Link
                                    to="/store"
                                >
                                    <Typography>
                                        Ir a tienda
                                    </Typography>
                                </Link>
                            </Stack>
                        </Stack>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default CartDrawer;
