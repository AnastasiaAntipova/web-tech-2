"use client";

import { useState } from "react";
import {Box, Button, TextField, Typography, Container, CssBaseline, Alert, Avatar} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { ApiClient } from "../api-client/ApiClient";
import { useStore } from "../store/context";

export default function LoginPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const {user} = useStore()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        const {data, error: apiError} = await ApiClient.login(email, password)

        setError(apiError);
        user.setUserToken(data.data.token)
        
     
    };
    console.log(">>>>>>>>>>>>", user)

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box 
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
            <Avatar sx={{m:1, bgcolor:"secondary.main"}}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{mt:1}}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}
