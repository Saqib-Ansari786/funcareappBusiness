import { configureStore } from "@reduxjs/toolkit";
import {
  PlaylandReducer,
  bookingdataReducer,
  landdataReducer,
  updateRequestReducer,
  userReducer,
} from "./reducers";

const store = configureStore({
  reducer: {
    user: userReducer,
    playland: PlaylandReducer,
    landdata: landdataReducer,
    request: updateRequestReducer,
    bookingdata: bookingdataReducer,
  },
});

export default store;
