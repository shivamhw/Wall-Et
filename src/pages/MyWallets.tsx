import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import WalletCard from "../components/WalletCard";
import { wallet } from "./GenWallets";

function MyWallets() {
    const [wall, setWall] = useState<wallet[]>([])
    const loadWallets = () => {
        const savedWallets : wallet[] = JSON.parse(localStorage.getItem("wallets") || "")
        if( !savedWallets){
            console.log("no saved wallets")
            return
        }
        setWall(savedWallets)
    }
    useEffect(loadWallets, [])
    return (
        <Stack spacing={2} alignItems='center' sx={{
            width: '99vw',
            padding: {
                xs: 3
            }
        }}
        >
            <Box display='flex' gap={2} flexDirection='column' sx={{
                padding: 3,
                boxShadow: '0px 4px 12px #5555',
                borderRadius: '16px',
                width :{
                    lg: "1000px",
                    xs: '100%'
                }
            }}>
                <Typography variant="h2" sx={{
                    fontSize: {
                        xs: 50
                    }
                }} >{wall.length ? "Your wallets": "You dont have any saved wallets"}</Typography> 
            </Box>
            {
                wall.map((wall) => {
                    return <WalletCard key={wall.address} chain={wall.chain || "eth"} wallet={wall}></WalletCard>
                })
            }
        </Stack>
    )
}
export default MyWallets