import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Web3 from 'web3';
// import { doctorABI } from '../../abis/doctor.js'
const web3 = new Web3(process.env.BLOCKCHAIN_PROVIDER_URL);
const doctorContract = new web3.eth.Contract(process.env.DOCTOR_CONTRACT_ABI, process.env.DOCTOR_CONTRACT_ADDRESS);

const PatUser = () => {

    let userData;
    // tujhe global state main logged in account ka address bhi store karna padega.
    let accountAddress;

    const getUserData = async () => {
        const result = await doctorContract.methods.getPatientOwnProfile().call({
            from: accountAddress
        })
        userData = result;
    }

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /></Container>
        </>
    );
}

export default PatUser;
