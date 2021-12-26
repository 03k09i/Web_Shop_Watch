import callApi from "../../utils/callApi";
import { FIX_WATCH, GET_WATCH_ITEM, GET_WATCH_LIST } from "../constants/watch.constant";
import { ADD_WATCH } from "../constants/watch.constant";
import { DELETE_WATCH } from "../constants/watch.constant";


export const postWatchListAction = (newWatch) => {
  return async (dispatch) => {
    try {
      const res = await callApi("admin/watch/", "POST", newWatch)
      dispatch({
        type: ADD_WATCH,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getWatchListAction = () => {
  return async (dispatch) => {
    try {
      const res = await callApi("admin/watch/", "GET")
      dispatch({
        type: GET_WATCH_LIST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteWatchListAction = (idWatch) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`admin/watch/${idWatch}`, "DELETE")
      dispatch({
        type: DELETE_WATCH,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fixWatch = (idWatch, data) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`admin/watch/${idWatch}`, "PUT", data)
      dispatch({
        type: FIX_WATCH,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getWatchItemAction = (idWatch) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`admin/watch/${idWatch}`, "GET")
      const data = res.data[0]
      dispatch({
        type: GET_WATCH_ITEM,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};