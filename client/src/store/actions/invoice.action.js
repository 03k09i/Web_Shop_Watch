import callApi from "../../utils/callApi";
import { FIX_INVOICE, GET_INVOICE_LIST, ADD_INVOICE, DELETE_INVOICE, GET_SHOPPING_LIST} from "../constants/invoice.constant";

export const postInvoiceListAction = (idUser) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`Invoice/${idUser}`, "POST")
      dispatch({
        type: ADD_INVOICE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getInvoiceListAction = (idUser) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`Invoice/${idUser}`, "GET")
      dispatch({
        type: GET_INVOICE_LIST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getInvoiceOneListAction = (idUser) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`Invoice/one/${idUser}`, "GET")
      dispatch({
        type: GET_SHOPPING_LIST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteInvoiceListAction = (idUser, idWatch) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`Invoice/${idUser}/${idWatch}`, "DELETE")
      dispatch({
        type: DELETE_INVOICE,
        payload: idWatch,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fixInvoice = (data) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`Invoice/`, "PUT", data)
      dispatch({
        type: FIX_INVOICE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
