import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core'
import { SettingsService } from '../services/settings/settings.service'

@Directive({
    selector: '[autoCalculatedInput]',
    standalone: true,
})
export class AutoCalculatedInputDirective {
    private settingsService = inject(SettingsService)
    private isReadonly = false

    constructor(
        private elementRef: ElementRef<HTMLInputElement>,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        this.settingsService.autoCalculateFields$.subscribe((autoCalculateFields: boolean) => {
            this.isReadonly = autoCalculateFields
            if (autoCalculateFields) {
                this.renderer.addClass(this.elementRef.nativeElement, 'auto-calculated-readonly')
            } else {
                this.renderer.removeClass(this.elementRef.nativeElement, 'auto-calculated-readonly')
            }
        })
    }

    @HostListener('keydown', ['$event'])
    @HostListener('paste', ['$event'])
    preventEdit(event: Event) {
        if (this.isReadonly) {
            event.preventDefault()
        }
    }
}
