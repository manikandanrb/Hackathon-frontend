import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_DETECTHANDWRITTEN,
} from '../constants';

const INITIAL_STATE = {
  user: null,
  error: null,
  handwrittenDetect: null,
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case GET_DETECTHANDWRITTEN:
      return {
        ...state,
        handwrittenDetect: action.payload,
      };

    default:
      return state
  }
};

export default homeReducer;