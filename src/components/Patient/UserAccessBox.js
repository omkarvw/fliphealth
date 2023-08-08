import { Avatar, Box, Button, Card } from '@mui/material';
import React from 'react';
import Web3 from 'web3';
// import { doctorABI } from '../../abis/doctor.js'
const web3 = new Web3(process.env.BLOCKCHAIN_PROVIDER_URL);
const doctorContract = new web3.eth.Contract(process.env.DOCTOR_CONTRACT_ABI, process.env.DOCTOR_CONTRACT_ADDRESS);

function UserAccessBox() {

    let globalAddress;
    const revokeAccessFunc = async (doctorAddress) => {
        const res = await doctorContract.methods.revokeAccess(doctorAddress).send({
            from: globalAddress,
            gas: 3000000
        })
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
                <Button variant="outlined" color='neutral' style={{ margin: "auto 15px" }}>Revoke Access</Button>
            </Card>
        </>
    )
}

export default UserAccessBox;