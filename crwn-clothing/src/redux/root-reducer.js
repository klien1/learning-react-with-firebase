import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

// local storage as default storage
import storage from "redux-persist/lib/storage";

// session storage
// need to double check with documentation if it is right path
// import sessionStorage from 'redux-persist/lib/storage/session'

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const persistConfig = {
  key: "root", // at what point do we want to store everything?
  storage,
  whitelist: ["cart"] // string array of reducers we want to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

// don't need to add user to persist because it is handled by firebase
export default persistReducer(persistConfig, rootReducer);
