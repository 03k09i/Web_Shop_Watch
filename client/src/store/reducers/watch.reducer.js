import { GET_WATCH_ITEM, GET_WATCH_LIST } from "../constants/watch.constant";
import { ADD_WATCH } from "../constants/watch.constant";
import { DELETE_WATCH } from "../constants/watch.constant";
import { FIX_WATCH } from "../constants/watch.constant";


const initialState = {
    watchList: [],
    addWatch : '',
    fixWatch : null,
    watchItem : {}
};

export const watchReducer = (state = initialState, action) => {
    const { type, payload } = action;
    // eslint-disable-next-line default-case
    switch (type) {
        case GET_WATCH_LIST: {
            state.watchList = payload
            return { ...state };
        }
        case ADD_WATCH : {
            state.addWatch = payload
            return { ...state };
        }
        case DELETE_WATCH : {
            state.addWatch = payload
            return { ...state };
        }
        case FIX_WATCH : {
            state.fixWatch =payload;
            return {...state}
        }
        case GET_WATCH_ITEM : {
            state.watchItem = payload
            return {...state}
        }
        default:
            return state;
    }
    return state;
};
