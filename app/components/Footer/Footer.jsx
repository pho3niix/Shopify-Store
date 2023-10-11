import React, { useState } from "react";
import {
    Typography,
    Stack,
    List,
    AccordionSummary,
    AccordionDetails,
    Accordion,
    Box,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import footerLogo from "../../assets/ob_logo-black.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { styled } from '@mui/material/styles';
import { ArrowForwardSharp } from '@mui/icons-material';
import logo_text from '../../assets/ob_logo_text-black.png';

const MUIAccordion = styled((props) => (
    <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
}));

const MuiAccordionSummary = styled((props) => (
    <AccordionSummary
        expandIcon={<ArrowForwardSharp sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
}));

const MuiAccordionDetails = styled(AccordionDetails)(({ theme }) => ({

}));

function FooterWebView() {
    return (
        <Stack
            component={"footer"} className="footer"
            sx={{
                display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' },
            }}
            height={'284px'}
        >
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                className="container"
            >
                <Stack className="row">
                    <img src={footerLogo} alt="" />
                </Stack>
                <Stack className="row">
                    <Typography
                        variant="h6"
                        component="label"
                        fontWeight={700}
                        className="rowTitle"
                    >
                        Enlaces
                    </Typography>
                    <List disablePadding>
                        <Link to="/">Inicio</Link>
                        <Link to="/services">Servicios</Link>
                        <Link to="/store">Tienda</Link>
                        <Link to="/about">Conócenos</Link>
                    </List>
                </Stack>
                <Stack className="row">
                    <Typography
                        variant="h6"
                        component="label"
                        fontWeight={700}
                        className="rowTitle"
                    >
                        Síguenos
                    </Typography>
                    <List disablePadding>
                        <Link to="https://www.facebook.com/obinteriorismo">
                            <FacebookIcon fontSize="large" />
                        </Link>
                        <Link to="https://www.instagram.com/obinteriorismo">
                            <InstagramIcon fontSize="large" />
                        </Link>
                        <Link to="https://www.pinterest.com.mx/obinteriorismo/">
                            <PinterestIcon fontSize="large" />
                        </Link>
                    </List>
                </Stack>
                <Stack className="row">
                    <Typography
                        variant="h6"
                        component="label"
                        fontWeight={700}
                        className="rowTitle"
                    >
                        Contáctanos
                    </Typography>
                    <List disablePadding>
                        <Link to="/contact">Contacto</Link>

                        <p className="text">
                            Boulevard Hacienda El Jacal #1303 Mansiones del Valle
                        </p>
                        <p className="text">Plaza TreceØTres, Int. 4</p>
                        <br />
                        <p className="underline">Teléfono: (52) 442-1914784</p>
                    </List>
                </Stack>
            </Stack>
            <Typography variant="subtitle2" component="div">
                Powered by: Heracles Web
            </Typography>
        </Stack>
    )
}

function ListNavigation() {
    const Navigation = [
        {
            route: '/',
            title: 'Inicio',
        },
        {
            route: '/services',
            title: 'Servicios',
        },
        {
            route: '/store',
            title: 'Tienda',
        },
        {
            route: '/about',
            title: 'Conócenos',
        },
        {
            route: '/contact',
            title: 'Contacto',
        }
    ]

    return (
        <List>
            {Navigation.map((e, i) => {
                return (
                    <Link key={i} to={e.route}>
                        <ListItemButton key={i}>
                            <Typography key={i} className="General-Text">{e.title}</Typography>
                        </ListItemButton>
                    </Link>
                )
            })}
        </List>
    )
}

function FooterMobileView() {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Stack
            component={"footer"}
            sx={{
                display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' },
            }}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
            boxShadow={'0px -5px 5px -2px #333333bf'}
            minHeight={'17em'}
            height={'auto'}
        >
            <Stack
                display={'flex'}
                direction={'row'}
                width={'100%'}
                component={'div'}
                justifyContent={'center'}
                alignItems={'center'}
                minHeight={'7em'}
            >
                <Box component='img' src={footerLogo} width={'4rem'} />
                <Box component="img" src={logo_text} width={'5em'} height={'auto'} />
            </Stack>
            <Stack
                component={"div"}
                width={'100%'}
            >
                <MUIAccordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <MuiAccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography color={'black'}>Enlaces</Typography>
                    </MuiAccordionSummary>
                    <MuiAccordionDetails>
                        {ListNavigation()}
                    </MuiAccordionDetails>
                </MUIAccordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <MuiAccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography color={'black'}>Siguenos</Typography>
                    </MuiAccordionSummary>
                    <MuiAccordionDetails >
                        <List disablePadding className="Footer-Social-Media">
                            <Link to="https://www.facebook.com/obinteriorismo">
                                <FacebookIcon fontSize="large" />
                            </Link>
                            <Link to="https://www.instagram.com/obinteriorismo">
                                <InstagramIcon fontSize="large" />
                            </Link>
                            <Link to="https://www.pinterest.com.mx/obinteriorismo/">
                                <PinterestIcon fontSize="large" />
                            </Link>
                        </List>
                    </MuiAccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <MuiAccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography color={'black'}>Contáctanos</Typography>
                    </MuiAccordionSummary>
                    <MuiAccordionDetails>
                        <List disablePadding className="Footer-Contact">
                            <Typography className="text">
                                Boulevard Hacienda El Jacal #1303 Mansiones del Valle
                            </Typography>
                            <Typography className="text">Plaza TreceØTres, Int. 4</Typography>
                            <Typography className="underline" color={'#333'}>Teléfono: (52) 442-1914784</Typography>
                        </List>
                    </MuiAccordionDetails>
                </Accordion>
            </Stack>
            <Stack>
                <Typography variant="subtitle2" component="div">
                    Powered by: Heracles Web
                </Typography>
            </Stack>
        </Stack>
    )
}

const Footer = () => {
    return <>
        <FooterWebView />
        <FooterMobileView />
    </>
};

export default Footer;
