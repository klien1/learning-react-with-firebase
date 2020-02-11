// import SHOP_DATA from "../../constants/shop.data";

import { UPDATE_COLLECTIONS } from "./shot.types";

// const INITIAL_STATE = {
//   collections: SHOP_DATA
// };

const INITIAL_STATE = null;

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      };
    default:
      return state;
  }
};

export default shopReducer;
