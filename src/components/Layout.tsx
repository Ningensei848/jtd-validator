import * as React from 'react'

import Box from '@mui/material/Box'

import Footer from 'src/components/Footer'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Box
        component='main'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        {children}
        <Footer />
      </Box>
    </>
  )
}

export default Layout
