import { useNonce } from '@shopify/hydrogen';
import { defer } from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  LiveReload,
  useMatches,
  useRouteError,
  useLoaderData,
  ScrollRestoration,
  isRouteErrorResponse,
} from '@remix-run/react';
import favicon from './assets/ob_logo.png';
import NavBarStyles from './components/NavBar/NavBar.css';
import MainStyle from './styles/main.css';
import StoreStyle from './styles/Store.css';
import LayoutStyle from './components/Layout/Layout.css';
import FooterStyle from './components/Footer/Footer.css';
import CardStyle from './components/Card/Card.css';
import ShoppingCartStyle from './components/ShoppingCart/ShoppingCart.css'
import { ThemeProvider } from "@mui/material";
import { theme } from './Theme/theme';
// import { PageContextProvider } from './services/Context'

// This is important to avoid re-fetching root queries on sub-navigations
export const shouldRevalidate = ({ formMethod, currentUrl, nextUrl }) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') {
    return true;
  }

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) {
    return true;
  }

  return false;
};

export function links() {
  return [
    { rel: 'stylesheet', href: NavBarStyles },
    { rel: 'stylesheet', href: MainStyle },
    { rel: 'stylesheet', href: StoreStyle },
    { rel: 'stylesheet', href: LayoutStyle },
    { rel: 'stylesheet', href: FooterStyle },
    { rel: 'stylesheet', href: CardStyle },
    { rel: 'stylesheet', href: ShoppingCartStyle },
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com'
    },
    {
      rel: 'stylesheet',
      href: 'http://fast.fonts.net/t/1.css?apiType=css&projectid=7ba9e0a7-abe8-437c-a682-27fa19a01908'
    },
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
  ];
}

export async function loader({ context }) {
  const { storefront, session, cart } = context;
  const customerAccessToken = await session.get('customerAccessToken');
  const publicStoreDomain = context.env.PUBLIC_STORE_DOMAIN;

  // validate the customer access token is valid
  const { isLoggedIn, headers } = await validateCustomerAccessToken(
    customerAccessToken,
    session,
  );

  // defer the cart query by not awaiting it
  const cartPromise = cart.get();

  const CollectionsPromise = storefront.query(COLLECTIONS_QUERY)

  // defer the footer query (below the fold)
  const footerPromise = storefront.query(FOOTER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      footerMenuHandle: 'footer', // Adjust to your footer menu handle
    },
  });

  // await the header query (above the fold)
  const headerPromise = storefront.query(HEADER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      headerMenuHandle: 'main-menu', // Adjust to your header menu handle
    },
  });

  return defer(
    {
      cart: cartPromise,
      footer: footerPromise,
      header: await headerPromise,
      isLoggedIn,
      publicStoreDomain,
      collections: await CollectionsPromise
    },
    { headers },
  );
}

export default function App() {
  const nonce = useNonce();
  const data = useLoaderData();

  return (
    // <PageContextProvider>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <Outlet />
        </ThemeProvider>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
    // </PageContextProvider>
  );
}

/**
 * Validates the customer access token and returns a boolean and headers
 * @see https://shopify.dev/docs/api/storefront/latest/objects/CustomerAccessToken
 *
 * @example
 * ```ts
 * //
 * const {isLoggedIn, headers} = await validateCustomerAccessToken(
 *  customerAccessToken,
 *  session,
 *  );
 *  ```
 *  */
async function validateCustomerAccessToken(customerAccessToken, session) {
  let isLoggedIn = false;
  const headers = new Headers();
  if (!customerAccessToken?.accessToken || !customerAccessToken?.expiresAt) {
    return { isLoggedIn, headers };
  }
  const expiresAt = new Date(customerAccessToken.expiresAt);
  const dateNow = new Date();
  const customerAccessTokenExpired = expiresAt < dateNow;
  if (customerAccessTokenExpired) {
    session.unset('customerAccessToken');
    headers.append('Set-Cookie', await session.commit());
  } else {
    isLoggedIn = true;
  }

  return { isLoggedIn, headers };
}

const MENU_FRAGMENT = `#graphql
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  fragment Menu on Menu {
    id
    items {
      ...ParentMenuItem
    }
  }
`;

const HEADER_QUERY = `#graphql
  fragment Shop on Shop {
    id
    name
    description
    primaryDomain {
      url
    }
    brand {
      logo {
        image {
          url
        }
      }
    }
  }
  query Header(
    $country: CountryCode
    $headerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    shop {
      ...Shop
    }
    menu(handle: $headerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
`;

const FOOTER_QUERY = `#graphql
  query Footer(
    $country: CountryCode
    $footerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    menu(handle: $footerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
`;


const COLLECTIONS_QUERY = `#graphql
  query {
    collections(first: 100) {
      edges {
        node {
          id
          title
          products(first: 10){
            nodes{
              id
              title
            }
          }
        }
      }
    }
  }
`