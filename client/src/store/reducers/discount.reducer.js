import { ADD_DISCOUNT } from "../constants/discount.constant";
import { DELETE_DISCOUNT } from "../constants/discount.constant";
import { FIX_DISCOUNT } from "../constants/discount.constant";


const initialState = {
    addDiscount : '',
    fixDiscount : null
};

export const discountReducer = (state = initialState, action) => {
    const { type, payload } = action;
    // eslint-disable-next-line default-case
    switch (type) {
        case ADD_DISCOUNT : {
            state.addDiscount = payload
            return { ...state };
        }
        case DELETE_DISCOUNT : {
            state.addDiscount = payload
            return { ...state };
        }
        case FIX_DISCOUNT : {
            state.fixDiscount =payload;
            return {...state}
        }
        default:
            return state;
    }
    return state;
};
