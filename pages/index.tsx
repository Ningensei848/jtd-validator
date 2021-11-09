import * as React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { decompressFromEncodedURIComponent as decode } from 'lz-string'
import {
  CircularProgress,
  Typography,
  Container,
  Card,
  CardContent,
  CardHeader,
  Snackbar,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Backdrop
} from '@mui/material'
import { FileCopyOutlined as FileCopyIcon, Share as ShareIcon } from '@mui/icons-material'

import { useJTDValidation } from 'src/validation'
import Alerts from 'src/components/Alert'
// import FormConfig from 'src/components/Config'
import ShareDialog from 'src/components/ShareDialog'
import speedDialActions from 'src/action'
import { GetServerSideProps } from 'next'

const SchemaForm = dynamic(() => import('src/components/SchemaForm'), {
  ssr: false,
  // suspense: true,  // for over v18 react
  loading: ({ isLoading }) => (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={Boolean(isLoading)}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  )
})

// example of JSON Typed Definition
const exampleJTD = {
  properties: {
    id: { type: 'string' },
    createdAt: { type: 'timestamp' },
    karma: { type: 'int32' },
    isAdmin: { type: 'boolean' }
  }
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { value } = query
  if (typeof value !== 'string') {
    return {
      props: {
        defaultValue: JSON.stringify(exampleJTD, null, '  ')
      } // will be passed to the page component as props
    }
  } else {
    const decodedValue = decode(value)
    return {
      props: {
        defaultValue: decodedValue
      }
    }
  }
}

// 構成要素：FORM，[isValidSchema, message, status], footer, header
// additional: jtd-codegen via wasm
const Index: React.FC<{ defaultValue: string }> = ({ defaultValue }) => {
  // TODO: OGP ?

  const router = useRouter()
  const [value, setValue] = React.useState(defaultValue)
  const [snack, setSnack] = React.useState(false)
  const [share, setShare] = React.useState(false)
  const { isValidSchema, message, status } = useJTDValidation(value) // debouncing depend on `value`

  if (process.browser && new URLSearchParams(location.search).get('value')) {
    router.replace(router.pathname, undefined, { shallow: true })
  }

  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy', setState: setSnack },
    { icon: <ShareIcon />, name: 'Share', setState: setShare }
  ]
  return (
    <Container maxWidth='md'>
      <Card sx={{ my: 2 }} elevation={3}>
        <CardHeader
          title={
            <Typography variant='h4' align='center' component='p'>
              {isValidSchema ? '✨ Validated Successfully ✨' : '🚨 Invalid 🚨'}
            </Typography>
          }
          // action={<FormConfig />}  // Underconstruction
          sx={{ mt: 1 }}
        />
        <CardContent sx={{ mx: 2, py: 2 }}>
          <Alerts status={status} message={message} />
          <SchemaForm value={value} setValue={setValue} />
        </CardContent>
      </Card>
      <Snackbar
        open={snack}
        autoHideDuration={3000} // after duration, trigger onClose function
        onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message='Copied to the clipboad !'
      />
      <SpeedDial
        ariaLabel='SpeedDial'
        sx={{
          position: 'fixed',
          bottom: { xs: 48, sm: 64 },
          right: { xs: 32, sm: 48 }
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={async () => await speedDialActions(action.name, value, action.setState)}
          />
        ))}
      </SpeedDial>
      <ShareDialog {...{ value, share, setShare }} />
    </Container>
  )
}

export default Index
