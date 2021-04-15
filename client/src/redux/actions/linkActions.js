import CONSTANTS from '../constants'

export const generateLink = (link) => async (dispatch) => {
  dispatch({ type: CONSTANTS.LINK_GENERATE_START })
  try {
    const { token } = JSON.parse(localStorage.getItem('userData'))
    const response = await fetch('/api/link/generate', {
      method: 'POST',
      body: JSON.stringify({ from: link }),
      headers: {
        Authorization: `Bearer ${token} `,
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так')
    }
    dispatch({ type: CONSTANTS.LINK_GENERATE_SUCCESS, payload: data })
    return data
  } catch (err) {
    dispatch({ type: CONSTANTS.LINK_GENERATE_FAILED, payload: err.message })
    console.log(err)
  }
}
// ! ==============================
export const generateNoAuthLink = (link) => async (dispatch) => {
  dispatch({ type: CONSTANTS.LINK_GENERATE_NO_START })
  try {
    const response = await fetch('/api/link/noauth/generate', {
      method: 'POST',
      body: JSON.stringify({ from: link }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так')
    }
    dispatch({ type: CONSTANTS.LINK_GENERATE_NO_SUCCESS, payload: data })
    return data
  } catch (err) {
    dispatch({ type: CONSTANTS.LINK_GENERATE_NO_FAILED, payload: err.message })
    console.log(err)
  }
}
// ! ==============================
export const getAllLinks = () => async (dispatch) => {
  dispatch({ type: CONSTANTS.LINK_GET_ALL_START })
  try {
    const { token } = JSON.parse(localStorage.getItem('userData'))
    const response = await fetch('/api/link/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token} `,
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так')
    }
    dispatch({ type: CONSTANTS.LINK_GET_ALL_SUCCESS, payload: data })
  } catch (err) {
    dispatch({ type: CONSTANTS.LINK_GET_ALL_FAILED, payload: err.message })
    console.log(err)
  }
}

export const getOneLink = (linkId) => async (dispatch) => {
  dispatch({ type: CONSTANTS.LINK_GET_ONE_START })
  try {
    const { token } = JSON.parse(localStorage.getItem('userData'))

    const response = await fetch(`/api/link/${linkId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token} `,
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так')
    }
    console.log(data)
    dispatch({ type: CONSTANTS.LINK_GET_ONE_SUCCESS, payload: data })
  } catch (err) {
    dispatch({ type: CONSTANTS.LINK_GET_ONE_FAILED, payload: err.message })
    console.log(err)
  }
}

export const deleteLink = (linkId) => async (dispatch) => {
  dispatch({ type: CONSTANTS.LINK_DELETE_START })
  try {
    const { token } = JSON.parse(localStorage.getItem('userData'))

    const response = await fetch(`/api/link/delete/${linkId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token} `,
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так')
    }
    dispatch({ type: CONSTANTS.LINK_DELETE_SUCCESS, payload: linkId })
    return data
  } catch (err) {
    dispatch({ type: CONSTANTS.LINK_DELETE_FAILED, payload: err.message })
    console.log(err)
  }
}
