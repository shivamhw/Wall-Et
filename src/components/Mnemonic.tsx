import { experimentalStyled as styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.h6,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Mnemonic({ mnemonic }: {mnemonic: string}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {mnemonic.split(" ").map((val, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>{val}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
