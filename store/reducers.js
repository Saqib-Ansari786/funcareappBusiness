import { createReducer } from "@reduxjs/toolkit";

const userInitialState = {
  userId: null,
};

const PlaylandInitialState = {
  playland_name: null,
  discription: null,
  image: null,
  Latitude: null,
  Longitude: null,
  time_open: null,
  time_close: null,
  price: null,
  discount: null,
  location: null,
};

const landdatainitialState = {
  landdata: null,
};

const updateRequestFlag = {
  userRequest: false,
};

const bookingdataInitialState = {
  bookingdata: null,
};

export const userReducer = createReducer(userInitialState, {
  SET_USER_ID: (state, action) => {
    state.userId = action.payload;
  },
});

export const PlaylandReducer = createReducer(PlaylandInitialState, {
  SET_PLAYLAND_NAME: (state, action) => {
    state.playland_name = action.payload;
  },
  SET_DESCRIPTION: (state, action) => {
    state.discription = action.payload;
  },
  SET_IMAGE: (state, action) => {
    state.image = action.payload;
  },
  SET_LATITUDE: (state, action) => {
    state.Latitude = action.payload;
  },
  SET_LONGITUDE: (state, action) => {
    state.Longitude = action.payload;
  },
  SET_LOCATION: (state, action) => {
    state.location = action.payload;
  },
  SET_TIME_OPEN: (state, action) => {
    state.time_open = action.payload;
  },
  SET_TIME_CLOSE: (state, action) => {
    state.time_close = action.payload;
  },
  SET_PRICE: (state, action) => {
    state.price = action.payload;
  },
  SET_DISCOUNT: (state, action) => {
    state.discount = action.payload;
  },
});

export const landdataReducer = createReducer(landdatainitialState, {
  SET_LAND_DATA: (state, action) => {
    state.landdata = action.payload;
  },
});

export const updateRequestReducer = createReducer(updateRequestFlag, {
  SET_USER_REQUEST: (state, action) => {
    state.userRequest = action.payload;
  },
});

export const bookingdataReducer = createReducer(bookingdataInitialState, {
  SET_BOOKING_DATA: (state, action) => {
    state.bookingdata = action.payload;
  },
});
