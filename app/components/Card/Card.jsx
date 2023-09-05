import React from 'react';
import {
    Stack,
    Typography,
    Box
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";

export default function CardComponent({ children }) {

    function AddShoppingCart(data) {
        alert(`${data.nombre} agregado al carrito exitosamente.`)
    }

    return (
        <Stack
            sx={{
                height: 400,
                width: 375,
                marginRight: 4
            }}
            className="CardComponent">
            <Stack
                className="ItemImage"
            >
                <Link to={{
                    pathname: `/store/${children.id}`
                }} className="CardLink">
                    <Box
                        className="Image"
                        component="img"
                        alt={children.name}
                        src={children.image}
                    />
                </Link>


                <Stack
                    sx={{
                        width: 375,
                        height: 100
                    }}
                    className="HoverButton"
                    onClick={e => AddShoppingCart(children)}
                >
                    <Typography
                        className="HoverButtonText"
                        sx={{
                            marginRight: 1
                        }}
                    >
                        Agregar al carrito
                    </Typography>
                    <Typography
                        className="HoverButtonText"
                    >
                        <ShoppingCartIcon />
                    </Typography>
                </Stack>
            </Stack>
            <Stack
                className="ItemInfo"
            >
                <Typography className="ItemName">
                    {children.nombre}
                </Typography>
                <Stack
                    className="ItemPrices"
                >
                    <Typography
                        className="ItemPrice"
                        sx={{
                            marginLeft: 1,
                            marginRight: 1
                        }}
                    >
                        ${children.precio_final} MXN
                    </Typography>
                    <Typography
                        className="ItemPrice"
                        sx={{
                            marginLeft: 1,
                            marginRight: 1
                        }}
                    >
                        -{children.descuento}%
                    </Typography>
                </Stack>
                <Typography className="ItemDiscount">
                    ${children.precio_real} MXN
                </Typography>
            </Stack>
        </Stack>
    )
}