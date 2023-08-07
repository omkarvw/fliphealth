import { Avatar, Button, Card } from '@mui/material'
import React from 'react';
import Web3 from 'web3';
import { doctorABI } from '../../abis/doctor.js'
const web3 = new Web3('http://127.0.0.1:7545');
const doctorContract = new web3.eth.Contract(doctorABI, "0x7e96E574ABCD8Fc3d95492D499BD85B3c6bE4d18");

function SearchDocResult() {

    let globalAddress;
    const grantAccessFunction = async (doctorAddress) => {
        const res = await doctorContract.methods.grantAccess(doctorAddress).send({
            from: globalAddress,
            gas: 3000000
        });
        console.log(res);
    }

    return (
        <>
            <Card sx={{ width: "60vw", minWidth: "420px", padding: "10px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                        R
                    </Avatar>
                    <p style={{ margin: "auto 15px" }}>Dr. Numun Bhugut</p>
                </div>
                <Button variant="contained" style={{ margin: "auto 15px" }}>Grant Access</Button>
            </Card>
        </>
    )
}

export default SearchDocResult