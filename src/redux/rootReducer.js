import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import cartReducer from "./cart/cartReducers";

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

export default rootReducer;
