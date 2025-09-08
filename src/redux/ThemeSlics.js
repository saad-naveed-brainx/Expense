import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isDarkMode: localStorage.getItem('isDarkMode')? JSON.parse(localStorage.getItem('isDarkMode')):true,
}

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
        }
    }
})

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;