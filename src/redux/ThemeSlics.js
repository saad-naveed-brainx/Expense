import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isDarkMode: true,
}

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
        }
    }
})

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;