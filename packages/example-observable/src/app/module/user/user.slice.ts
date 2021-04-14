import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {User} from 'data-source';

interface State {
    currentUser?: User | null;
}

const userSlice = createSlice({
    name: 'user',
    initialState: {} as State,
    reducers: {
        loadCurrentUser() {},
        currentUserLoaded(state, {payload: user}: PayloadAction<User | null>) {
            state.currentUser = user;
        },
    },
});

export const {loadCurrentUser, currentUserLoaded} = userSlice.actions;
export default userSlice.reducer;
