import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Stack, Box, Typography } from '@mui/material';
import { useLoaderData } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';
import { GetDiscount } from '../utils';
import { CartForm } from '@shopify/hydrogen';
import { MediaFile, Money, ShopPayButton } from '@shopify/hydrogen-react';

export const meta = ({ data }) => {
    return [{ title: `Tienda | ${data.product.title}` }];
};

export async function loader({ params, request, context }) {
    const { id } = params;
    const { storefront } = context;

    let RawId = 'gid://shopify/Product/' + id;

    const { shop, product } = await storefront.query(PRODUCT_QUERY, {
        variables: {
            ProductId: RawId,
        },
    });

    if (!product?.id) {
        throw new Response(null, { status: 404 });
    }

    return json({
        product,
        shop
    });
}

function ProductForm({ productId }) {
    const lines = [{ merchandiseId: productId, quantity: 1 }];
    return (
        <CartForm route="/cart" action={CartForm.ACTIONS.LinesAdd} inputs={{ lines }}>
            <input type="submit" className="AddToCart" value={'Agregar al carrito'} />
        </CartForm>
    );
}

function ClearVariants(colors, dimensions) {
    return {
        Colors: colors ? JSON.parse(colors) : null,
        Sizes: dimensions ? JSON.parse(dimensions) : null,
    };
}

const NoData = (data) => `Sin ${data} disponible.`;

function ClearProduct(data) {
    const { Colors, Sizes } = ClearVariants(
        data.colors ? data.colors.value : null,
        data.dimensions ? data.dimensions.value : null,
    );
    return {
        id: data.id,
        nombre: data.title ?? NoData('nombre'),
        precio_real: data.compareAtPriceRange
            ? data.compareAtPriceRange.maxVariantPrice.amount
            : NoData('precio real'),
        descuento:
            data.compareAtPriceRange && data.priceRange
                ? GetDiscount(
                    data.compareAtPriceRange.maxVariantPrice.amount,
                    data.priceRange.maxVariantPrice.amount,
                )
                : NoData('descuento'),
        precio_final: data.priceRange
            ? data.priceRange.maxVariantPrice.amount
            : NoData('precio final'),
        imagenes:
            data.images && data.images.nodes && data.images.nodes.length > 0
                ? data.images.nodes.map((e) => e.url)
                : [],
        description: data.description ?? NoData('descripción'),
        dimensions:
            Sizes && Sizes.length >= 3
                ? {
                    width: Sizes[0],
                    height: Sizes[1],
                    deep: Sizes[2],
                }
                : {
                    width: 0,
                    height: 0,
                    deep: 0,
                },
        colors: Colors && Colors.length > 0 ? Colors : [],
    };
}

const Store = () => {
    const { product, shop } = useLoaderData();

    const Variants = product.variants.nodes[0];

    const ProductData = ClearProduct(product);

    function GetColors(colors = []) {
        if (colors.length == 0) {
            return <p> Sin colores añadidos.</p>;
        } else {
            return colors.map((item, index) => {
                return (
                    <span
                        style={{
                            backgroundColor: item,
                            width: '30px',
                            height: '30px',
                            listStyleType: 'none',
                            borderRadius: '100%',
                            marginRight: '5px',
                            border: '1px solid black',
                        }}
                        key={index}
                    ></span>
                );
            });
        }
    }

    const Image = ProductData.imagenes[0];

    function ListImage(images = []) {
        let Containers = [];

        for (let i = 1; i < 4; i++) {
            let source = images[i];
            if (i == 1) {
                Containers.push(
                    <Stack
                        marginRight={{ xs: '1%', sm: '1%', md: '1%' }}
                        maxHeight={'160px'}
                        key={i}
                    >
                        <Box width={'100%'} component="img" src={source} />
                    </Stack>,
                );
            } else {
                Containers.push(
                    <Stack
                        marginLeft={{ xs: '1%', sm: '1%', md: '1%' }}
                        maxHeight={'160px'}
                        key={i}
                    >
                        <Box width={'100%'} component="img" src={source} />
                    </Stack>,
                );
            }
        }

        return Containers;
    }

    return (
        <Layout>
            <Stack
                display={'flex'}
                direction={{
                    xs: 'column',
                    sm: 'column',
                    md: 'column',
                    lg: 'row',
                    xl: 'row'
                }}
                width={'80%'}
                height={{
                    lg: '100vh',
                    xl: '75vh'
                }}
            >
                <Stack
                    display={'flex'}
                    height={'100%'}
                    direction={'column'}
                    justifyContent={'space-between'}
                    width={{
                        xs: '100%',
                        sm: '100%',
                        md: '100%',
                        lg: 1200,
                        xl: 1200
                    }}
                >
                    <Box
                        height={{
                            xs: '20vh',
                            sm: '35vh',
                            md: '50vh',
                            lg: '60vh',
                            xl: '80vh'
                        }}
                        component="img"
                        src={Image}
                        width={{ xs: '100%', sm: '100%', md: '100%' }}
                        sx={{
                            objectFit: 'fill',
                            boxShadow: '0px 5px 5px 0px rgba(163,163,163,0.75)',
                        }}
                    ></Box>
                    <Stack
                        display={{
                            xs: 'none',
                            sm: 'none',
                            md: 'flex',
                            lg: 'flex',
                            xl: 'flex'
                        }}
                        direction={'row'}
                        height={'20vh'}
                        justifyContent={'space-between'}
                        className="ImagesList"
                        marginTop={'2vh'}
                    >
                        {ListImage(ProductData.imagenes)}
                    </Stack>
                </Stack>
                <Stack
                    display={'flex'}
                    marginLeft={{
                        lg: 4,
                        xl: 4
                    }}
                    width={{
                        xs: '100%',
                        sm: '100%',
                        md: '100%',
                        lg: 1000,
                        xl: 1200,
                    }}
                >
                    <Stack display={'flex'} direction={'column'} minHeight={'58vh'} marginBottom={{
                        xs: 2,
                        sm: 2
                    }}>
                        <Stack
                            display={'flex'}
                            direction={'column'}
                            justifyContent={'space-between'}
                            sx={{
                                height: 150,
                            }}
                        >
                            <Stack display={'flex'} justifyContent={'center'} height={'50%'}>
                                <Typography fontSize={25}>
                                    {ProductData.nombre.toUpperCase()}
                                </Typography>
                            </Stack>
                            <Stack
                                display={'flex'}
                                direction={'row'}
                                height={'50%'}
                                alignItems={'center'}
                                marginLeft={{
                                    xl: 2,
                                    lg: 2
                                }}
                            >
                                <Typography
                                    className="PriceTag"
                                    sx={{
                                        marginRight: 1,
                                        textDecoration: 'line-through',
                                    }}
                                    color={'#c5c5c5'}
                                >
                                    ${ProductData.precio_real} MXN
                                </Typography>
                                <Typography
                                    className="PriceTag"
                                    sx={{
                                        marginLeft: 1,
                                        marginRight: 1,
                                    }}
                                    color={'#c32f27'}
                                >
                                    -{ProductData.descuento}%
                                </Typography>
                                <Typography className="PriceTag" color={'#c32f27'}>
                                    ${ProductData.precio_final} MXN
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            display={'flex'}
                            direction={'row'}
                            alignItems={'center'}
                            marginLeft={{
                                xl: 2,
                                lg: 2
                            }}
                            sx={{
                                height: 60,
                            }}
                        >
                            <Stack marginRight={2}>
                                <Typography fontSize={'25px'}>Colores:</Typography>
                            </Stack>
                            <Stack display={'flex'} direction={'row'}>
                                {GetColors(ProductData.colors)}
                            </Stack>
                        </Stack>
                        <Stack
                            display={'flex'}
                            direction={'column'}
                            sx={{
                                height: 120,
                            }}
                            marginLeft={{
                                xl: 2,
                                lg: 2
                            }}
                        >
                            <Typography fontSize={'25px'}>Dimensiones:</Typography>
                            <Stack
                                display={'flex'}
                                alignSelf={'center'}
                                width={'90%'}
                                height={'100%'}
                            >
                                <Typography className="DimensionTag">
                                    <span>Alto:</span>{' '}
                                    <span>{ProductData.dimensions.height} cm</span>
                                </Typography>
                                <Typography className="DimensionTag">
                                    <span>Ancho:</span>{' '}
                                    <span>{ProductData.dimensions.width} cm</span>
                                </Typography>
                                <Typography className="DimensionTag">
                                    <span>Profundo:</span>{' '}
                                    <span>{ProductData.dimensions.deep} cm</span>
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            marginLeft={{
                                xl: 2,
                                lg: 2
                            }}
                            width={'100%'}
                            height={'auto'}
                            display={'inline-block'}
                        >
                            <Typography fontSize={'25px'}>Descripción:</Typography>
                            <Typography fontSize={17} sx={{ color: '#939393' }}>
                                {ProductData.description}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        display={'flex'}
                        direction={'column'}
                        height={'20vh'}
                        justifyContent={'start'}
                    >
                        <Stack
                            display={'flex'}
                            justifyContent={'center'}
                            width={'100%'}
                            height={'40%'}
                            bgcolor={'black'}
                        >
                            <ShopPayButton
                                storeDomain={shop.primaryDomain.url}
                                variantIds={[Variants?.id]}
                                width={'100%'}
                            />
                        </Stack>
                        <Stack
                            marginTop={2}
                            position={'relative'}
                            width={'100%'}
                            height={'40%'}
                            bgcolor={'white'}
                            border={'1px solid black'}
                        >
                            <ProductForm productId={Variants?.id} />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Layout>
    );
};

export default Store;

const PRODUCT_QUERY = `#graphql
query GetProductsById($ProductId: ID!) {
    shop {
        primaryDomain {
          url
        }
      }
    product(id: $ProductId) {
      id
      title
      description
      images(first: 10) {
        nodes {
          url
        }
      }
      options {
        name,
        values
      }
      compareAtPriceRange {
        maxVariantPrice {
          amount
        }
      }
      priceRange {
        maxVariantPrice {
          amount
        }
      }
      colors: metafield(namespace: "details", key: "colores") {
        value
        key
      }
      dimensions: metafield(namespace: "details", key: "dimensiones") {
        value
        key
      }
      availableForSale
      variants(first: 1) {
        nodes {
          id
          title
          availableForSale
          price {
            currencyCode
            amount
          }
          compareAtPrice {
            currencyCode
            amount
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;
