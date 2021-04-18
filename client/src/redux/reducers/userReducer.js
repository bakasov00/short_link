import CONSTANTS from '../constants'

const initalState = {
  userData: {},
  isAuth: false,
  loading: false,
  error: null,
}

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case CONSTANTS.LOGIN_START:
      return { ...state, loading: true }
    case CONSTANTS.LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        userData: action.payload,
      }
    case CONSTANTS.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CONSTANTS.REGIS_START:
      return { ...state, loading: true }
    case CONSTANTS.REGIS_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
      }
    case CONSTANTS.REGIS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CONSTANTS.LOGOUT:
      return {
        ...state,
        isAuth: false,
        userData: {},
        error: null,
      }
    case CONSTANTS.ME_START:
      return {
        ...state,
        loading: true,
      }
    case CONSTANTS.ME_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        userData: action.payload,
      }
    case CONSTANTS.ME_FAILED:
      return {
        ...state,
        loading: false,
        isAuth: false,
      }
    case CONSTANTS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export default userReducer
