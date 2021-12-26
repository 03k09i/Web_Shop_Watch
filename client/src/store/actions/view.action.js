import callApi from "../../utils/callApi";
import { STATISTICS, INVENTORY, TOP10WATCH, TOP10USER } from "../constants/view.constant";

export const GetStatistics = () => {
  return async (dispatch) => {
    try {
      const res = await callApi("detail/statistics/", "GET")
      dispatch({
        type: STATISTICS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetInventory = () => {
  return async (dispatch) => {
    try {
      const res = await callApi("detail/inventory", "GET")
      dispatch({
        type: INVENTORY,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetTop10watch = () => {
  return async (dispatch) => {
    try {
      const res = await callApi("detail/top10watch/", "GET")
      dispatch({
        type: TOP10WATCH,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetTop10user = () => {
  return async (dispatch) => {
    try {
      const res = await callApi("detail/top10user/", "GET")
      dispatch({
        type: TOP10USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
