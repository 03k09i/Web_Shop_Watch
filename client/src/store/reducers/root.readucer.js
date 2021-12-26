import { combineReducers } from "redux";
import { watchReducer } from "./watch.reducer";
import { userReducer } from "./user.reducer";
import { cartReducer } from "./cart.reducer";
import { invoiceReducer } from "./invoice.reducer";
import { invoiceDetailReducer } from "./invoiceDetail.reducer";
import { viewReducer } from "./view.reducer";
import { discountReducer } from "./discount.reducer";

export const rootReducer = combineReducers({
  watch : watchReducer,
  user : userReducer,
  cart : cartReducer,
  invoice : invoiceReducer,
  invoiceDetail : invoiceDetailReducer,
  view : viewReducer,
  discount : discountReducer
});
