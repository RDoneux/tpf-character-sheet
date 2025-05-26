import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FooterComponent } from './fragments/footer/footer.component'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'tpf-character-sheet'

    constructor(private snackBar: MatSnackBar) {}

    async ngOnInit() {
        if ('wakeLock' in navigator) {
            try {
                await (navigator as any).wakeLock.request('screen')
            } catch (error: unknown) {
                this.snackBar.open('Failed to acquire wake lock. Some features may not work as expected.', 'Close', {
                    panelClass: 'snackbar-error',
                    duration: 5000,
                })
            }
        } else {
            this.snackBar.open(
                'Wake Lock API is not supported in this browser. Some features may not work as expected.',
                'Close',
                { panelClass: 'snackbar-error', duration: 5000 }
            )
        }
    }
}
