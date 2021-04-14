import {Observable, of} from 'rxjs';

import {User} from '../entity';

export class UserService {
    getCurrent(): Observable<User | null> {
        return of(new User('User 1'));
    }
}
