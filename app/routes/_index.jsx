import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Layout from "../components/Layout/Layout";
import { Stack, Box } from "@mui/material";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export const meta = () => {
  return [{ title: 'Inicio' }];
};

const Home = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

  function ListImage(number) {
    let Images = [];
    for (let i = 0; i < number; i++) {
      let source = `https://random.imagecdn.app/1800/1200?image=${i}`;
      Images.push(
        <Box
          className="embla__slide"
          component="img"
          sx={{
            backgroundImage: `url(${source})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
          key={i}
        />
      )
    }
    return (Images)
  }

  return (
    <Layout>
      <Stack className="embla" ref={emblaRef}>
        <div className="embla__container">
          {ListImage(4)}
        </div>
      </Stack>
    </Layout>
  );
};

export default Home;
