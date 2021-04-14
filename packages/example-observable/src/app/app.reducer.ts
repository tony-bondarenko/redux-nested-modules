import userReducer from './module/user/user.slice';

const appReducer = {
    user: userReducer,
};

export type RootState = {
    user: ReturnType<typeof userReducer>;
};
export default appReducer;
