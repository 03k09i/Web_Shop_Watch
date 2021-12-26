import callApi from "../../utils/callApi";
import { FIX_INVOICEDETAIL, GET_INVOICEDETAIL_LIST, ADD_INVOICEDETAIL, DELETE_INVOICEDETAIL} from "../constants/invoiceDetail.constant";

export const postInvoiceDetailListAction = (newInvoice) => {
  return async (dispatch) => {
    try {
      const res = await callApi("InvoiceDetail/", "POST", newInvoice)
      dispatch({
        type: ADD_INVOICEDETAIL,
        payload: newInvoice,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getInvoiceDetailListAction = (idUser) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`InvoiceDetail/${idUser}`, "GET")
      dispatch({
        type: GET_INVOICEDETAIL_LIST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteInvoiceDetailListAction = (idUser, idWatch) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`InvoiceDetail/${idUser}/${idWatch}`, "DELETE")
      dispatch({
        type: DELETE_INVOICEDETAIL,
        payload: idWatch,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fixInvoiceDetail = (data) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`InvoiceDetail/`, "PUT", data)
      dispatch({
        type: FIX_INVOICEDETAIL,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
