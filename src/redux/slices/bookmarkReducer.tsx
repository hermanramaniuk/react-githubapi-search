import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    error: false,
    bookmarks: [],
    bookmark: null
};

const slice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getBookmarksSuccess(state, action) {
      state.isLoading = false;
      state.bookmarks = action.payload;
    },
  }
});
  
// Reducer
export default slice.reducer;

export function getBookmarks(query:string) {
  return async (dispatch:any) => {
    try {
      const response = await fetch('https://api.github.com/search/bookmarks?q=' + query);
      const data = response.json();
      
      dispatch(slice.actions.getBookmarksSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  }
}

