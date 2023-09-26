import Layout from '../components/Layout/Layout';
import Card from '../components/Card/Card';
import { Stack, Typography, TextField } from '@mui/material';
import { defer, redirec, json } from '@shopify/remix-oxygen';
import { Await, Link, useLoaderData, useLocation, useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
// import { usePageContext } from '../services/Context'
import { Pagination, getPaginationVariables } from '@shopify/hydrogen';

export const meta = () => {
    return [{ title: 'Tienda' }];
};

export async function loader({ params, request, context }) {
    const { handle } = params;
    const { storefront } = context;

    const SearchParams = new URLSearchParams(new URL(request.url).search);
    const Cursor = SearchParams.get('cursor') ?? undefined;
    const Action = SearchParams.get('direction') === 'prev';

    const query = Action ? await storefront.query(PRODUCT_QUERY_PREV, {
        variables: {
            cursor: Cursor,
            pageBy: 1
        }
    }) : await storefront.query(PRODUCT_QUERY_NEXT, {
        variables: {
            cursor: Cursor,
            pageBy: 1
        }
    });

    const PageInfo = query.products.pageInfo

    return json({
        data: query,
        pageInfo: PageInfo
    });
}


function List({ Items }) {
    if (Items.length > 0) {
        return Items.map((e, i) => {
            let RawId = e.id;
            let ClearID = RawId.substring(RawId.lastIndexOf('/') + 1, RawId.length);
            e = {
                ...e,
                image: e.images.nodes[0].url,
                id: ClearID,
                variant: e.variants.nodes[0].id,
                nombre: e.title,
                precio_final: e.priceRange.maxVariantPrice.amount,
                precio_real: e.compareAtPriceRange.maxVariantPrice.amount,
                descuento: Math.floor(
                    ((e.compareAtPriceRange.maxVariantPrice.amount -
                        e.priceRange.maxVariantPrice.amount) /
                        e.compareAtPriceRange.maxVariantPrice.amount) *
                    100,
                ),
            };
            return <Card key={i}>{e}</Card>;
        });
    } else {
        return <Typography>Sin información para mostrar</Typography>;
    }
}

const Store = () => {
    const { data, pageInfo } = useLoaderData();
    const [endCursor, setEndCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [startCursor, setStartCursor] = useState(null);
    const [journalProducts, setJournalProducts] = useState([]);
    const isLocation = useLocation();
    const fetcher = useFetcher();

    const onNextPage = () => {
        if (hasNextPage) fetcher.load(`${isLocation.pathname}?direction=next&cursor=${endCursor}`)
    }

    const onPrevPage = () => {
        if (hasPreviousPage) fetcher.load(`${isLocation.pathname}?direction=prev&cursor=${startCursor}`)
    }

    useEffect(() => {
        setEndCursor(pageInfo.endCursor);
        setHasNextPage(pageInfo.hasNextPage);
        setHasPreviousPage(pageInfo.hasPreviousPage);
        setStartCursor(pageInfo.startCursor)
        setJournalProducts(data.products.nodes);
    }, []);
    useEffect(() => {
        if (!fetcher.data) {
            return;
        } else {
            setJournalProducts(fetcher.data.data.products.nodes);
            setEndCursor(fetcher.data.pageInfo.endCursor);
            setHasNextPage(fetcher.data.pageInfo.hasNextPage);
            setHasPreviousPage(fetcher.data.pageInfo.hasPreviousPage);
            setStartCursor(fetcher.data.pageInfo.startCursor);
        };
    }, [fetcher.data]);

    const Items = journalProducts;

    return (
        <Layout>
            <Stack className="main">
                <Stack className="search">
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
                            '& .MuiInputLabel-root': { color: 'gray' },
                            '& .MuiInputBase-input': { color: 'black' },
                        }}
                    />
                </Stack>
                <Stack
                    sx={{
                        marginTop: 4,
                    }}
                    className="list"
                >
                    {/* <Pagination connection={data.products}>
                        {({ nodes }) => (
                            <>
                                <List
                                    Items={nodes}
                                />
                            </>
                        )}
                    </Pagination> */}
                    {List({ Items })}
                    <button onClick={onPrevPage}>prev</button>
                    <button onClick={onNextPage}>next</button>
                </Stack>
            </Stack>
        </Layout>
    );
};

export default Store;

// 1
const PRODUCT_QUERY_NEXT = `#graphql
query GetAllProducts(
    $pageBy: Int!
    $cursor: String
  ){
    products(first: $pageBy, after: $cursor) {
      nodes {
        id
        title
        images(first: 10) {
          nodes {
            url
          }
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
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
  }
}
`;

const PRODUCT_QUERY_PREV = `#graphql
query GetAllProducts(
    $pageBy: Int!
    $cursor: String
  ){
    products(last: $pageBy, before: $cursor) {
      nodes {
        id
        title
        images(first: 10) {
          nodes {
            url
          }
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
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
  }
}
`;
