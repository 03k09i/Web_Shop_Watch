import callApi from "../../utils/callApi";
import { FIX_USER, GET_USER_ITEM, GET_USER_LIST, CHECK_USER, ADD_USER, DELETE_USER, GET_INFO_USER} from "../constants/user.constant";

export const postUserListAction = (newUser) => {
  return async (dispatch) => {
    try {
      const res = await callApi("root/user/", "POST", newUser)
      dispatch({
        type: ADD_USER,
        payload: [newUser, res.data],
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const checkSignInUser = (User) => {
  return async (dispatch) => {
    
    try {
      const res = await callApi("root/user/signin", "POST", User)
      dispatch({
        type: CHECK_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserListAction = () => {
  return async (dispatch) => {
    try {
      const res = await callApi("root/user/", "GET")
      dispatch({
        type: GET_USER_LIST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getInfoUser = (token) => {
  return async (dispatch) => {
    try {
      const res = await callApi("root/user/info", "GET", "" , {token : token})
      dispatch({
        type: GET_INFO_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUserListAction = (idUser) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`root/user/${idUser}`, "DELETE")
      dispatch({
        type: DELETE_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fixUser = (idUser, data) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`root/user/${idUser}`, "PUT", data)
      dispatch({
        type: FIX_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserItemAction = (idUser) => {
  return async (dispatch) => {
    try {
      const res = await callApi(`root/user/${idUser}`, "GET")
      const data = res.data[0]
      console.log(res);
      dispatch({
        type: GET_USER_ITEM,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};