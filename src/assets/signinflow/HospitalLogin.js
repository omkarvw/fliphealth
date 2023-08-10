import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../../components/Footer';

const HospitalLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const name = useRef();

    const email = useRef();
    const phone = useRef();

    const license = useRef();
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {

        // Asking if metamask is already present or not
        if (window.ethereum) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => {
                    setAccounts(res);
                    setIsLoading(false)
                });
        } else {
            alert("install metamask extension!!");
        }
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();
        // add field for degree name
        const data = { name: name.current.value, phone: phone.current.value, email: email.current.value, license: license.current.value };

        // const res = await registerHospital(data, accounts[0]);
        const res = await registerHospital(data, '0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029');
        console.log(res);
    };

    return (
        <>
            {isLoading && <Box sx={{ display: 'flex', position: "absolute", top: "48%", left: "48%" }}>
                <CircularProgress />
            </Box>}
            {!isLoading && <><Navbar />
                <Container component="main" maxWidth="s">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LocalHospitalIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up as a Hospital
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "600px", marginBottom: "60px" }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                label="Name"
                                type="text"
                                id="name"
                                inputRef={name}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                type='email'
                                inputRef={email}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Mobile Number"
                                name="phone"
                                type='text'
                                inputRef={phone}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="license"
                                label="License"
                                name="license"
                                inputRef={license}

                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </Container><Footer /></>}
        </>
    );

}

export default HospitalLogin;
