import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    error: false,
    repos: [],
    userrepos: [],
    repo: null
};

const slice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getReposSuccess(state, action) {
      state.isLoading = false;
      state.repos = action.payload;
    },

    getUserReposSuccess(state, action) {
      state.isLoading = false;
      state.userrepos = action.payload;
    },

    getRepoSuccess(state, action) {
      state.isLoading = false;
      state.repo = action.payload;
    },
  }
});
  
// Reducer
export default slice.reducer;

export function getRepos(query:string) {
  return async (dispatch:any) => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await fetch('https://api.github.com/search/repositories?q=' + query);
      const data = await response.json();
      data.query = query;
      dispatch(slice.actions.getReposSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  }
}

export function getUserRepos(query:string) {
  return async (dispatch:any) => {
    try {
      const response = await fetch('https://api.github.com/search/repositories?q=' + query);
      const data = await response.json();
      data.query = query;
      dispatch(slice.actions.getUserReposSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  }
}

export function getRepo(owner:string, name:string) {
  return async (dispatch:any) => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await fetch(`https://api.github.com/repos/${owner}/${name}`);
      const data = await response.json();
      dispatch(slice.actions.getRepoSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  }
}

