import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { CartForm } from '@shopify/hydrogen';

function ProductForm({ productId }) {
    const lines = [{ merchandiseId: productId, quantity: 1 }];
    return (
        <CartForm route="/cart" action={CartForm.ACTIONS.LinesAdd} inputs={{ lines }}>
            <input
                type="submit"
                className="AddToCartL"
                value={'Agregar al carrito'}
            />
        </CartForm>
    );
}

function AddShoppingCart(data) {
    alert(`${data.nombre} agregado al carrito exitosamente.`);
}

export default function CardComponent({ children }) {

    return (
        <Stack
            sx={{
                height: 400,
                width: 375,
                marginRight: 4,
            }}
            className="CardComponent"
        >
            <Stack className="ItemImage">
                <Link
                    to={{
                        pathname: `/store/${children.id}`,
                    }}
                    className="CardLink"
                >
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
                        height: 100,
                    }}
                    className="HoverButton"
                >
                    <ProductForm productId={children?.variant} />
                </Stack>
            </Stack>
            <Stack className="ItemInfo">
                <Typography className="ItemName">{children.nombre}</Typography>
                <Stack className="ItemPrices">
                    <Typography
                        className="ItemPrice"
                        sx={{
                            marginLeft: 1,
                            marginRight: 1,
                        }}
                    >
                        ${children.precio_final} MXN
                    </Typography>
                    <Typography
                        className="ItemPrice"
                        sx={{
                            marginLeft: 1,
                            marginRight: 1,
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
    );
}
