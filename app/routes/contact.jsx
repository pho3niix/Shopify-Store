import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Layout from '../components/Layout/Layout';
import {Box, Stack, Typography, Fade} from '@mui/material';
import aboutUsImgOne from '../assets/About-us-1.png';
import ContactMap from '../assets/ContactMap-1.png';

export const meta = () => {
  return [{title: 'Contacto'}];
};

const Contact = () => {
  return (
    <Layout>
      <Fade in={true} timeout={1000}>
        <Stack>
          {/* --- Section One --- */}
          <Stack
            component={'section'}
            direction={{sx: 'column'}}
            marginTop={'-48px'}
            justifyContent={'center'}
            width={'100%'}
            height={'30vh'}
            sx={{
              // border: "1px solid black",
              backgroundColor: '#202123',
            }}
          >
            <Typography
              variant="h1"
              fontSize={{
                xs: '3rem',
                sm: '3.8rem',
                lg: '5.5rem',
              }}
              fontWeight={'600'}
              color={'white'}
              textAlign={'center'}
              sx={{
                // textDecoration: "underline",
                opacity: '0.3',
              }}
            >
              CONTACTO
            </Typography>
          </Stack>
          {/* --- Section Two --- */}
          <Stack
            component={'section'}
            direction={{sx: 'column'}}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
            height={'20vh'}
            sx={{
              // border: "1px solid black",
              backgroundColor: '#202123',
            }}
          >
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              width={'80%'}
              height={'100%'}
              // sx={{ border: "1px solid black" }}
            >
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Typography
                  variant="h1"
                  fontSize={{
                    xs: '3rem',
                    sm: '3.8rem',
                    lg: '4.5rem',
                  }}
                  fontWeight={'600'}
                  letterSpacing={{xs: '-4px', md: '-6px'}}
                  color={'white'}
                  textAlign={'left'}
                  sx={{
                    opacity: '0.3',
                  }}
                >
                  Teléfono
                </Typography>
                <WhatsAppIcon
                  sx={{color: 'white', fontSize: '4.5rem', opacity: '0.3'}}
                />
              </Stack>
              <Stack alignItems={'center'} justifyContent={'center'}>
                <Typography
                  variant="h1"
                  fontSize={{
                    xs: '3rem',
                    sm: '3.8rem',
                    lg: '2.5rem',
                  }}
                  fontWeight={'600'}
                  // letterSpacing={{ xs: "-4px", md: "-6px" }}
                  color={'white'}
                  sx={{
                    opacity: '0.3',
                  }}
                >
                  +52(999)999-9999
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {/* --- Section Three --- */}
          <Stack
            component={'section'}
            direction={{sx: 'column'}}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
            height={'30vh'}
            sx={{
              // border: "1px solid black",
              backgroundColor: '#fff',
            }}
          >
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              width={'80%'}
              height={'100%'}
              // sx={{ border: "1px solid black" }}
            >
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Typography
                  variant="h1"
                  fontSize={{
                    xs: '3rem',
                    sm: '3.8rem',
                    lg: '4.5rem',
                  }}
                  fontWeight={'600'}
                  letterSpacing={{xs: '-4px', md: '-6px'}}
                  color={'primary.main'}
                  textAlign={'left'}
                  sx={{
                    opacity: '0.3',
                  }}
                >
                  Email
                </Typography>
                <EmailIcon
                  sx={{
                    color: 'primary.main',
                    fontSize: '4.5rem',
                    opacity: '0.3',
                  }}
                />
              </Stack>
              <Stack alignItems={'center'} justifyContent={'center'}>
                <Typography
                  variant="h1"
                  fontSize={{
                    xs: '3rem',
                    sm: '3.8rem',
                    lg: '2.5rem',
                  }}
                  fontWeight={'600'}
                  // letterSpacing={{ xs: "-4px", md: "-6px" }}
                  color={'primary.main'}
                  sx={{
                    opacity: '0.3',
                  }}
                >
                  fake-mail@mail.com
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {/* --- Section Four --- */}
          <Stack
            component={'section'}
            direction={{sx: 'column'}}
            // justifyContent={"center"}
            alignItems={'center'}
            width={'100%'}
            height={'100vh'}
            sx={{
              // border: "1px solid red",
              backgroundColor: '#202123',
            }}
          >
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              width={'80%'}
              height={'30%'}
              // sx={{ border: "1px solid yellow" }}
            >
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Typography
                  variant="h1"
                  fontSize={{
                    xs: '3rem',
                    sm: '3.8rem',
                    lg: '4.5rem',
                  }}
                  fontWeight={'600'}
                  letterSpacing={{xs: '-4px', md: '-4px'}}
                  color={'white'}
                  textAlign={'left'}
                  sx={{
                    opacity: '0.3',
                  }}
                >
                  Dirección
                </Typography>
                <LocationOnIcon
                  sx={{color: 'white', fontSize: '4.5rem', opacity: '0.3'}}
                />
              </Stack>
              <Stack
                width={'50%'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Typography
                  variant="h1"
                  fontSize={{
                    xs: '3rem',
                    sm: '3rem',
                    lg: '2.5rem',
                  }}
                  fontWeight={'600'}
                  textAlign={'end'}
                  // letterSpacing={{ xs: "-4px", md: "-6px" }}
                  color={'white'}
                  sx={{
                    opacity: '0.3',
                  }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit, quisquam in officiis
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              width={'80%'}
              height={'60%'}
              // sx={{ border: "1px solid yellow" }}
            >
              <Stack
                width={'49.5%'}
                // sx={{ border: "1px solid yellow" }}
              >
                <a
                  style={{width: '100%', height: '100%'}}
                  href="https://www.google.com.mx/maps/place/OB+interiorismo/@20.5654349,-100.4200851,17z/data=!3m1!4b1!4m6!3m5!1s0x2a145b6fd2f24ca1:0x6778e54a014f3751!8m2!3d20.5654299!4d-100.4175102!16s%2Fg%2F11tf4g1jyj?entry=ttu"
                >
                  <Box
                    component={'img'}
                    src={ContactMap}
                    alt="about us"
                    width={'100%'}
                    height={'100%'}
                    sx={{objectFit: 'cover'}}
                  />
                </a>
              </Stack>
              <Stack
                width={'49.5%'}
                // sx={{ border: "1px solid red" }}
              >
                <Box
                  component={'img'}
                  src={aboutUsImgOne}
                  alt="about us"
                  width={'100%'}
                  height={'100%'}
                  sx={{objectFit: 'cover'}}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Fade>
    </Layout>
  );
};

export default Contact;
