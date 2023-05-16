import { configureStore } from "@reduxjs/toolkit";
import { PlaylandReducer, landdataReducer, userReducer } from "./reducers";

const store = configureStore({
  reducer: {
    user: userReducer,
    playland: PlaylandReducer,
    landdata: landdataReducer,
  },
});

export default store;
