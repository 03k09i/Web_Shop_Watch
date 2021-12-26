import callApi from "../../utils/callApi";
import { FIX_CART, GET_CART_LIST, ADD_CART, DELETE_CART} from "../constants/cart.constant";

export const postCartListAction = (newCart) => {
  return async (dispatch) => {
    try {
      const res = await callApi("Cart/", "POST", newCart)
      dispatch({
        type: ADD_CART,
        payload: newCart,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCartListAction = (idUser) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`Cart/${idUser}`, "GET")
      dispatch({
        type: GET_CART_LIST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCartListAction = (idUser, idWatch) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`Cart/${idUser}/${idWatch}`, "DELETE")
      dispatch({
        type: DELETE_CART,
        payload: idWatch,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fixCart = (data) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`Cart/`, "PUT", data)
      dispatch({
        type: FIX_CART,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
