import { combineReducers } from "redux";
import {
  CHANGE_CATEGORY,
  FETCH_SUBJECTS,
  FETCH_VARIABLES,
  SELECT_VARIABLE,
  UNSELECT_VARIABLE,
  SELECT_YEAR,
  UNSELECT_YEAR,
  FETCH_DATA,
  CLEANUP,
} from "../actions/types.js";

const bdlReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return { ...state, categorySelected: action.payload };
    case FETCH_SUBJECTS:
      return { ...state, subjects: action.payload };
    case FETCH_VARIABLES:
      return { ...state, variables: action.payload };
    case SELECT_VARIABLE:
      return { ...state, variableSelected: action.payload };
    case UNSELECT_VARIABLE:
      return { ...state, variableSelected: undefined };
    case SELECT_YEAR:
      return { ...state, yearSelected: action.payload };
    case UNSELECT_YEAR:
      return { ...state, yearSelected: undefined };
    case FETCH_DATA:
      return { ...state, data: action.payload };
    case CLEANUP:
      let { categorySelected } = state;
      return { categorySelected: categorySelected };
    default:
      return state;
  }
};

export default combineReducers({
  bdl: bdlReducer,
});
