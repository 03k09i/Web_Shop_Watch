import { GET_INVOICE_LIST, ADD_INVOICE, DELETE_INVOICE, FIX_INVOICE, GET_SHOPPING_LIST } from "../constants/invoice.constant";


const initialState = {
    invoiceList: [],
    addInvoice : {},
    fixInvoice : null,
    listShopping : []
};

export const invoiceReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_INVOICE_LIST: {
            state.invoiceList = payload
            return { ...state };
        }
        case ADD_INVOICE : {
            state.addInvoice = payload
            return { ...state };
        }
        case DELETE_INVOICE : {
            state.addInvoice = payload
            return { ...state };
        }
        case FIX_INVOICE : {
            state.fixInvoice =payload;
            return {...state}
        }
        case GET_SHOPPING_LIST : {
            state.listShopping =payload;
            return {...state}
        }
        default:
            return state;
    }
    return state;
};
