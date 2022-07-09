import { useContext } from 'react';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from 'src/context/context';

function Layout({ children }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        minHeight: '100vh',
        flexDirection: 'column',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 3,
      }}
    >
      <IconButton sx={{ ml: 'auto' }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      {children}
    </Box>
  );
}

export default Layout;
