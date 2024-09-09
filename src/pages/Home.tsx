import { generateMnemonic } from 'bip39'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import Mnemonic from '../components/Mnemonic';




function Home() {
  const [mn, setMn] = useState<string>()
  const navigate = useNavigate()
  const getMn = () => {
    const mnemonic = generateMnemonic()
    localStorage.setItem("mnemonic", mnemonic)
    console.log("mnemonic set")
    setMn(mnemonic)
  }

  return (
      <Stack spacing={2} sx={{
        width: '100vw',
        padding:{
          xs: 3
        }
      }}
      justifyContent='center' alignItems='center'>
        <Box gap={10} justifyContent='center' alignItems='center' display='flex' flexDirection='column'>
          <Box>
           <Typography sx={{
            fontSize:{
              xs: 50
            }
           }} variant='h1'>Get your own wallet</Typography>
          </Box>
        {mn && <Mnemonic mnemonic={mn!}></Mnemonic>}
          <Box display='flex' gap={3}>
            <Button size='large' variant='contained' onClick={getMn}>Generate Secret</Button>
            {mn && <Button size='large' variant='contained' color='secondary' onClick={()=> navigate("/wallet")}>Generate Wallets</Button>}
          </Box>
        </Box>
      </Stack>
  )
}

export default Home
