import React from 'react';
import {useState} from 'react';
import {Stack, Typography, Box, Button} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link} from 'react-router-dom';
import {CartForm} from '@shopify/hydrogen';
import {Opacity} from '@mui/icons-material';

function ProductForm({productId, isHovered}) {
  const lines = [{merchandiseId: productId, quantity: 1}];

  return (
    <CartForm route="/cart" action={CartForm.ACTIONS.LinesAdd} inputs={{lines}}>
      <Button
        variant="contained"
        sx={{
          color: 'white',
          width: '100%',
          height: '25%',
          position: 'absolute',
          bottom: 25,
          left: 0,
          backgroundColor: '#202123',
          opacity: isHovered ? 0.8 : 0,
        }}
        type="submit"
      >
        <Typography
          textAlign={'center'}
          variant="h4"
          color={'#fff'}
          fontSize={{
            lg: '0.7rem',
          }}
        >
          Agregar al carrito
        </Typography>
        <ShoppingCartIcon sx={{color: 'white', ml: 1, fontSize: '0.9rem'}} />
      </Button>
    </CartForm>
  );
}

function AddShoppingCart(data) {
  alert(`${data.nombre} agregado al carrito exitosamente.`);
}

export default function CardComponent({children}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Stack
      //   border={'1px solid black'}
      width={{md: '20%'}}
      height={{md: '45%'}}
      display={'flex'}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      mr={'3%'}
      ml={'2%'}
      mb={'2%'}
      p={1}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Stack
        display={'flex'}
        flexDirection={'column'}
        // border={'1px solid red'}
        width={'100%'}
        height={'100%'}
      >
        <Stack
          display={'flex'}
          position={'relative'}
          alignItems={'center'}
          justifyContent={'center'}
          //   border={'1px solid blue'}
          width={'100%'}
          height={'75%'}
        >
          <Link
            to={{
              pathname: `/store/${children.id}`,
            }}
          >
            <Box
              width={'100%'}
              height={'100%'}
              component="img"
              alt={children.name}
              src={children.image}
              sx={{
                objectFit: 'fill',
              }}
            />
          </Link>
          <ProductForm productId={children?.variant} isHovered={isHovered} />
        </Stack>
        <Stack
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          //   border={'1px solid gray'}
          width={'100%'}
          mt={'3%'}
          height={'22%'}
        >
          {' '}
          <Typography
            textAlign={'center'}
            variant="h1"
            color={'#333'}
            fontSize={{
              lg: '1.2rem',
            }}
          >
            {children.nombre}
          </Typography>
          <Stack
            display={'flex'}
            direction={'row'}
            justifyContent={'center'}
            spacing={1}
          >
            <Typography
              variant="h2"
              color={'#333'}
              fontSize={{
                lg: '0.8rem',
              }}
            >
              ${children.precio_final} MXN
            </Typography>
            <Typography
              variant="h2"
              color={'#C32F27'}
              fontSize={{
                lg: '0.8rem',
              }}
            >
              -{children.descuento}%
            </Typography>
          </Stack>
          <Typography
            variant="h4"
            color={'#C5C5C5'}
            textAlign={'center'}
            fontSize={{
              lg: '0.8rem',
            }}
            sx={{textDecoration: 'line-through'}}
          >
            ${children.precio_real} MXN
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
