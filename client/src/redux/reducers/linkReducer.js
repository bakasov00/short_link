import CONSTANTS from '../constants'
const initialState = {
  loading: false,
  links: [],
  link: null,
}

const linkReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.LINK_GENERATE_START:
      return {
        ...state,
        loading: true,
      }
    case CONSTANTS.LINK_GENERATE_SUCCESS:
      return {
        ...state,
        loading: false,
        link: action.payload,
      }
    case CONSTANTS.LINK_GENERATE_FAILED:
      return {
        ...state,
        loading: false,
      }
    case CONSTANTS.LINK_GET_ALL_START:
      return {
        ...state,
        loading: true,
      }
    case CONSTANTS.LINK_GET_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        links: action.payload,
      }

    case CONSTANTS.LINK_GET_ALL_FAILED:
      return {
        ...state,
        loading: false,
      }
    case CONSTANTS.LINK_GET_ONE_START:
      return {
        ...state,
        loading: true,
      }
    case CONSTANTS.LINK_GET_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        link: action.payload,
      }

    case CONSTANTS.LINK_GET_ONE_FAILED:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default linkReducer
