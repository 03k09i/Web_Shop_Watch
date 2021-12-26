import { STATISTICS, INVENTORY, TOP10WATCH, TOP10USER } from "../constants/view.constant";


const initialState = {
    statistics : [],
    inventory : [],
    top10watch : [],
    top10user : []
};

export const viewReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case STATISTICS: {
            state.statistics = payload
            return { ...state };
        }
        case INVENTORY : {
            state.inventory = payload
            return { ...state };
        }
        case TOP10WATCH : {
            state.top10watch = payload
            return { ...state };
        }
        case TOP10USER : {
            state.top10user = payload;
            return {...state}
        }
        default:
            return state;
    }
    return state;
};
