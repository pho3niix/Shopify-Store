import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import {
    Stack,
    Box,
    Typography
} from '@mui/material'
import { useParams } from "react-router-dom";
import { useLoaderData } from '@remix-run/react'
import { defer, redirec, json } from '@shopify/remix-oxygen';
import { GetDiscount } from '../utils'

export const meta = ({ data }) => {
    return [{ title: 'Detalle de servicio' }];
};

export async function loader({
    params,
    request,
    context
}) {
    const { id } = params;
    const { storefront } = context;

    let RawId = "gid://shopify/Product/" + id

    const query = await storefront.query(PRODUCT_QUERY, {
        variables: {
            ProductId: RawId
        }
    });

    return json({
        data: query
    })
}

function ClearVariants(data) {
    const uniqueColors = new Set();
    const uniqueSizes = new Set();

    data.forEach((item) => {
        const [Color, Size] = item.title.split('/').map((part) => part.trim());
        uniqueColors.add(Color);
        uniqueSizes.add(Size);
    });

    return {
        Colors: Array.from(uniqueColors),
        Sizes: Array.from(uniqueSizes),
    };
}

function ClearProduct(data) {
    const { Colors, Sizes } = ClearVariants(data.variants.nodes);
    return {
        nombre: data.title,
        precio_real: data.compareAtPriceRange.maxVariantPrice.amount,
        descuento: GetDiscount(data.compareAtPriceRange.maxVariantPrice.amount, data.priceRange.maxVariantPrice.amount),
        precio_final: data.priceRange.maxVariantPrice.amount,
        imagenes: data.images.nodes.map(e => e.url),
        description: data.description,
        dimensions: {
            width: Sizes[0],
            height: Sizes[1],
            deep: Sizes[2]
        },
        colors: Colors
    }
}

const Store = () => {

    const { data } = useLoaderData();

    // console.log(data.product);
    const Product = data.product;

    const ProductData = ClearProduct(Product)

    function GetColors(colors = []) {
        if (colors.length == 0) {
            return (<p> No colors added.</p>)
        } else {
            return (
                colors.map((item, index) => {
                    return (
                        <span style={{
                            backgroundColor: item,
                            width: '30px',
                            height: '30px',
                            listStyleType: 'none',
                            borderRadius: '100%',
                            marginRight: '5px',
                            border: '1px solid black'
                        }}
                            key={index}
                        ></span>
                    )
                })
            )
        }
    }

    const Image = ProductData.imagenes[0]

    function ListImage(images = []) {
        let Containers = [];

        for (let i = 1; i < 4; i++) {
            let source = images[i];
            if (i == 1) {
                Containers.push(
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
                Containers.push(
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

        return (Containers);
    }

    return (
        <Layout>
            <Stack
                display={"flex"}
                direction={"row"}
                width={"80%"}
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
                        {ListImage(ProductData.imagenes)}
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


const PRODUCT_QUERY = `#graphql
query GetProductsById($ProductId: ID!) {
    product(id: $ProductId) {
      id
      title
      description
      images(first: 10) {
        nodes {
          url
        }
      }
      compareAtPriceRange{
          maxVariantPrice{
            amount
          }
        }
        priceRange{
          maxVariantPrice{
            amount
          }
        }
        variants(first: 10) {
          nodes {
            title
          }
        }
    }
  }
`;