"use client";

import React from "react";
import {AppBar, Toolbar, Typography, CssBaseline, Container, Box, Link as _Link, IconButton} from '@mui/material';
import {Menu as MenuIcon } from "@mui/icons-material";
import { StoreProvider } from "./store/context";
import Link from 'next/link'

export default function RootLayout({children}:{children: React.ReactNode}){
  return (
    <html lang="en">
    <head>
      <title>Books App</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>

    <body>
      <CssBaseline />{/*drop default browser's styles, init mui styles*/ }
      
      {/*NavBar*/}
      <AppBar position = "static">
      <Toolbar>
        <IconButton edge="start" color="inherit" area-label="menu" sx={{mr: 2}}>
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          Books App
        </Typography>
        <Link href="/">
          Home
        </Link>
        <Link href="/books">
          Books
        </Link>
        <Link href="/profile">
          Profile
        </Link>
      </Toolbar>    

      </AppBar>
      {/*Main content*/}

      <Container maxWidth="lg" sx={{mt: 4, mb: 4}} >
        <StoreProvider>
        {children}
        </StoreProvider>
      </Container>

      <Box component="footer" sx={{py: 3, px: 2, mt: "auto", 
      backgroundColor: (theme) =>
        theme.palette.mode === "light" ? theme.palette.grey[200]: theme.palette.grey[800]}}
        >
            <Container maxWidth="lg">
              <Typography variant="body1">
                @ {new Date().getFullYear()} Books App. All rights reserved
              </Typography>
              
            </Container>
      </Box>
    </body>
    </html>

  );
}