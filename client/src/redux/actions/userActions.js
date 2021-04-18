import CONSTANTS from '../constants'
import request from '../../api/request'

export const signin = (form) => async (dispatch) => {
  dispatch({ type: CONSTANTS[`LOGIN_START`] })
  const data = await request('/api/auth/signin', { method: 'POST', body: form })
  if (data.errMessage) {
    dispatch({ type: CONSTANTS[`LOGIN_FAILED`], payload: data.errMessage })
    return data
  }
  localStorage.setItem('ls_token', JSON.stringify(data.token))
  dispatch({ type: CONSTANTS[`LOGIN_SUCCESS`], payload: data.user })
  return data
}

export const signup = (form) => async (dispatch) => {
  dispatch({ type: CONSTANTS[`REGIS_START`] })
  const data = await request('/api/auth/signup', { method: 'POST', body: form })
  if (data.errMessage) {
    dispatch({ type: CONSTANTS[`REGIS_FAILED`], payload: data.errMessage })
    return data
  }
  dispatch({ type: CONSTANTS[`REGIS_SUCCESS`], payload: data })
  return data
}

export const getData = (token) => async (dispatch) => {
  dispatch({ type: CONSTANTS[`ME_START`] })
  const data = await request('/api/auth/me', { method: 'GET' }, true)
  localStorage.setItem('ls_token', JSON.stringify(data.token))

  if (data.errMessage) {
    localStorage.removeItem('ls_token')
    dispatch({ type: CONSTANTS[`ME_FAILED`], payload: data.errMessage })
    return
  }
  dispatch({ type: CONSTANTS[`ME_SUCCESS`], payload: data.user })
  return data
}
