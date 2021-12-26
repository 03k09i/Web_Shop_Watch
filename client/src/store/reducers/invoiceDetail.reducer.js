import { GET_INVOICEDETAIL_LIST, ADD_INVOICEDETAIL, DELETE_INVOICEDETAIL, FIX_INVOICEDETAIL } from "../constants/invoiceDetail.constant";


const initialState = {
    invoiceDetailList: [],
    addInvoiceDetail : {},
    fixInvoiceDetail : null,
};

export const invoiceDetailReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_INVOICEDETAIL_LIST: {
            state.invoiceDetailList = payload
            return { ...state };
        }
        case ADD_INVOICEDETAIL : {
            state.addInvoiceDetail = payload
            return { ...state };
        }
        case DELETE_INVOICEDETAIL : {
            state.addInvoiceDetail = payload
            return { ...state };
        }
        case FIX_INVOICEDETAIL : {
            state.fixInvoiceDetail =payload;
            return {...state}
        }
        default:
            return state;
    }
    return state;
};
