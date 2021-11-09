import * as React from 'react'
import { compressToEncodedURIComponent as encode } from 'lz-string'

import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'

import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CopyIcon from '@mui/icons-material/ContentCopyOutlined'
import CloseIcon from '@mui/icons-material/Close'
import CopySuccessIcon from '@mui/icons-material/LibraryAddCheck'

import copyAction from 'src/action'
import ShareButtons from 'src/components/ShareButton'
import { event as gtagEvent } from 'src/google'

const delay = 1000
const ShareDialog: React.FC<{
  value: string
  share: boolean
  setShare: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ value, share, setShare }) => {
  const [url, setUrl] = React.useState('')
  const [copy, setCopy] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const encodedUrl = location
        ? `${location.protocol}//${location.hostname}${location.pathname}` +
          `?value=${encode(value)}`
        : ''
      setUrl(encodedUrl)
    }, delay)
    // reset timer
    return () => {
      clearTimeout(timer)
    }
  }, [value])

  const handleClose = () => {
    setShare(false)
    setCopy(false)
  }

  // TODO: install widgets e.g. twitter, facebook, github
  return (
    <Dialog
      open={share}
      fullWidth
      maxWidth='sm'
      onClose={handleClose}
      aria-labelledby='share-dialog-title'
      aria-describedby='share-dialog-description'
    >
      <DialogTitle id='share-dialog-title'>
        {'Thanks for your sharing !'}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack direction='row' spacing={2}>
          <TextField
            fullWidth
            size='small'
            margin='normal'
            value={url}
            onFocus={(event) => event.target.select()}
          />
          <Tooltip title={copy ? 'Copied !' : 'Copy'}>
            <IconButton
              onClick={async () => {
                await copyAction('Copy', url, setCopy)
                gtagEvent({
                  action: 'Copy',
                  category: 'Dialog',
                  value: value
                })
              }}
            >
              {copy ? <CopySuccessIcon /> : <CopyIcon />}
            </IconButton>
          </Tooltip>
        </Stack>

        <DialogContentText id='share-dialog-buttons'>
          <ShareButtons url={url} />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
export default ShareDialog
