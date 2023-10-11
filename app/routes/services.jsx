import React from 'react';
import {Box, Stack, Typography, useMediaQuery, Fade} from '@mui/material';
import Layout from '../components/Layout/Layout';
import sectionOneImg from '../assets/Services-1.png';
import sectionTwoImg from '../assets/Services-2.png';
import sectionThreeImg from '../assets/Services-3.png';
import sectionFourImg from '../assets/Services-4.png';

export const meta = () => {
  return [{title: 'Servicios'}];
};

const Services = () => {
  return (
    <Layout>
      <Fade in={true} timeout={1000}>
        <Stack>
          <Stack
            direction={'column'}
            component={'main'}
            width={'100%'}
            alignItems={'center'}
            // sx={{ border: "1px solid black" }}
          >
            {/* ---------------------------Section 1--------------------------- */}
            <Stack
              component={'section'}
              direction={{sx: 'column', md: 'row'}}
              width={'90%'}
              // sx={{ border: "1px solid black" }}
            >
              <Stack
                direction={'column'}
                width={{xs: '100%', sm: '100%', md: '50%'}}
                alignItems={'center'}
                justifyContent={'center'}
                // sx={{ border: "1px solid red" }}
              >
                <Typography
                  variant="h1"
                  fontSize={{
                    xs: '2.5rem',
                    sm: '3.5rem',
                    md: '4.2rem',
                    lg: '5.5rem',
                  }}
                  lineHeight={0.8}
                  textAlign={'center'}
                  fontWeight={400}
                  color={'primary.main'}
                  sx={{letterSpacing: '-2px'}}
                >
                  Crafting Spaces
                </Typography>
                <Typography
                  variant="h1"
                  fontSize={{
                    xs: '2.3rem',
                    sm: '3.5rem',
                    md: '4rem',
                    lg: '5.5rem',
                  }}
                  fontWeight={400}
                  sx={{opacity: 0.3, letterSpacing: '-2px'}}
                  lineHeight={0.8}
                  textAlign={'center'}
                >
                  Shaping Dreams
                </Typography>
                <Box
                  component="img"
                  sx={{
                    maxHeight: {xs: 280, sm: 400, md: '70%'},
                    maxWidth: {xs: 350, sm: 380, md: '70%'},
                  }}
                  alt=""
                  src={sectionOneImg}
                />
              </Stack>
              <Stack
                alignItems={'center'}
                justifyContent={'center'}
                // sx={{ border: "1px solid blue" }}
                width={{xs: '100%', sm: '100%', md: '50%'}}
              >
                <Typography
                  variant="h6"
                  fontSize={{xs: '1em', sm: '1.1rem', md: '1.5rem'}}
                  lineHeight={1.5}
                  textAlign={'center'}
                  fontWeight={200}
                  color={'primary.main'}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque eu velit finibus, cursus nunc ornare, mattis ex. Etiam
                  sagittis magna sit amet purus interdum, vitae eleifend nisl
                  molestie Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Quisque eu velit finibus, cursus nunc ornare, mattis ex.
                  Etiam sagittis magna sit amet purus interdum, vitae eleifend
                  nisl molestie Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Quisque eu velit finibus, cursus nunc ornare,
                  mattis ex. Etiam sagittis magna sit amet purus interdum, vitae
                  eleifend nisl molestie
                </Typography>
              </Stack>
            </Stack>
            {/* ---------------------------Section 2--------------------------- */}
            <Stack
              component={'section'}
              direction={{sx: 'column', md: 'column'}}
              width={'90%'}
              marginTop={{xs: '94px', sm: '128px', md: '128px'}}
              // sx={{ border: "1px solid red" }}
            >
              <Typography
                variant="h1"
                fontSize={{xs: '2.3rem', sm: '3rem', md: '4.5rem'}}
                fontWeight={400}
                lineHeight={1}
                textAlign={'center'}
                color={'primary.main'}
                sx={{letterSpacing: '-4px'}}
              >
                Tailored Designs for Exceptional Living
              </Typography>
              <Stack
                direction={{sx: 'column', md: 'row'}}
                alignItems={{xs: 'center', md: 'center'}}
                marginTop={{md: '24px'}}
              >
                <Typography
                  variant="h6"
                  fontSize={{xs: '1em', sm: '1.1rem', md: '1.4rem'}}
                  width={{xs: '90%', md: '20%'}}
                  fontWeight={200}
                  color={'primary.main'}
                  textAlign={'center'}
                  justifyContent={'center'}
                  my={{xs: '24px', md: '24px'}}
                  mx={{md: '12px'}}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque eu velit finibus, cursus nunc ornare, mattis ex. Etiam
                  sagittis magna sit amet purus interdum, vitae eleifend nisl
                  molestie Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Quisque eu velit finibus, cursus nunc ornare, mattis ex.
                </Typography>

                <Box
                  component="img"
                  sx={{
                    maxHeight: {xs: '100%', sm: '100%', md: '55%'},
                    maxWidth: {xs: '100%', sm: '100%', md: '55%'},
                  }}
                  alt=""
                  src={sectionTwoImg}
                />
                <Typography
                  variant="h6"
                  fontSize={{xs: '1em', sm: '1.1rem', md: '1.4rem'}}
                  width={{xs: '90%', md: '20%'}}
                  fontWeight={200}
                  color={'primary.main'}
                  textAlign={'center'}
                  justifyContent={'center'}
                  my={{xs: '24px', md: '24px'}}
                  mx={{md: '12px'}}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque eu velit finibus, cursus nunc ornare, mattis ex. Etiam
                  sagittis magna sit amet purus interdum, vitae eleifend nisl
                  molestie Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Quisque eu velit finibus, cursus nunc ornare, mattis ex.
                </Typography>
              </Stack>
            </Stack>
            {/* ---------------------------Section 3--------------------------- */}
            <Stack
              component={'section'}
              direction={{sx: 'column', md: 'row'}}
              width={'90%'}
              marginTop={{xs: '94px', md: '128px', lg: '256px'}}
              // sx={{ border: "1px solid black" }}
            >
              <Stack
                direction={{sx: 'column', md: 'column'}}
                alignItems={{xs: 'center'}}
              >
                <Typography
                  variant="h1"
                  fontSize={{
                    xs: '2.3rem',
                    sm: '3rem',
                    md: '3.8rem',
                    lg: '4.5rem',
                  }}
                  fontWeight={400}
                  textAlign={{xs: 'center', md: 'left'}}
                  lineHeight={0.8}
                  color={'primary.main'}
                  sx={{letterSpacing: '-4px'}}
                >
                  A Transformational
                </Typography>
                <Typography
                  variant="h1"
                  fontSize={{
                    xs: '2.3rem',
                    sm: '3rem',
                    md: '3.8rem',
                    lg: '4.5rem',
                  }}
                  fontWeight={400}
                  textAlign={{xs: 'center', md: 'center'}}
                  color={'primary.main'}
                  sx={{letterSpacing: '-4px'}}
                  lineHeight={0.8}
                >
                  Design Experience
                </Typography>
                <Typography
                  variant="h6"
                  fontSize={{xs: '1em', sm: '1.1rem', md: '1.4rem'}}
                  width={{xs: '90%', md: '90%'}}
                  textAlign={{xs: 'center', md: 'center'}}
                  lineHeight={1.5}
                  marginTop={{xs: '16px', md: '24px'}}
                  color={'primary.main'}
                  fontWeight={200}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque eu velit finibus, cursus nunc ornare, mattis ex. Etiam
                  sagittis magna sit amet purus interdum, vitae eleifend nisl
                  molestie Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Quisque eu velit finibus, cursus nunc ornare, mattis ex.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque eu velit finibus, cursus nunc ornare, mattis ex. Etiam
                  sagittis magna sit amet purus interdum, vitae eleifend nisl
                  molestie Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Quisque eu velit finibus, cursus nunc ornare, mattis ex.
                </Typography>
              </Stack>
              <Box
                marginTop={{xs: '16px', sm: '32px', md: '0px'}}
                component="img"
                sx={{
                  maxHeight: {xs: '100%', sm: '100%', md: '70%'},
                  maxWidth: {xs: '100%', sm: '100%', md: '60%'},
                }}
                alt=""
                src={sectionThreeImg}
              />
            </Stack>
            {/* ---------------------------Section 4--------------------------- */}
            <Stack
              component={'section'}
              direction={{sx: 'column', md: 'column'}}
              width={'100%'}
              marginTop={{xs: '128px', md: '256px'}}
              // sx={{ border: "1px solid black" }}
            >
              <Stack>
                <Typography
                  variant="h1"
                  fontSize={{xs: '2.3rem', sm: '3rem', md: '5rem'}}
                  textAlign={{xs: 'center', md: 'center'}}
                  fontWeight={400}
                  color={'primary.main'}
                  sx={{letterSpacing: '-3px'}}
                  lineHeight={0.7}
                >
                  El Arte de Convertir
                </Typography>
                <Typography
                  variant="h1"
                  fontSize={{xs: '2.3rem', sm: '3rem', md: '5rem'}}
                  lineHeight={0.8}
                  textAlign={'center'}
                  fontWeight={400}
                  color={'primary.main'}
                  sx={{opacity: '0.3', letterSpacing: '-3px'}}
                >
                  Un Espacio en un Hogar
                </Typography>
              </Stack>
              <Box
                component="img"
                marginTop={{xs: '16px', sm: '32px', md: '48px'}}
                sx={{
                  maxHeight: {xs: '100%', sm: '100%', md: '100%'},
                  maxWidth: {xs: '100%', sm: '100%', md: '100%'},
                }}
                alt=""
                src={sectionFourImg}
              />
              <Stack
                direction={'row'}
                justifyContent={'center'}
                spacing={1}
                marginTop={2}
              >
                <Stack
                  width={'50px'}
                  height={{xs: '100px', sm: '150px', md: '200px'}}
                  sx={{borderRadius: '24px 24px 0 0 ', background: '#514031'}}
                ></Stack>
                <Stack
                  width={'50px'}
                  height={{xs: '100px', sm: '150px', md: '200px'}}
                  sx={{borderRadius: '24px 24px 0 0 ', background: '#CDA987'}}
                ></Stack>
                <Stack
                  width={'50px'}
                  height={{xs: '100px', sm: '150px', md: '200px'}}
                  sx={{borderRadius: '24px 24px 0 0 ', background: '#E7E8E9'}}
                ></Stack>
                <Stack
                  width={'50px'}
                  height={{xs: '100px', sm: '150px', md: '200px'}}
                  sx={{borderRadius: '24px 24px 0 0 ', background: '#201B1B'}}
                ></Stack>
              </Stack>
            </Stack>
          </Stack>
          {/* ---------------------------General container - Close --------------------------- */}
        </Stack>
      </Fade>
    </Layout>
  );
};

export default Services;
