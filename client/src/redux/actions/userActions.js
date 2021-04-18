import CONSTANTS from '../constants'

export const signin = (form) => async (dispatch) => {
  dispatch({ type: CONSTANTS[`LOGIN_START`] })
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так')
    }

    localStorage.setItem('ls_token', JSON.stringify(data.token))

    dispatch({ type: CONSTANTS[`LOGIN_SUCCESS`], payload: data })
  } catch (err) {
    dispatch({ type: CONSTANTS[`LOGIN_FAILED`], payload: err.message })
    console.log(err)
    return err
  }
}

export const signup = (form) => async (dispatch) => {
  dispatch({ type: CONSTANTS[`REGIS_START`] })
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так')
    }
    dispatch({ type: CONSTANTS[`REGIS_SUCCESS`], payload: data })
  } catch (err) {
    dispatch({ type: CONSTANTS[`REGIS_FAILED`], payload: err.message })
    console.log(err)
  }
}

export const getData = (token) => async (dispatch) => {
  dispatch({ type: CONSTANTS[`ME_START`] })
  try {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token} `,
        // 'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так')
    }
    localStorage.setItem('ls_token', JSON.stringify(data.token))

    dispatch({ type: CONSTANTS[`ME_SUCCESS`], payload: data })
  } catch (err) {
    localStorage.removeItem('ls_token')
    dispatch({ type: CONSTANTS[`ME_FAILED`], payload: err.message })
    console.log(err)
  }
}
