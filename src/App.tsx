import { defaultTheme } from './styles/themes/default'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './globalStyle'
import { ThemeProvider } from 'styled-components'
import { Router } from './router'
import {  CyclesContextProvider } from './context/ClyclesContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
      <CyclesContextProvider>
        <Router />
      </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
