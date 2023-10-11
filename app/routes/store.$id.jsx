import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Stack, Box, Typography, Fade, Button } from '@mui/material';
import { useLoaderData } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';
import { GetDiscount } from '../utils';
import { CartForm } from '@shopify/hydrogen';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function ProductBuyNowButton({ product, action }) {
    const variantId = product;
    if (!variantId) {
        return null;
    }
    let ClearID = product.substring(product.lastIndexOf('/') + 1, product.length);
    return (
        <form
            action={`https://obinteriorismo.myshopify.com/cart/${ClearID}:1?payment=shop_pay`}
        >
            {/* <input className="BuyNow" type="submit" value={'Comprar ahora'} /> */}
            <Button
                variant="contained"
                className="BuyNow"
                type="submit"
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 0,
                    textTransform: 'none',
                }}
            >
                <Typography>Comprar ahora</Typography>
            </Button>
        </form>
    );
}

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
        shop,
    });
}

function ProductForm({ productId }) {
    const lines = [{ merchandiseId: productId, quantity: 1 }];
    return (
        <CartForm route="/cart" action={CartForm.ACTIONS.LinesAdd} inputs={{ lines }}>
            {/* <input type="submit" className="AddToCart" value={'Agregar al carrito'} /> */}
            <Button
                variant="outlined"
                className="AddToCart"
                type="submit"
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 0,
                    textTransform: 'none',
                }}
            >
                <Typography>
                    Agregar al carrito{' '}
                    <ShoppingCartIcon
                        sx={{
                            color: '#202123',
                            fontSize: '1.2rem',
                            verticalAlign: 'middle',
                        }}
                    />
                </Typography>
            </Button>
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

function ListImage({ images = [] }) {
    let Containers = [];

    const [Image, SetImage] = useState(images[0]);

    for (let i = 1; i < 4; i++) {
        let [source, SetSource] = useState(images[i]);
        Containers.push(
            <Stack
                key={i}
                height={'10em'}
                width={'15em'}
            >
                <Box
                    sx={{
                        cursor: 'pointer',
                        objectFit: 'fill'
                    }}
                    className={'Image-Detail'}
                    component="img"
                    src={source}
                    onClick={() => { SetSource(Image); SetImage(source); }}
                />
            </Stack>
        );
    }

    return (
        <Stack
            display={'flex'}
            height={'97.5%'}
            direction={'column'}
            justifyContent={'space-between'}
            width={{
                xs: '100%',
                sm: '100%',
                md: '100%',
                lg: 1200,
                xl: 1200,
            }}
        >
            <Stack
                height={{
                    xs: '20vh',
                    sm: '35vh',
                    md: '40vh',
                    lg: '50vh',
                    xl: '80vh',
                }}
            >
                <Box
                    className="MainImage"
                    component="img"
                    sx={{
                        boxShadow: '0px 5px 5px 0px rgba(163, 163, 163, 0.75)',
                        objectFit: 'fill',
                    }}
                    src={Image}
                ></Box>
            </Stack>
            <Stack
                display={{
                    xs: 'none',
                    sm: 'none',
                    md: 'flex',
                    lg: 'flex',
                    xl: 'flex',
                }}
                direction={'row'}
                justifyContent={'space-between'}
                className="ImagesList"
                marginTop={'2vh'}
            >
                {Containers}
            </Stack>
        </Stack>
    );
}

const Store = () => {
    const { product, shop } = useLoaderData();

    const Variants = product.variants.nodes[0];

    const ProductData = ClearProduct(product);

    return (
        <Layout>
            <Fade in={true} timeout={1000}>
                <Stack
                    component={'section'}
                    //   border={'1px solid black'}
                    display={'flex'}
                    direction={{
                        xs: 'column',
                        sm: 'column',
                        md: 'column',
                        lg: 'row',
                        xl: 'row',
                    }}
                    width={'80%'}
                    height={{
                        lg: '78vh',
                        xl: '78vh',
                    }}
                    justifyContent={'space-between'}
                //   paddingBottom={'24px'}
                >
                    {/* AQUÍ AQUÍ AQUÍ --- INICIO */}
                    {/* <Stack
            //   border={'1px solid red'}
            width={'59%'}
            height={'100%'}
          >
            <Stack border={'1px solid black'} width={'100%'} height={'95%'}>
              <Stack
                border={'1px solid red'}
                width={'100%'}
                height={'69%'}
              ></Stack>
            </Stack>
          </Stack>
          <Stack
            //   border={'1px solid blue'}
            width={'39%'}
            height={'100%'}
          >
            <Stack border={'1px solid black'} width={'100%'} height={'95%'}>
              <Stack
                border={'1px solid red'}
                width={'100%'}
                height={'69%'}
              ></Stack>
            </Stack>
          </Stack> */}
                    {/* AQUÍ AQUÍ AQUÍ --- FINAL */}
                    <ListImage images={ProductData.imagenes} />
                    <Stack
                        display={'flex'}
                        marginLeft={{
                            lg: 4,
                            xl: 4,
                        }}
                        width={{
                            xs: '100%',
                            sm: '100%',
                            md: '100%',
                            lg: 1000,
                            xl: 1200,
                        }}
                    >
                        <Stack
                            display={'flex'}
                            direction={'column'}
                            minHeight={'58vh'}
                            marginBottom={{
                                xs: 2,
                                sm: 2,
                            }}
                        >
                            <Stack
                                display={'flex'}
                                direction={'column'}
                                justifyContent={'space-between'}
                                sx={{
                                    height: 150,
                                }}
                            >
                                <Stack
                                    display={'flex'}
                                    justifyContent={'center'}
                                    height={'50%'}
                                >
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
                                        lg: 2,
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
                                        color={'#C32F27'}
                                    >
                                        -{ProductData.descuento}%
                                    </Typography>
                                    <Typography className="PriceTag" color={'#C32F27'}>
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
                                    lg: 2,
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
                                    lg: 2,
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
                                    lg: 2,
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
                            //   border={'1px solid black'}
                            display={'flex'}
                            direction={'column'}
                            height={'20vh'}
                        //   justifyContent={'start'}
                        >
                            <Stack width={'100%'} height={'40%'} position={'relative'}>
                                <ProductBuyNowButton
                                    product={Variants?.id}
                                    action={shop.primaryDomain.url}
                                />
                            </Stack>
                            <Stack
                                marginTop={2}
                                position={'relative'}
                                width={'100%'}
                                height={'40%'}
                                bgcolor={'white'}
                            // border={'1px solid #202123'}
                            >
                                <ProductForm productId={Variants?.id} />
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Fade>
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
