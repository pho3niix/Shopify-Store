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
                <Box color={"black"} p={3} width={450} textAlign={"left"}>
                    <Stack
                        marginBottom={4}
                    >
                        <h2>Carrito</h2>
                    </Stack>
                    <MAlert className="Cart-Alert" onClose={false} severity="success" sx={{ width: '100%', display: openAlert ? 'flex' : 'none', marginBottom: 1 }}>
                        Producto agregado con éxito.
                    </MAlert>
                    {data?.totalQuantity > 0 ? (
                        <>
                            <div className="flex-1 overflow-y-auto">
                                <div className="flex flex-col space-y-7 justify-between items-center md:py-8 md:px-12 px-4 py-6">
                                    <CartLineItems linesObj={data.lines} />
                                </div>
                            </div>
                            <div className="w-full md:px-12 px-4 py-6 space-y-6 border border-1 border-gray-00">
                                <CartSummary cost={data.cost} />
                                <CartActions checkoutUrl={data.checkoutUrl} />
                            </div>
                        </>
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
