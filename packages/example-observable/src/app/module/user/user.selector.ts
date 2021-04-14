import {User} from 'data-source';

import {RootState} from 'app/app.reducer';

export const selectCurrentUser = (state: RootState): undefined | null | User => state.user.currentUser;
