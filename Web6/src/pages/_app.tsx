import '@/styles/globals.css'
import {CssBaseline, PaletteColorOptions, ThemeProvider} from '@mui/material'
import type { AppProps } from 'next/app'
import {createTheme} from "@mui/material/styles";

export default function App({ Component, pageProps }: AppProps) {
  return  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Component {...pageProps} />
  </ThemeProvider>
}

const theme = createTheme();
