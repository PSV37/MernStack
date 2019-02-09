import { SET_USER_TOKEN } from "../actions/types";
import isEmpty from "../validation/is-empty";
const initState = {
  isAuth: false,
  user: {}
};

export default function(state = initState, action) {
  switch (action.type) {
    case SET_USER_TOKEN:
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        user: action.payload
      };

    default:
      return state;
  }
}
