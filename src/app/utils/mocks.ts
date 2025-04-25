import { Store } from '@ngrx/store'
import { of } from 'rxjs'

export const mockStore = {
    provide: Store,
    useValue: {
        select: (selector: any) => of(''),
        dispatch: (action: any) => {},
    },
}
