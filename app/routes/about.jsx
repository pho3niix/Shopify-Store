import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Layout from "../components/Layout/Layout";
import {
  ImageList,
  ImageListItemBar,
  ImageListItem,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import aboutUsImgOne from "../assets/About-us-2.png";
import aboutUsImgTwo from "../assets/About-us-1.png";
import aboutUsImgThree from "../assets/About-us-3.png";

export const meta = () => {
  return [{ title: 'Conócenos' }];
};

const AboutUs = () => {
  const itemData = [
    {
      img: "https://placekitten.com/400/300",
      title: "Gato 1",
    },
    {
      img: "https://placekitten.com/500/400",
      title: "Gato 2",
    },
    {
      img: "https://placekitten.com/600/800",
      title: "Gato 3",
    },
    {
      img: "https://placekitten.com/300/400",
      title: "Gato 4",
    },
    {
      img: "https://placekitten.com/450/600",
      title: "Gato 5",
    },
    {
      img: "https://placekitten.com/500/300",
      title: "Gato 6",
    },
    {
      img: "https://placekitten.com/600/500",
      title: "Gato 7",
    },
    // {
    //   img: "https://placekitten.com/400/500",
    //   title: "Gato 8",
    // },
    // {
    //   img: "https://placekitten.com/350/500",
    //   title: "Gato 9",
    // },
    // {
    //   img: "https://placekitten.com/550/400",
    //   title: "Gato 10",
    // },
    // {
    //   img: "https://placekitten.com/500/500",
    //   title: "Gato 11",
    // },
    // {
    //   img: "https://placekitten.com/550/350",
    //   title: "Gato 12",
    // },
    // {
    //   img: "https://placekitten.com/450/500",
    //   title: "Gato 13",
    // },
    // {
    //   img: "https://placekitten.com/350/450",
    //   title: "Gato 14",
    // },
    // {
    //   img: "https://placekitten.com/600/400",
    //   title: "Gato 15",
    // },
  ];
  return (
    <Layout>
      <Stack
        direction={"column"}
        component={"main"}
        width={"100%"}
        height={"100%"}
        display={"flex"}
        alignItems={"center"}
      // sx={{ border: "1px solid black" }}
      >
        {/* Section: 1 */}
        <Stack
          component={"section"}
          direction={"row"}
          width={"90%"}
        // sx={{ border: "1px solid red" }}
        >
          {/* Elemento izquierdo */}
          <Stack
            width={"50%"}
            direction={"column"}
          // sx={{ border: "1px solid red" }}
          >
            <Stack
              direction={"row"}
              justifyContent={"center"}
            // sx={{ border: "1px solid blue" }}
            >
              <Typography
                variant="h1"
                lineHeight={0.8}
                marginRight={{
                  xs: "-38%",
                  sm: "-38%",
                  lg: "-42%"
                }}
                fontSize={{
                  xs: "4rem",
                  sm: "7.5rem",
                  lg: "16rem",
                }}
                fontWeight={600}
                letterSpacing={{ xs: "-6px", md: "-18px" }}
                color={"primary.main"}
                sx={{
                  opacity: "0.1",
                }}
              >
                OB
              </Typography>

              <Typography
                variant="h1"
                lineHeight={0.8}
                marginRight={{
                  xs: "-38%",
                  sm: "-38%",
                  lg: "-42%"
                }}
                fontSize={{
                  xs: "4rem",
                  sm: "7.5rem",
                  lg: "16rem",
                }}
                fontWeight={600}
                letterSpacing={{ xs: "-6px", md: "-18px" }}
                color={"primary.main"}
                sx={{
                  opacity: "0.2",
                }}
              >
                OB
              </Typography>

              <Typography
                variant="h1"
                lineHeight={0.8}
                marginRight={{
                  xs: "-38%",
                  sm: "-38%",
                  lg: "-42%"
                }}
                fontSize={{
                  xs: "4rem",
                  sm: "7.5rem",
                  lg: "16rem",
                }}
                fontWeight={600}
                letterSpacing={{ xs: "-6px", md: "-18px" }}
                color={"primary.main"}
                sx={{
                  opacity: "0.4",
                }}
              >
                OB
              </Typography>

              <Typography
                variant="h1"
                lineHeight={0.8}
                fontSize={{
                  xs: "4rem",
                  sm: "7.5rem",
                  lg: "16rem",
                }}
                fontWeight={600}
                letterSpacing={{ xs: "-6px", md: "-18px" }}
                color={{ sm: "primary.main" }}
              >
                OB
              </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"center"}>
              <Typography
                variant="h1"
                lineHeight={0.8}
                color={"primary.main"}
                fontSize={{
                  xs: "2.5rem",
                  sm: "3.8rem",
                  lg: "6.2rem",
                }}
                marginRight={{
                  xs: "-12%",
                  sm: "-9%",
                  lg: "-8%",
                }}
                fontWeight={500}
                letterSpacing={{ xs: "-24px", md: "-32px" }}

                sx={{
                  textOrientation: "upright",
                  writingMode: "vertical-lr",
                  opacity: "0.1",
                }}
              >
                INTERIORISMO
              </Typography>
              <Typography
                variant="h1"
                lineHeight={0.8}
                color={"primary.main"}
                fontSize={{
                  xs: "2.5rem",
                  sm: "3.8rem",
                  md: "4.5rem",
                  lg: "6.2rem",
                }}
                fontWeight={500}
                letterSpacing={{ xs: "-24px", md: "-32px" }}
                marginRight={{
                  xs: "-12%",
                  sm: "-9%",
                  lg: "-8%",
                }}
                sx={{
                  textOrientation: "upright",
                  writingMode: "vertical-lr",
                  opacity: "0.2",
                }}
              >
                INTERIORISMO
              </Typography>
              <Typography
                variant="h1"
                lineHeight={0.8}
                color={"primary.main"}
                fontSize={{
                  xs: "2.5rem",
                  sm: "3.8rem",
                  md: "4.5rem",
                  lg: "6.2rem",
                }}
                fontWeight={500}
                letterSpacing={{ xs: "-24px", md: "-32px" }}
                marginRight={{
                  xs: "-12%",
                  sm: "-9%",
                  lg: "-8%",
                }}
                sx={{
                  textOrientation: "upright",
                  writingMode: "vertical-lr",
                  opacity: "0.4",
                }}
              >
                INTERIORISMO
              </Typography>
              <Typography
                variant="h1"
                lineHeight={0.8}
                color={"primary.main"}
                fontSize={{
                  xs: "2.5rem",
                  sm: "3.8rem",
                  md: "4.5rem",
                  lg: "6.2rem",
                }}
                fontWeight={500}
                letterSpacing={{ xs: "-24px", md: "-32px" }}
                sx={{
                  textOrientation: "upright",
                  writingMode: "vertical-lr",
                }}
              >
                INTERIORISMO
              </Typography>
            </Stack>
          </Stack>
          {/* Elemento derecho */}
          <Stack
            width={"50%"}
            height={"100%"}
            direction={"column"}
          // sx={{ border: "1px solid blue" }}
          >
            <ImageList variant="masonry" cols={2} gap={8}>
              {itemData.map((item, index) => (
                <ImageListItem key={index} cols={1}>
                  <img
                    key={index + 1}
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Stack>
        </Stack>
        {/* Section: 2 */}
        <Stack
          component={"section"}
          direction={{ sx: "column", md: "row" }}
          width={"90%"}
          marginTop={{ xs: "128px", md: "128px" }}
          justifyContent={{ xs: "center", md: "space-between" }}
          gap={{ md: 4 }}
        // sx={{ border: "1px solid black" }}
        >
          <Stack
            direction="column"
            width={{ xs: "100%", md: "90%" }}
            justifyContent={{ xs: "center" }}
          // sx={{ border: "1px solid red" }}
          >
            <Typography
              variant="h1"
              fontSize={{
                xs: "3rem",
                sm: "3.8rem",
                lg: "5.5rem",
              }}
              fontWeight={"600"}
              lineHeight={0.7}
              color={"primary.main"}
              textAlign={"center"}
              letterSpacing={{ xs: "-4px", md: "-6px" }}
            >
              The Creative Spark
            </Typography>
            <Typography
              variant="h2"
              fontSize={{
                xs: "3rem",
                sm: "3.8rem",
                lg: "5.5rem",
              }}
              fontWeight={"600"}
              letterSpacing={{ xs: "-4px", md: "-6px" }}
              lineHeight={0.7}
              textAlign={"center"}
              color={"primary.main"}
              // textAlign={"center"}
              sx={{
                transform: "scale(1,-1)",
                opacity: "0.3",
              }}
            >
              The Creative Spark
            </Typography>
            <Typography
              variant="h6"
              fontSize={{
                xs: "1rem",
                sm: "1.2rem",
                lg: "1.4rem",
              }}
              marginTop={{ xs: "24px", md: "24px" }}
              fontWeight={"100"}
              lineHeight={1.5}
              color={"primary.main"}
              textAlign={"center"}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
              fugiat quis ex autem provident laboriosam asperiores incidunt
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
              blanditiis vero ab optio debitis nisi maiores ducimus, quibusdam
              quidem veritatis. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Aut fugiat quis ex autem provident laboriosam
              asperiores incidunt Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Cumque blanditiis vero ab optio debitis nisi
              maiores ducimus, quibusdam quidem veritatis.
            </Typography>
          </Stack>
          <Box
            alignSelf={"center"}
            component="img"
            width={{ xs: "100%", md: "80%" }}
            marginTop={{ xs: "24px", md: "0px" }}
            sx={{
              maxHeight: { xs: "80%" },
              maxWidth: { xs: "80%" },
            }}
            alt=""
            src={aboutUsImgOne}
          />
        </Stack>
        {/* Section: 3 */}
        <Stack
          component={"section"}
          direction={"row"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={"128px"}
        // sx={{ border: "1px solid black" }}
        >
          <Typography
            variant="h1"
            color={"#fff"}
            fontSize={{
              xs: "2.2rem",
              sm: "3.5rem",
              md: "4.2rem",
              lg: "5.5rem",
            }}
            position={"absolute"}
            fontWeight={"600"}
            sx={{
              textShadow: "4px 4px 4px rgba(51,51,51,0.25)",
            }}
          >
            Embracing Curiosity
          </Typography>
          <Box
            component="img"
            sx={{
              maxHeight: { xs: "100%", md: "100%" },
              maxWidth: { xs: "100%", md: "100%" },
            }}
            alt=""
            src={aboutUsImgTwo}
          />
        </Stack>
        {/* Section: 4  */}
        <Stack
          component={"section"}
          direction={"column"}
          width={{ xs: "90%", md: "90%" }}
          alignItems={{ md: "center" }}
          marginTop={"192px"}
          marginBottom={{ xs: "92px", md: "92px", lg: "0px" }}
        // sx={{ border: "1px solid black" }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "center", md: "center" }}
            width={{ xs: "100%", md: "100%" }}
          // sx={{ border: "1px solid blue" }}
          >
            <Stack
              // sx={{ border: "1px solid red" }}
              width={{ md: "45%" }}
            >
              <Typography
                color={"primary.main"}
                variant="h1"
                fontWeight={600}
                fontSize={{
                  xs: "2.7rem",
                  sm: "3.5rem",
                  md: "4.2rem",
                  lg: "5.5rem",
                }}
                textAlign={"center"}
              >
                Unbounded
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "column" }}
                alignItems={{ xs: "center", sm: "center" }}
              >
                <Box
                  component="img"
                  width={"80%"}
                  sx={{
                    maxHeight: { xs: 256, md: 172 },
                    maxWidth: { xs: 256, md: 172 },
                  }}
                  alt=""
                  src={aboutUsImgOne}
                />
                <Box
                  component="img"
                  width={"80%"}
                  sx={{
                    maxHeight: { xs: 256, md: 172 },
                    maxWidth: { xs: 256, md: 172 },
                  }}
                  alt=""
                  src={aboutUsImgOne}
                />
                <Box
                  component="img"
                  width={"80%"}
                  sx={{
                    maxHeight: { xs: 256, md: 172 },
                    maxWidth: { xs: 256, md: 172 },
                  }}
                  alt=""
                  src={aboutUsImgOne}
                />
              </Stack>
            </Stack>
            <Stack
              // sx={{ border: "1px solid black" }}
              width={{ md: "10%" }}
            >
              <Typography
                color={{ xs: "white", md: "primary.main" }}
                variant="h1"
                fontWeight={600}
                fontSize={{
                  xs: "2.7rem",
                  sm: "3.5rem",
                  md: "4.2rem",
                  lg: "5.5rem",
                }}
                textAlign={"center"}
              >
                +
              </Typography>
            </Stack>
            <Stack
              width={{ md: "45%" }}
            // sx={{ border: "1px solid black" }}
            >
              <Typography
                color={"primary.main"}
                variant="h1"
                fontWeight={600}
                fontSize={{
                  xs: "3rem",
                  sm: "3.5rem",
                  md: "4.2rem",
                  lg: "5.5rem",
                }}
                textAlign={"center"}
              >
                Expressions
              </Typography>
              <Stack alignItems={"center"}>
                <Box
                  component="img"
                  width={{ xs: "100%", md: "90%" }}
                  sx={{
                    maxHeight: { xs: "100%", md: "100%" },
                    maxWidth: { xs: "100%", md: "100%" },
                  }}
                  alt=""
                  src={aboutUsImgThree}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default AboutUs;
