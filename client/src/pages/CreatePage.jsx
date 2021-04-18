import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import CONSTANTS from '../redux/constants'
import { LinkInput, Loader, SimpleCard } from '../components'
import Toast, { useToast } from '../components/Toast/Toast'

import { generateLink } from '../redux/actions/linkActions'

function CreatePage() {
  const { loading, error, linkOne } = useSelector(({ linkReducer }) => linkReducer)

  const dispatch = useDispatch()
  const [visible, setVisible] = React.useState(false)
  // const [linkValue, setLinkValue] = useState(' ')
  // const handleChange = (event) => {
  //   setLinkValue(event.target.value)
  // }
  const { toastShow, toastRemove, toasts } = useToast()

  const onSubmit = ({ link }) => {
    dispatch({ type: CONSTANTS.CLEAR_ERROR })
    dispatch(generateLink(link.split(' ').join(''))).then((data) => {
      if (data.errMessage) {
        toastShow({ message: `${data.errMessage}`, flag: 'error' })
        setVisible(false)
      } else {
        setVisible(true)
      }
    })
  }

  return (
    <>
      <Toast toastRemove={toastRemove} toasts={toasts} />
      <LinkInput onSubmit={onSubmit} />
      <br />
      <br />
      {loading ? <Loader /> : visible && <SimpleCard link={linkOne} />}
      <br />
      <Link to='/app/links' style={{ fontSize: 24, fontWeight: 500, textAlign: 'center' }}>
        Все ссылки
      </Link>
    </>
  )
}

export default CreatePage
