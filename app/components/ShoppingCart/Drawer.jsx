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
                open={true}
                onClose={onClose}
            >
                <Box color={"black"} width={450} textAlign={"left"}>
                    <Stack
                        padding={3}
                    >
                        <h2>Carrito</h2>
                    </Stack>
                    <MAlert className="Cart-Alert" onClose={false} severity="success" sx={{ width: '100%', display: openAlert ? 'flex' : 'none', marginBottom: 1 }}>
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
                                overflowY={'scroll'}
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
                        <div className="flex flex-col space-y-7 justify-center items-center md:py-8 md:px-12 px-4 py-6 h-screen">
                            <h2 className="whitespace-pre-wrap max-w-prose font-bold text-4xl">
                                Your cart is empty
                            </h2>
                            <Link
                                to="/store"
                                className="inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none bg-black text-white w-full"
                            >
                                Continuar comprando
                            </Link>
                        </div>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default CartDrawer;
