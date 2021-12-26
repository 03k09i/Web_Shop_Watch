import { GET_USER_ITEM, GET_USER_LIST, ADD_USER, DELETE_USER, FIX_USER, CHECK_USER, GET_INFO_USER} from "../constants/user.constant";


const initialState = {
    userList: [],
    addUser : {},
    fixUser : null,
    userItem : {},
    checkUser : '',
    infoUser : null
};

export const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    // eslint-disable-next-line default-case
    switch (type) {
        case GET_USER_LIST: {
            state.userList = payload
            return { ...state };
        }
        case ADD_USER : {
            if(payload[1].email || payload[1].phoneNumber || payload[1].userName)
            {
                state.addUser = payload[1]
            }
            else 
            {
                state.addUser = payload[0]
            }
            return { ...state };
        }
        case CHECK_USER : {
            state.checkUser = payload
            return { ...state };
        }
        case DELETE_USER : {
            state.addUser = payload
            return { ...state };
        }
        case FIX_USER : {
            state.fixUser =payload;
            return {...state}
        }
        case GET_USER_ITEM : {
            state.userItem = payload
            return {...state}
        }
        case GET_INFO_USER : {
            state.infoUser = payload
            return {...state}
        }
        default:
            return state;
    }
    return state;
};
