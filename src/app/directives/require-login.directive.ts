import { DestroyRef, Directive, ElementRef, inject, Renderer2 } from '@angular/core'
import { SettingsService } from '../services/settings/settings.service'
import { IUser } from '../services/settings/interfaces/i-settings'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { map } from 'rxjs'

@Directive({
    selector: '[requireLogin]',
})
export class RequireLoginDirective {
    private settingsService = inject(SettingsService)

    constructor(
        private elementRef: ElementRef<HTMLInputElement>,
        private renderer: Renderer2,
        private destroyRef: DestroyRef
    ) {}

    ngOnInit() {
        this.settingsService
            .getSettings$<{ user: IUser | null }>(['user'])
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                map((value) => value?.user)
            )
            .subscribe((user: IUser | null) => {
                if (!user) {
                    this.renderer.addClass(this.elementRef.nativeElement, 'hidden')
                } else {
                    this.renderer.removeClass(this.elementRef.nativeElement, 'hidden')
                }
            })
    }
}
