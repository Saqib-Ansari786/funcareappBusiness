import { configureStore } from "@reduxjs/toolkit";
import { PlaylandReducer, userReducer } from "./reducers";

const store = configureStore({
  reducer: {
    user: userReducer,
    playland: PlaylandReducer,
  },
});

export default store;
