import { AUTHORIZE_USER } from "../constants/AuthConstants";

const initialState = {
  token: null,
  authorizationFinished: false,
  authorizationError: null,
  user: {},
};

export default AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZE_USER:
      return {
        ...state,
        authorizationFinished: true,
      };
    default:
      return state;
  }
};
