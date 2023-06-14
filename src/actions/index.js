import axios from "axios";
import bdl from "../apis/bdl";
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
} from "./types";

export const changeCategory = (id) => {
  return {
    type: CHANGE_CATEGORY,
    payload: id,
  };
};

export const fetchSubjectsList = (id) => async (dispatch) => {
  const response = await bdl.get(`/subjects?parent-id=${id}`, {
    params: { format: "jsonapi" },
  });
  dispatch({ type: FETCH_SUBJECTS, payload: response.data });
};

export const fetchVariablesList =
  (id = "") =>
  async (dispatch) => {
    const response = await bdl.get(`/variables?subject-id=${id}`, {
      params: { format: "jsonapi" },
    });
    dispatch({ type: FETCH_VARIABLES, payload: response.data.data });
  };

export const selectVariable =
  (id = "") =>
  async (dispatch) => {
    const response = await bdl.get(`/variables/${id}`, {
      params: { format: "jsonapi" },
    });
    dispatch({
      type: SELECT_VARIABLE,
      payload: response.data.data,
    });
  };
export const unselectVariable = () => {
  return {
    type: UNSELECT_VARIABLE,
  };
};
export const selectYear = (year = "") => {
  return {
    type: SELECT_YEAR,
    payload: year,
  };
};
export const unselectYear = () => {
  return {
    type: UNSELECT_YEAR,
  };
};

export const fetchData =
  (id = "", year = "") =>
  async (dispatch) => {
    const response = await axios.get(
      `https://bdl.stat.gov.pl/api/v1/data/by-variable/${id}`,
      {
        params: {
          format: "jsonapi",
          year: year,
          "unit-level": "2",
          "page-size": "20",
        },
      }
    );
    dispatch({ type: FETCH_DATA, payload: response.data });
  };

export const cleanup = () => {
  return {
    type: CLEANUP,
  };
};
