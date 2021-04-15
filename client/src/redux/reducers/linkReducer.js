import CONSTANTS from '../constants'
const initialState = {
  loading: false,
  error: null,
  allLinks: [],
  linkNoAuth: [],
  link: {},
}

const linkReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.LINK_GENERATE_START:
      return {
        ...state,
        loading: true,
      }
    case CONSTANTS.LINK_GENERATE_SUCCESS: {
      // const newArr = [action.payload, ...state.links]

      // if (newArr.length - 1 === 2) {
      //   newArr.pop()
      // }

      return {
        ...state,
        loading: false,
        // links: newArr,
        link: action.payload,
      }
    }
    case CONSTANTS.LINK_GENERATE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CONSTANTS.LINK_GET_ALL_START:
      return {
        ...state,
        loading: true,
      }
    case CONSTANTS.LINK_GET_ALL_SUCCESS: {
      return {
        ...state,
        loading: false,
        allLinks: action.payload.reverse(),
      }
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
    case CONSTANTS.LINK_DELETE_START:
      return {
        ...state,
        // loading: true,
      }
    case CONSTANTS.LINK_DELETE_SUCCESS: {
      const newArr = state.allLinks.filter((item) => item._id !== action.payload)
      return {
        ...state,
        // loading: false,
        allLinks: newArr,
        link: [],
      }
    }
    case CONSTANTS.LINK_DELETE_FAILED:
      return {
        ...state,
        // loading: false,
      }
    case CONSTANTS.LINK_GENERATE_NO_START:
      return {
        ...state,
        loading: true,
      }
    case CONSTANTS.LINK_GENERATE_NO_SUCCESS: {
      const newArr = [action.payload, ...state.linkNoAuth]
      if (newArr.length - 1 === 3) {
        newArr.pop()
      }
      return {
        ...state,
        loading: false,
        linkNoAuth: newArr,
      }
    }
    case CONSTANTS.LINK_GENERATE_NO_FAILED:
      return {
        ...state,
        loading: false,
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

export default linkReducer
