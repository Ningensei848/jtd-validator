const speedDialActions = async (
  name: string,
  value: string,
  setState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (name == 'Copy') {
    try {
      await navigator.clipboard.writeText(value)
      setState(true)
    } catch (error) {
      if (error instanceof Error) console.error((error && error.message) || 'copy failed ...')
    }
  } else if (name == 'Share') {
    setState(true) //setShareDialog(true)
    return
  }
}

export default speedDialActions
