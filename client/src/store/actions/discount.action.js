import callApi from "../../utils/callApi";
import { FIX_DISCOUNT} from "../constants/discount.constant";
import { ADD_DISCOUNT } from "../constants/discount.constant";
import { DELETE_DISCOUNT } from "../constants/discount.constant";


export const postDiscountListAction = (newWatch) => {
  return async (dispatch) => {
    try {
      const res = await callApi("discountRouter/", "POST", newWatch)
      dispatch({
        type: ADD_DISCOUNT,
        payload: newWatch,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteDiscountListAction = (idWatch) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`discountRouter/${idWatch}`, "DELETE")
      dispatch({
        type: DELETE_DISCOUNT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fixDiscount = (idWatch, discount) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`discountRouter/${idWatch}`, "PUT", {discount:discount})
      dispatch({
        type: FIX_DISCOUNT,
        payload: discount,
      });
    } catch (error) {
      console.log(error);
    }
  };
};