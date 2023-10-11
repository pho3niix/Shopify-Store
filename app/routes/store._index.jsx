import Layout from '../components/Layout/Layout';
import Card from '../components/Card/Card';
import {Stack, Typography, TextField, Fade, Grow} from '@mui/material';
import {defer, redirec, json} from '@shopify/remix-oxygen';
import {
  Await,
  Link,
  useLoaderData,
  useLocation,
  useFetcher,
} from '@remix-run/react';
import {useEffect, useState, useRef} from 'react';
// import { usePageContext } from '../services/Context'

export const meta = () => {
  return [{title: 'Tienda'}];
};

export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;

  // Pagination params
  const SearchParams = new URLSearchParams(new URL(request.url).search);
  const Cursor = SearchParams.get('cursor') ?? undefined;
  const Action = SearchParams.get('direction') === 'prev';

  // Search params
  const Filters = SearchParams.get('filter');

  let variables = {
    cursor: Cursor,
    pageBy: 10,
  };

  if (Filters) {
    variables.query = Filters;
  }

  const query = Action
    ? await storefront.query(PRODUCT_QUERY_PREV, {
        variables,
      })
    : await storefront.query(PRODUCT_QUERY_NEXT, {
        variables,
      });

  const {collections} = Action
    ? await storefront.query(COLLECTIONS_QUERY_PREV, {
        variables,
      })
    : await storefront.query(COLLECTIONS_QUERY_NEXT, {
        variables,
      });

  let Products = query.products;

  let PageInfo = query.products.pageInfo;

  if (variables.query && collections.nodes.length > 0) {
    let CollectionsProducts = collections.nodes[0].products;
    if (CollectionsProducts.nodes.length > 0) {
      Products = CollectionsProducts;
      PageInfo = CollectionsProducts.pageInfo;
    }
  }

  return json({
    products: {
      nodes: Products.nodes,
      pageInfo: PageInfo,
    },
  });
}

function List({Items}) {
  if (Items.length > 0) {
    return Items.map((e, i) => {
      let RawId = e.id;
      let ClearID = RawId.substring(RawId.lastIndexOf('/') + 1, RawId.length);
      let Discount = Math.floor(
        ((e.compareAtPriceRange.maxVariantPrice.amount -
          e.priceRange.maxVariantPrice.amount) /
          e.compareAtPriceRange.maxVariantPrice.amount) *
          100,
      );
      e = {
        ...e,
        image: e.images.nodes[0].url,
        id: ClearID,
        variant: e.variants.nodes[0].id,
        nombre: e.title ?? 'Sin nombre agregado.',
        precio_final: e.priceRange.maxVariantPrice.amount,
        precio_real: e.compareAtPriceRange.maxVariantPrice.amount,
        descuento: Discount ? Discount : 0,
      };
      return <Card key={i}>{e}</Card>;
    });
  } else {
    return (
      <Typography mt={3} ml={'3%'}>
        No hay productos para mostrar.
      </Typography>
    );
  }
}

const Store = () => {
  const {products} = useLoaderData();
  const isLocation = useLocation();
  const fetcher = useFetcher();

  // Search configuration
  const [CollectionParams, SetCollectionParams] = useState(
    new URLSearchParams(isLocation.search).get('collection') || '',
  );
  const [Search, SetSearch] = useState('');

  const Filters = isLocation.search.substring(1);

  useEffect(() => {
    let Value = Filters.split('=')[1];
    if (Filters.includes('collection') && Value.length > 0) {
      SetSearch(Value);
    }
  }, [Filters]);

  useEffect(() => {
    if (Search.length > 0) {
      fetcher.load(`${isLocation.pathname}?filter=${Search}`);
    } else {
      fetcher.load(`${isLocation.pathname}?filter=`);
    }
  }, [Search, Filters]);

  // Pagination configuration
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [startCursor, setStartCursor] = useState(null);
  const [journalProducts, setJournalProducts] = useState([]);

  const onNextPage = () => {
    let loader = '';
    if (hasNextPage || Search.length != 0) {
      if (hasNextPage)
        loader =
          loader + `${isLocation.pathname}?direction=next&cursor=${endCursor}`;
      if (Search.length != 0) loader = loader + `&filter=${Search}`;
      fetcher.load(loader);
    }
  };

  const onPrevPage = () => {
    let loader = '';
    if (hasPreviousPage || Search.length != 0) {
      if (hasPreviousPage)
        loader =
          loader +
          `${isLocation.pathname}?direction=prev&cursor=${startCursor}`;
      if (Search.length != 0) loader = loader + `&filter=${Search}`;
      fetcher.load(loader);
    }
  };

  useEffect(() => {
    setEndCursor(products.pageInfo.endCursor);
    setHasNextPage(products.pageInfo.hasNextPage);
    setHasPreviousPage(products.pageInfo.hasPreviousPage);
    setStartCursor(products.pageInfo.startCursor);
    setJournalProducts(products.nodes);
  }, []);

  useEffect(() => {
    if (!fetcher.data) {
      return;
    } else {
      setJournalProducts(fetcher.data.products.nodes);
      setEndCursor(fetcher.data.products.pageInfo.endCursor);
      setHasNextPage(fetcher.data.products.pageInfo.hasNextPage);
      setHasPreviousPage(fetcher.data.products.pageInfo.hasPreviousPage);
      setStartCursor(fetcher.data.products.pageInfo.startCursor);
    }
  }, [fetcher.data]);

  const Items = journalProducts;

  return (
    <Layout>
      <Fade in={true} timeout={800}>
        <Stack
          display={'flex'}
          alignItems={'center'}
          width={'100%'}
          minHeight={{md: '90vh'}}
        >
          <Stack component={'div'} className="search" width={'81%'}>
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
                '& .MuiInputLabel-root': {color: 'gray'},
                '& .MuiInputBase-input': {color: 'black'},
              }}
              defaultValue={CollectionParams}
              onChange={(e) => SetSearch(e.target.value)}
            />
          </Stack>
          <Stack
            component={'section'}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'flex-start'}
            flexWrap={'wrap'}
            width={'85%'}
            minHeight={'70%'}
            // border={'1px solid black'}
          >
            <List Items={Items} />
          </Stack>
          <Stack
            component={'div'}
            display={'flex'}
            alignItems={'center'}
            width={'85%'}
            justifyContent={'space-evenly'}
            marginBottom={'24px'}
          >
            {/* Buttons container */}
            <Stack
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-evenly'}
              flexDirection={'row'}
              width={'20%'}
            >
              <input
                type="button"
                value={'Anterior'}
                className={hasPreviousPage ? 'NavButton' : 'DisableButton'}
                disabled={!hasPreviousPage}
                onClick={onPrevPage}
              />
              <input
                type="button"
                value={'Siguiente'}
                className={hasNextPage ? 'NavButton' : 'DisableButton'}
                disabled={!hasNextPage}
                onClick={onNextPage}
              />
            </Stack>
          </Stack>
        </Stack>
      </Fade>
    </Layout>
  );
};

export default Store;

const COLLECTIONS_QUERY_PREV = `#graphql
query getAllCollections($query: String, $pageBy: Int!, $cursor: String) {
    collections(first: 10, query: $query) {
      nodes {
        title
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
    }
  }
`;

const COLLECTIONS_QUERY_NEXT = `#graphql
query getAllCollections($query: String, $pageBy: Int!, $cursor: String) {
    collections(first: 10, query: $query) {
      nodes {
        title
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
    }
  }
`;

// 1
const PRODUCT_QUERY_NEXT = `#graphql
query GetAllProducts(
    $pageBy: Int!
    $cursor: String
    $query: String
  ){
    products(first: $pageBy, after: $cursor, query: $query) {
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
    $query: String
  ){
    products(last: $pageBy, before: $cursor, query: $query) {
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
