import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import {
    Stack,
    Box,
    Typography
} from '@mui/material'

const Store = () => {

    const Image = `https://random.imagecdn.app/1200/340`

    function ListImage(number) {
        let Images = [];
        console.log(Images)
        for (let i = 0; i < number; i++) {
            let source = `https://random.imagecdn.app/500/250?image=${i}`;
            if (i == 0) {
                Images.push(
                    <Box
                        display={"flex"}
                        direction={"row"}
                        width={{ xs: "24%", sm: "24%", md: "24%" }}
                        marginRight={{ xs: "1%", sm: "1%", md: "1%" }}
                        component="img"
                        src={source}
                        key={i}
                    />
                )
            } else {
                Images.push(
                    <Box
                        display={"flex"}
                        direction={"row"}
                        width={{ xs: "24%", sm: "24%", md: "24%" }}
                        component="img"
                        marginLeft={{ xs: "1%", sm: "1%", md: "1%" }}
                        src={source}
                        key={i}
                    />
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
                    direction={"column"}
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
                        height={"20vh"}
                        direction={"row"}
                    >
                        {ListImage(4)}
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
                                >Nombre</Typography>
                            </Stack>
                            <Stack
                                display={"flex"}
                                direction={"row"}
                                height={"50%"}
                                alignItems={"center"}
                                marginLeft={2}
                            >
                                <Typography
                                    sx={{
                                        marginRight: 1
                                    }}
                                >
                                    $100 MXN
                                </Typography>
                                <Typography
                                    sx={{
                                        marginLeft: 1,
                                        marginRight: 1
                                    }}
                                >
                                    -10%
                                </Typography>

                                <Typography
                                >
                                    $110 MXN
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            display={"flex"}
                            direction={"row"}
                            marginLeft={2}
                            sx={{
                                height: 80
                            }}
                            bgcolor={"gray"}
                        >
                            <Stack
                                marginRight={2}
                            >
                                <Typography>Colores:</Typography>
                            </Stack>
                            <Stack
                                display={"flex"}
                                direction={"row"}
                            >
                                <Typography>azul</Typography>
                                <Typography>negro</Typography>
                                <Typography>verde</Typography>
                                <Typography>morado</Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            display={"flex"}
                            direction={"column"}
                            sx={{
                                height: 120
                            }}
                            bgcolor={"purple"}
                            marginLeft={2}
                        >
                            <Typography>Dimensiones</Typography>
                            <Typography>Description</Typography>
                            <Typography>Description</Typography>
                            <Typography>Description</Typography>
                        </Stack>
                        <Stack
                            marginLeft={2}
                        >
                            <Typography>Description</Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        display={"flex"}
                        direction={"column"}
                        height={"20vh"}
                        bgcolor={"brown"}
                    >
                        <Stack>Comprar ahora</Stack>
                        <Stack>Añadir al carrito</Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Layout >
    );
};

export default Store;
