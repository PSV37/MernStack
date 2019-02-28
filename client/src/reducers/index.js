import { combineReducers } from "redux";
import authReducers from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from './profileReducer'
import postReducer from './postReducer'

export default combineReducers({
  auth: authReducers,
  error: errorReducer,
  profile:profileReducer,
  post : postReducer
});
