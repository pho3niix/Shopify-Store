import Layout from "../components/Layout/Layout";
import Card from '../components/Card/Card';
import {
    Stack,
    Typography,
    TextField,
    Pagination
} from '@mui/material';
import { defer, redirec, json } from '@shopify/remix-oxygen';
import { Await, Link, useLoaderData } from '@remix-run/react';

export const meta = () => {
    return [{ title: 'Tienda' }];
};

export async function loader({
    params,
    request,
    context
}) {
    const { handle } = params;
    const { storefront } = context;

    const query = await storefront.query(PRODUCT_QUERY);

    return json({
        data: query
    })
}

const Store = () => {

    const { data } = useLoaderData();

    const Items = data.products.nodes;

    function List() {
        if (Items.length > 0) {
            return (
                Items.map((e, i) => {
                    let RawId = e.id;
                    let ClearID = RawId.substring(RawId.lastIndexOf('/') + 1, RawId.length)
                    e = {
                        ...e,
                        image: e.images.nodes[0].url,
                        id: ClearID,
                        nombre: e.title,
                        precio_final: e.priceRange.maxVariantPrice.amount,
                        precio_real: e.compareAtPriceRange.maxVariantPrice.amount,
                        descuento: Math.floor(((e.compareAtPriceRange.maxVariantPrice.amount - e.priceRange.maxVariantPrice.amount) / e.compareAtPriceRange.maxVariantPrice.amount) * 100)
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

// 1
const PRODUCT_QUERY = `#graphql
query {
    products(first: 10) {
      nodes {
        id
        title
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
      }
    }
  }
`;