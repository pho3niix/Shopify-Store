import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import {
    Stack,
    Box,
    Typography
} from '@mui/material'

export const meta = () => {
    return [{ title: 'Detalle de servicio' }];
};

const Store = () => {

    const ProductData = {
        nombre: 'Lámpara de diseño moderno',
        precio_real: 150,
        descuento: 20,
        precio_final: 120,
        imagenes: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis tellus nec tincidunt convallis. Ut consequat mi varius commodo scelerisque. Vestibulum egestas odio porta, tincidunt massa sed, scelerisque diam. Donec at sapien in enim gravida fermentum. Fusce consequat interdum auctor. Donec non pulvinar elit. Maecenas quis elit non ipsum dictum ultricies. Praesent venenatis magna in ligula dapibus, in maximus ex finibus. Nulla tincidunt lacus in erat tincidunt dapibus. Suspendisse et sem dictum, tincidunt urna eget, tempor justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        dimensions: {
            width: 0,
            height: 0,
            deep: 0
        },
        colors: ['#FF5733', '#3399FF', '#9633FF', '#FF33A2', '#FF3333']
    }

    function GetColors(colors = []) {
        if (colors.length == 0) {
            return (<p> No colors added.</p>)
        } else {
            return (
                colors.map((item, index) => {
                    return (
                        <span key={index} style={{
                            backgroundColor: item,
                            width: '30px',
                            height: '30px',
                            listStyleType: 'none',
                            borderRadius: '100%',
                            marginRight: '5px',
                            border: '1px solid black'
                        }}></span>
                    )
                })
            )
        }
    }

    const Image = `https://random.imagecdn.app/1200/340`

    function ListImage(number) {
        let Images = [];
        for (let i = 0; i < number; i++) {
            let source = `https://random.imagecdn.app/500/250?image=${i}`;
            if (i == 0) {
                Images.push(
                    <Stack
                        marginRight={{ xs: "1%", sm: "1%", md: "1%" }}
                        maxHeight={'160px'}
                    >
                        <Box
                            width={'100%'}
                            component="img"
                            src={source}
                            key={i}
                        />
                    </Stack>
                )
            } else {
                Images.push(
                    <Stack
                        marginLeft={{ xs: "1%", sm: "1%", md: "1%" }}
                        maxHeight={'160px'}
                    >
                        <Box
                            width={'100%'}
                            component="img"
                            src={source}
                            key={i}
                        />
                    </Stack>
                )
            }
        }
        return (Images)
    }

    return (
        <Layout>
            <Stack
                display={"flex"}
                direction={"row"}
                width={"90%"}
                height={"75vh"}
            >
                <Stack
                    display={"flex"}
                    height={'100%'}
                    direction={"column"}
                    justifyContent={'space-between'}
                    sx={{
                        width: 1200,
                        marginLeft: 4
                    }}
                >
                    <Box
                        height={"80vh"}
                        component="img"
                        src={Image}
                        width={{ xs: "100%", sm: "100%", md: "100%" }}
                        sx={{
                            objectFit: "fill",
                            boxShadow: "0px 5px 5px 0px rgba(163,163,163,0.75)"
                        }}
                    >
                    </Box>
                    <Stack
                        display={"flex"}
                        direction={"row"}
                        height={"20vh"}
                        justifyContent={'space-between'}
                        className="ImagesList"
                        marginTop={'2vh'}
                    >
                        {ListImage(3)}
                    </Stack>
                </Stack>
                <Stack
                    display={"flex"}
                    sx={{
                        width: 1200,
                        marginLeft: 4
                    }}
                >
                    <Stack
                        display={"flex"}
                        direction={"column"}
                        height={"80vh"}
                    >
                        <Stack
                            display={"flex"}
                            direction={"column"}
                            justifyContent={"space-between"}
                            sx={{
                                height: 150
                            }}
                        >
                            <Stack
                                display={"flex"}
                                justifyContent={"center"}
                                height={"50%"}
                            >
                                <Typography
                                    fontSize={25}
                                >{ProductData.nombre.toUpperCase()}</Typography>
                            </Stack>
                            <Stack
                                display={"flex"}
                                direction={"row"}
                                height={"50%"}
                                alignItems={"center"}
                                marginLeft={2}
                            >
                                <Typography
                                    className="PriceTag"
                                    sx={{
                                        marginRight: 1,
                                        textDecoration: 'line-through'
                                    }}
                                    color={'#c5c5c5'}
                                >
                                    ${ProductData.precio_real} MXN
                                </Typography>
                                <Typography
                                    className="PriceTag"
                                    sx={{
                                        marginLeft: 1,
                                        marginRight: 1
                                    }}
                                    color={"#c32f27"}
                                >
                                    -{ProductData.descuento}%
                                </Typography>
                                <Typography
                                    className="PriceTag"
                                    color={"#c32f27"}
                                >
                                    ${ProductData.precio_final} MXN
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            display={"flex"}
                            direction={"row"}
                            alignItems={"center"}
                            marginLeft={2}
                            sx={{
                                height: 60
                            }}
                        >
                            <Stack
                                marginRight={2}
                            >
                                <Typography fontSize={'25px'}>Colores:</Typography>
                            </Stack>
                            <Stack
                                display={"flex"}
                                direction={"row"}
                            >
                                {GetColors(ProductData.colors)}
                            </Stack>
                        </Stack>
                        <Stack
                            display={"flex"}
                            direction={"column"}
                            sx={{
                                height: 120
                            }}
                            marginLeft={2}
                        >
                            <Typography
                                fontSize={'25px'}
                            >Dimensiones:</Typography>
                            <Stack
                                display={'flex'}
                                alignSelf={'center'}
                                width={'90%'}
                                height={'100%'}
                            >
                                <Typography className="DimensionTag"><span>Alto:</span> <span>{ProductData.dimensions.height} cm</span></Typography>
                                <Typography className="DimensionTag"><span>Ancho:</span> <span>{ProductData.dimensions.width} cm</span></Typography>
                                <Typography className="DimensionTag"><span>Profundo:</span> <span>{ProductData.dimensions.deep} cm</span></Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            marginLeft={2}
                            width={'100%'}
                            sx={{
                                overflow: 'scroll'
                            }}
                        >
                            <Typography
                                fontSize={'25px'}
                            >Descripción:</Typography>
                            <Typography
                                fontSize={17}
                                sx={{ color: '#939393' }}>{ProductData.description}</Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        display={"flex"}
                        direction={"column"}
                        height={"20vh"}
                        justifyContent={'start'}
                    >
                        <Stack
                            display={'flex'}
                            justifyContent={'center'}
                            width={'100%'}
                            height={'40%'}
                            bgcolor={'black'}
                            alignItems={'center'}
                        >
                            <Typography
                                color={'white'}
                            >
                                Comprar Ahora
                            </Typography>
                        </Stack>
                        <Stack
                            marginTop={2}
                            display={'flex'}
                            justifyContent={'center'}
                            width={'100%'}
                            height={'40%'}
                            bgcolor={'white'}
                            alignItems={'center'}
                            border={'1px solid black'}
                        >
                            <Typography
                                color={'black'}
                            >
                                Añadir al carrito
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Layout >
    );
};

export default Store;
