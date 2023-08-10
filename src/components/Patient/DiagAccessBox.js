import React from 'react';
import { Avatar, Button, Card } from '@mui/material'
import { revokeAccessOfDiagnostic } from '../../Utils/SmartContractUtils';
const DiagAccessBox = () => {

    const handleRevoke = async () => {
        const res = revokeAccessOfDiagnostic("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029", "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029");
        console.log(res);
    }

    return (
        <>
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        R
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >Wadu  ka Kotha</p></div>
                </div>
                <Button variant="outlined" color="neutral" style={{ margin: "auto 15px" }}>Revoke Access</Button>
            </Card>
        </>
    );
}

export default DiagAccessBox;
