import React from 'react'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import IconButton from '@material-ui/core/IconButton'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
// import { Alert } from '../components'

function CopyClipboard({ link }) {
  const [copyValue, setCopyValue] = React.useState({ value: '', copied: false })

  function copyHandler() {
    setCopyValue({ copied: true })
    setTimeout(() => {
      setCopyValue({ copied: false })
    }, 1200)
  }

  React.useEffect(() => {
    setCopyValue({ value: link, copied: false })
  }, [link])

  return (
    <>
      {/* {copyValue.copied ? <Alert text='Ссылка скопирована' success /> : ''} */}
      <CopyToClipboard text={copyValue.value} onCopy={copyHandler}>
        <IconButton color={'primary'}>
          {!copyValue.copied ? <FileCopyIcon /> : <LibraryAddCheckIcon />}
        </IconButton>
      </CopyToClipboard>
    </>
  )
}

export default CopyClipboard
