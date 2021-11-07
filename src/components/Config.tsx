import * as React from 'react'
import { Button, IconButton, Menu, MenuItem } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { MoreVert as MoreVertIcon } from '@mui/icons-material'

const ConfigDialog: React.FC<{
  select: string
  setSelect: React.Dispatch<React.SetStateAction<string>>
}> = ({ select, setSelect }) => {
  const handleClose = () => {
    setSelect('')
  }

  return (
    <Dialog open={select.length ? true : false} onClose={handleClose}>
      <DialogTitle>Underconstruction</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
const Config: React.FC = () => {
  const [select, setSelect] = React.useState('')

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-label='form configuration'
        size='large'
        sx={{ mr: 1 }}
        id='config-menu-button'
        aria-controls='config-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon fontSize='inherit' />
      </IconButton>

      <Menu
        id='config-menu'
        aria-labelledby='config-menu-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose()
            setSelect('prettier')
          }}
        >
          Prettier Config
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            setSelect('editor')
          }}
        >
          Editor Config
        </MenuItem>
      </Menu>

      <ConfigDialog {...{ select, setSelect }} />
    </>
  )
}

export default Config
