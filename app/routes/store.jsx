import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Card from '../components/Card/Card';
import {
    Stack,
    Typography,
    Box,
    TextField,
    Pagination,
    TablePagination
} from '@mui/material';

export const meta = () => {
    return [{ title: 'Tienda' }];
};

const Store = () => {

    const Items = [
        {
            "nombre": "Lámpara de diseño moderno",
            "precio_real": 150,
            "descuento": 20,
            "precio_final": 120
        },
        {
            "nombre": "Mesa de centro minimalista",
            "precio_real": 350,
            "descuento": 14,
            "precio_final": 300
        },
        {
            "nombre": "Silla ergonómica",
            "precio_real": 100,
            "descuento": 10,
            "precio_final": 90
        },
        {
            "nombre": "Estantería modular",
            "precio_real": 220,
            "descuento": 15,
            "precio_final": 187
        },
        {
            "nombre": "Alfombra geométrica",
            "precio_real": 80,
            "descuento": 25,
            "precio_final": 60
        },
        {
            "nombre": "Jarrón de cerámica",
            "precio_real": 50,
            "descuento": 10,
            "precio_final": 45
        },
        {
            "nombre": "Cortina opaca",
            "precio_real": 70,
            "descuento": 20,
            "precio_final": 56
        },
        {
            "nombre": "Cojín decorativo",
            "precio_real": 25,
            "descuento": 20,
            "precio_final": 20
        },
        {
            "nombre": "Espejo de pared",
            "precio_real": 180,
            "descuento": 10,
            "precio_final": 162
        },
        {
            "nombre": "Macetero moderno",
            "precio_real": 40,
            "descuento": 25,
            "precio_final": 30
        },
        {
            "nombre": "Cuadro abstracto",
            "precio_real": 200,
            "descuento": 20,
            "precio_final": 160
        },
        {
            "nombre": "Mesa de comedor extensible",
            "precio_real": 500,
            "descuento": 20,
            "precio_final": 400
        },
        {
            "nombre": "Sofá modular",
            "precio_real": 800,
            "descuento": 18,
            "precio_final": 655
        },
        {
            "nombre": "Lámpara de pie vintage",
            "precio_real": 120,
            "descuento": 25,
            "precio_final": 90
        },
        {
            "nombre": "Escritorio de madera maciza",
            "precio_real": 300,
            "descuento": 15,
            "precio_final": 255
        },
        {
            "nombre": "Candelabro elegante",
            "precio_real": 65,
            "descuento": 12,
            "precio_final": 57
        },
        {
            "nombre": "Reloj de pared moderno",
            "precio_real": 55,
            "descuento": 10,
            "precio_final": 49.5
        },
        {
            "nombre": "Planta de interior grande",
            "precio_real": 30,
            "descuento": 10,
            "precio_final": 27
        },
        {
            "nombre": "Cuenco de cerámica artística",
            "precio_real": 75,
            "descuento": 30,
            "precio_final": 52.5
        },
        {
            "nombre": "Escultura abstracta",
            "precio_real": 180,
            "descuento": 20,
            "precio_final": 144
        }
    ]

    function List() {
        if (Items.length > 0) {
            return (
                Items.map((e, i) => {
                    e = {
                        ...e,
                        image: `https://random.imagecdn.app/500/250?image=${i}`,
                        id: i + 1
                    }
                    return (
                        <Card key={i}>{e}</Card>
                    )
                })
            )
        } else {
            return <Typography>Sin información para mostrar</Typography>
        }
    }

    return (
        <Layout>
            <Stack
                className="main"
            >
                <Stack
                    className="search"
                >
                    <TextField
                        id="item"
                        label="Escriba el nombre de un producto..."
                        type="text"
                        fullWidth
                        variant="outlined"
                        sx={{
                            '&:hover fieldset': {
                                border: '2px solid gray!important',
                                borderRadius: 1,
                            },
                            "& .MuiInputLabel-root": { color: 'gray' },
                            "& .MuiInputBase-input": { color: 'black' }
                        }}
                    />
                </Stack>
                <Stack
                    sx={{
                        marginTop: 4
                    }}
                    className="list"
                >
                    {List()}
                </Stack>
                <Stack
                    className="PaginationComponent"
                >
                    <Pagination
                        sx={{
                            '& .Mui-selected': {
                                color: 'white !important'
                            }, "& .MuiPaginationItem-root": {
                                color: "black"
                            }
                        }}
                        className="PaginationElement"
                        count={Math.ceil(Items.length / 10)} showFirstButton showLastButton color="primary" />
                </Stack>
            </Stack>
        </Layout >
    );
};

export default Store;
