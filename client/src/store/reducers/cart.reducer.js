import { GET_CART_LIST, ADD_CART, DELETE_CART, FIX_CART } from "../constants/cart.constant";


const initialState = {
    cartList: [],
    addCart : {},
    fixCart : null,
};

export const cartReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CART_LIST: {
            state.cartList = payload
            return { ...state };
        }
        case ADD_CART : {
            state.addCart = payload
            return { ...state };
        }
        case DELETE_CART : {
            state.addCart = payload
            return { ...state };
        }
        case FIX_CART : {
            state.fixCart =payload;
            return {...state}
        }
        default:
            return state;
    }
    return state;
};
