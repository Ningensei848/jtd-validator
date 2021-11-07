import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#059669'
    },
    secondary: {
      main: 'rgba(236, 253, 245, 1)'
    },
    error: {
      main: red.A400
    }
  }
})

export default theme
