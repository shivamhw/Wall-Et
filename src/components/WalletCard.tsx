import { Box, Button, Typography } from "@mui/material";
import { wallet } from '../pages/Wallet'
import { getBal as ethBal } from '../web3/eth';
import { getBal as solBal, airDrop as solDrop } from '../web3/sol';
import { useState } from "react";
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import { DefaultCopyField } from "@eisberg-labs/mui-copy-field";


const airDropMsg = "Airdrop"

async function checkBal(address: string, chain: string){
    if(chain == "eth"){
        return await ethBal(address)
    }
    return await solBal(address)
}

export default function WalletCard({ wallet, chain } : {wallet : wallet, chain: string}){
    const [bal, setBal] = useState<string>("____")
    const [loading, setLoading] = useState<boolean>(false)
    const [airDropBtn, setAirDropBtn] = useState<string>(airDropMsg)

    return (
        <Box display='flex' gap={2} flexDirection='column' sx={{
            padding: 3,
            boxShadow: '0px 4px 12px #5555',
            borderRadius: '16px'
        }}>
            <Typography variant="h2" sx={{
                fontSize: {
                    xs: 50
                }
            }} >
                {chain} wallet 
            </Typography>
            <DefaultCopyField label="Address" inputProps={{ maxLength: 12 }} value={wallet.address}/>
            <DefaultCopyField label="Public Key" inputProps={{ maxLength: 12 }} value={wallet.publicKey}/>
            <DefaultCopyField label="Private Key" inputProps={{ maxLength: 12 }} value={wallet.privateKey}/>
            <Box display='flex' gap={1} alignItems='center'>
                <Typography variant="h6">Balance: {bal} {chain}</Typography>
                <Button  variant="outlined" color="info" onClick={async () => {
                                setBal(await checkBal(wallet.address, chain))
                            }}>
                                <SyncRoundedIcon></SyncRoundedIcon>
                </Button>
                {
                    chain == "sol" && 
                    <Button disabled={loading} color={airDropBtn == airDropMsg ? "success" : "primary"} variant="contained" onClick={ async () => {
                        setLoading(true)
                        setAirDropBtn("....")
                        await solDrop(wallet.address)
                        setAirDropBtn(airDropMsg)
                       setLoading(false)
                    }}>{airDropBtn}</Button>
                }
            </Box>
            

        </Box>
    )
}