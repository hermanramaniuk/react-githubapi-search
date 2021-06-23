import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    error: false,
    users: [],
    user: null
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
  }
});
  
// Reducer
export default slice.reducer;

export function getUsers(query:string) {
  return async (dispatch:any) => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await fetch('https://api.github.com/search/users?q=' + query);
      const data = await response.json();
      data.query = query;
      dispatch(slice.actions.getUsersSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  }
}

export function getUser(name:string) {
  return async (dispatch:any) => {
    try {
      slice.actions.startLoading();
      const response = await fetch('https://api.github.com/users/' + name);
      const data = await response.json();
      dispatch(slice.actions.getUserSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  }
}


