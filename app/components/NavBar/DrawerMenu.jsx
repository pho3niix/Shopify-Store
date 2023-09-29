import React from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    List,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useMatches } from '@remix-run/react';
import { Link } from 'react-router-dom';

function ClearCollections(collections = []) {
    return collections.map((e, i) => {
        const item = e.node;
        return {
            id: item.id,
            title: item.title,
            products: item.products.nodes.map(e => {
                return {
                    id: e.id,
                    title: e.title
                }
            })
        }
    })
}

const SideMenu = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const [root] = useMatches();

    const { collections } = root.data?.collections;

    const CleanCollections = ClearCollections(collections.edges);

    function ListCollections(collections = []) {
        if (collections.length > 0) {
            return collections.map((e, i) => {
                return (
                    <List key={i}>
                        <Link key={i} to={`/store?collection=${e.title}`}>
                            <ListItemText key={i}>
                                <Typography variant="h6" color={"text.secondary"}>
                                    {e.title}
                                </Typography>
                            </ListItemText>
                        </Link>
                        {e.products.map((item, index) => {
                            let RawId = item.id;
                            let ClearID = RawId.substring(RawId.lastIndexOf('/') + 1, RawId.length);
                            return (
                                <Link key={index} to={{
                                    pathname: `/store/${ClearID}`
                                }}>
                                    <ListItemButton key={index}>
                                        <Typography key={index} color={"text.secondary"}>{item.title}</Typography>
                                    </ListItemButton>
                                </Link>
                            )
                        })
                        }
                    </List >
                )
            })
        } else {
            return <Typography>Sin información para mostrar.</Typography>
        }
    }

    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                onClick={() => setOpenDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <Box p={3} width={450} textAlign={"left"}>
                    {ListCollections(CleanCollections)}
                </Box>
            </Drawer>
        </>
    );
};

export default SideMenu;
