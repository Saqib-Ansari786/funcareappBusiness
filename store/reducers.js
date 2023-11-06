import { createReducer } from "@reduxjs/toolkit";

const userInitialState = {
  userId: null,
};

const PlaylandInitialState = {
  playland_name: null,
  discription: null,
  image: null,
  location: null,
  existingPackages: [
    {
      package_name: "Silver Package",
      price: "100",
      discription:
        "In this package you will get 1 hour of playtime. You can play any game you want. You can also bring your own games. ",
      discount: "0",
    },
    {
      package_name: "Gold Package",
      price: "200",
      discription:
        "In this package you will get 2 hour of playtime. You can play any game you want. You can also bring your own games. ",
      discount: "0",
    },
    {
      package_name: "Platinum Package",
      price: "300",
      discription:
        "In this package you will get 3 hour of playtime. You can play any game you want. You can also bring your own games. ",
      discount: "0",
    },
    {
      package_name: "Diamond Package",
      price: "400",
      discription:
        "In this package you will get 4 hour of playtime. You can play any game you want. You can also bring your own games. ",
      discount: "0",
    },
  ],
};

const landdatainitialState = {
  landdata: null,
};

const updateRequestFlag = {
  userRequest: false,
  playlandcreate: false,
  playlandupdate: false,
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
  SET_LOCATION: (state, action) => {
    state.location = action.payload;
  },

  SET_PACKAGES: (state, action) => {
    state.existingPackages = action.payload;
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
  SET_PLAYLAND_CREATE: (state, action) => {
    state.playlandcreate = action.payload;
  },
  SET_PLAYLAND_UPDATE: (state, action) => {
    state.playlandupdate = action.payload;
  },
});

export const bookingdataReducer = createReducer(bookingdataInitialState, {
  SET_BOOKING_DATA: (state, action) => {
    state.bookingdata = action.payload;
  },
});
