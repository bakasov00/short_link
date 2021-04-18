import React from 'react'

import { Grid } from '@material-ui/core'
import { generateNoAuthLink } from '../redux/actions/linkActions'
import { useDispatch, useSelector } from 'react-redux'
import { SimpleCard, LinkInput } from '../components'
import CONSTANTS from '../redux/constants'

function MainPage() {
  const { error, linkNoAuth } = useSelector(({ linkReducer }) => linkReducer)
  const dispatch = useDispatch()

  // const [input, setInput] = React.useState('')
  // const handleChange = (event) => {
  //   setInput(event.target.value)
  // }

  const onSubmit = ({ link }) => {
    dispatch({ type: CONSTANTS.CLEAR_ERROR })
    dispatch(generateNoAuthLink(link))
    // .then((data) => {
    //   if (data) {
    //     setInput('')
    //   }
    // })
  }

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: CONSTANTS.CLEAR_ERROR })
      }, 4000)
    }
  }, [dispatch, error])

  return (
    <Grid>
      <LinkInput onSubmit={onSubmit} />
      <br />
      <br />
      {linkNoAuth && linkNoAuth.map((link) => <SimpleCard link={link} />)}
    </Grid>
  )
}

export default MainPage
