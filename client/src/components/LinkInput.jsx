import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Alert } from '../components'
import { TextField, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'

function LinkInput({ onSubmit }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const { loading, error } = useSelector(({ linkReducer }) => linkReducer)

  // const onSubmit = ({ link }) => {
  //   dispatch({ type: CONSTANTS.CLEAR_ERROR })
  //   dispatch(generateNoAuthLink(link))
  //   // .then((data) => {
  //   //   if (data) {
  //   //     setInput('')
  //   //   }
  //   // })
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* {error ? <Alert text={error} /> : ''} */}

      <br />

      <Controller
        name='link'
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Это поле не может быть пустым',
          },
          pattern: {
            value: /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi,
            message: 'Введите валидную ссылку',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            // onClick={() => console.log(field)}
            // onChange={handleChange}
            // value={linkValue}
            fullWidth
            helperText={errors.link ? errors.link.message : null}
            variant='outlined'
            label='Введите ссылку'
            error={!!errors.link}
          />
        )}
      />
      <br />
      <br />
      <Button disabled={loading} variant='outlined' color='primary' type='submit'>
        Сократить
      </Button>
    </form>
  )
}

export default LinkInput
