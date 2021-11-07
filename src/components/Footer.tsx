import * as React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from 'src/Link'
import Stack from '@mui/material/Stack'
import GitHubIcon from '@mui/icons-material/GitHub'
import JTDIcon from 'src/components/JTDIcon'
import { Grid, IconButton, Tooltip } from '@mui/material'

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary'>
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/jsontypedef'>
        JSON Type Definition Contributors
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const StickyFooter = () => {
  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]
      }}
    >
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item xs={12} sm={11}>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Tooltip title='JSON Typedef'>
                <IconButton href='https://github.com/jsontypedef' target='_blank' rel='noreferrer'>
                  <JTDIcon color='action' sx={{ fontSize: 40 }} />
                </IconButton>
              </Tooltip>

              <Stack direction='column'>
                <Typography variant='h6'>{'JSON Typed Definition Validator'}</Typography>
                <Copyright />
              </Stack>
            </Stack>
          </Grid>
          <Grid item sm={1}>
            <Tooltip title='Go to repository'>
              <IconButton
                href='https://github.com/Ningensei848/jtd-validator'
                target='_blank'
                rel='noreferrer'
              >
                <GitHubIcon color='action' sx={{ fontSize: 40 }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default StickyFooter
