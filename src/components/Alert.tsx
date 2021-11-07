import * as React from 'react'

import { Alert, AlertTitle, AlertColor, Box, Collapse, IconButton } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

const TransitionAlerts: React.FC<{ status: string; message: string }> = ({ status, message }) => {
  const [open, setOpen] = React.useState(false) // default close
  const [severity, setSeverity] = React.useState<AlertColor>('success')

  if (severity != 'error' && status == 'ERROR') {
    setSeverity('error')
    setOpen(true)
  } else if (severity != 'success' && status == 'OK') {
    setSeverity('success')
    setOpen(true)
  } else if (severity != 'warning' && status == 'WARNING') {
    setSeverity('warning')
    setOpen(true)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='large'
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>{status}</AlertTitle>
          {message}
        </Alert>
      </Collapse>
    </Box>
  )
}

export default TransitionAlerts
