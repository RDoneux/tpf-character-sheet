import { Component, DestroyRef, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core'
import { IUser } from '../../../../services/settings/interfaces/i-settings'
import { SettingsService } from '../../../../services/settings/settings.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { map, Observable } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
    selector: 'app-login',
    imports: [
        AsyncPipe,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    @ViewChild('loginDialog') loginDialog!: TemplateRef<any>
    user$!: Observable<IUser>

    isCreatingUser: WritableSignal<boolean> = signal<boolean>(false)

    private dialogRef: MatDialogRef<any> | null = null

    form!: FormGroup
    constructor(
        private settingsService: SettingsService,
        private destroyRef: DestroyRef,
        private formBuilder: FormBuilder,
        private matDialog: MatDialog,
        private matSnackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.user$ = this.settingsService.getSettings$<{ user: IUser }>(['user']).pipe(
            takeUntilDestroyed(this.destroyRef),
            map((settings) => settings.user)
        )

        this.form = this.formBuilder.group({
            name: [''],
            email: [''],
        })
    }

    onLogin() {
        this.dialogRef = this.matDialog.open(this.loginDialog)
    }

    onCreateUser() {
        this.settingsService.createUser(this.form.value).subscribe({
            next: (user: IUser) => {
                this.settingsService.updateSettings({ user })
                this.toggleIsCreatingUser()
                this.dialogRef?.close()
                this.matSnackBar.open('Login successful', 'Close', {
                    duration: 3000,
                    panelClass: 'snackbar-success',
                })
            },
            error: (error) => {
                console.error('Error creating user:', error)
                this.matSnackBar.open(error.error.message, 'Close', {
                    panelClass: 'snackbar-error',
                })
            },
        })
    }

    onProcessLogin() {
        this.settingsService.login(this.form.value).subscribe({
            next: (user: IUser) => {
                this.settingsService.updateSettings({ user })
                this.toggleIsCreatingUser()
                this.dialogRef?.close()
                this.matSnackBar.open('Login successful', 'Close', {
                    duration: 3000,
                    panelClass: 'snackbar-success',
                })
            },
            error: (error) => {
                console.error('Error logging in:', error)
                this.matSnackBar.open(error.error.message, 'Close', {
                    panelClass: 'snackbar-error',
                })
            },
        })
    }

    onLogout() {
        this.settingsService.updateSettings({ user: null })
        this.matSnackBar.open('You have been logged out', 'Close', {
            duration: 3000,
            panelClass: 'snackbar-success',
        })
    }

    toggleIsCreatingUser() {
        this.isCreatingUser.set(!this.isCreatingUser())
    }
}
