import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    public loadingState$ = this.isLoading.asObservable()

    constructor() {}

    setLoading(loading: boolean): void {
        this.isLoading.next(loading)
    }
}
