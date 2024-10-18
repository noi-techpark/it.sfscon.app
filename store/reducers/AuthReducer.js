import { AUTHORIZE_USER } from "../constants/AuthConstants";

const initialState = {
  token: null,
  authorizationError: null,
  user: {},
};

export default AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZE_USER:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};
