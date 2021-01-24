import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({colors: {
  darker: "rgb(35, 39, 42)",
  dark: "rgb(44, 47, 51)",
  light: "rgb(255, 255, 255)",
  accent: {
    500: "#FD0061"
  },
  discord: "#7289da",
  textarea: "#36393F"
}})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
