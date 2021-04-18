import CONSTANTS from '../constants'
import request from '../../api/request'

export const generateLink = (link) => async (dispatch) => {
  dispatch({ type: CONSTANTS.LINK_GENERATE_START })
  const data = await request('/api/link/generate', { method: 'POST', body: { from: link } }, true)
  if (data.errMessage) {
    dispatch({ type: CONSTANTS.LINK_GENERATE_FAILED, payload: data.errMessage })
    return data
  }
  dispatch({ type: CONSTANTS.LINK_GENERATE_SUCCESS, payload: data })
  return data
}

// ! ==============================
export const generateNoAuthLink = (link) => async (dispatch) => {
  dispatch({ type: CONSTANTS.LINK_GENERATE_NO_START })
  const data = await request('/api/link/noauth/generate', { method: 'POST', body: { from: link } })

  if (data.errMessage) {
    dispatch({ type: CONSTANTS.LINK_GENERATE_NO_FAILED, payload: data.errMessage })
    return
  }
  dispatch({ type: CONSTANTS.LINK_GENERATE_NO_SUCCESS, payload: data })
  return data
}
// ! ==============================
export const getAllLinks = () => async (dispatch) => {
  dispatch({ type: CONSTANTS.LINK_GET_ALL_START })
  const data = await request('/api/link/', { method: 'GET' }, true)

  if (data.errMessage) {
    dispatch({ type: CONSTANTS.LINK_GET_ALL_FAILED, payload: data.errMessage })
    return
  }

  dispatch({ type: CONSTANTS.LINK_GET_ALL_SUCCESS, payload: data })
  return data
}

export const getOneLink = (linkId) => async (dispatch) => {
  dispatch({ type: CONSTANTS.LINK_GET_ONE_START })

  const data = await request(`/api/link/${linkId}`, { method: 'GET' }, true)
  if (data.errMessage) {
    dispatch({ type: CONSTANTS.LINK_GET_ONE_FAILED, payload: data.errMessage })
    return
  }
  dispatch({ type: CONSTANTS.LINK_GET_ONE_SUCCESS, payload: data })
  return data
}

export const deleteLink = (linkId) => async (dispatch) => {
  dispatch({ type: CONSTANTS.LINK_DELETE_START })

  const data = await request(`/api/link/delete/${linkId}`, { method: 'DELETE' }, true)

  if (data.errMessage) {
    dispatch({ type: CONSTANTS.LINK_DELETE_FAILED, payload: data.errMessage })
    return
  }

  dispatch({ type: CONSTANTS.LINK_DELETE_SUCCESS, payload: linkId })
  return data
}
