import { Component, DestroyRef, signal, WritableSignal } from '@angular/core'
import { version } from '../../../../package.json'
import { environment } from '../../../environments/environment'
import { ISettings } from '../../services/settings/interfaces/i-settings'
import { Store } from '@ngrx/store'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatIconModule } from '@angular/material/icon'

@Component({
    selector: 'app-footer',
    imports: [MatIconModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
    version: string = version + environment.versionSuffix
    isLoggedIn: WritableSignal<boolean> = signal(false)

    constructor(
        private store: Store<{ settings: ISettings }>,
        private destroyRef: DestroyRef
    ) {}

    ngOnInit() {
        this.store
            .select((state: { settings: ISettings }) => state.settings)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((settings: ISettings) => this.isLoggedIn.set(settings.user != null))
    }
}
