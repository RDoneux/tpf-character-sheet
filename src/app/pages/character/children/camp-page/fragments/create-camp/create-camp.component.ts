import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { afterNextRender, Component, DestroyRef, inject, Injector, TemplateRef, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Store } from '@ngrx/store'
import { JoinCampComponent } from '../join-camp/join-camp.component'
import { CampPageService } from '../../services/camp-page.service'
import { updateCampCode } from '../../state/camp.actions'
import { IBackground } from '../../../../../../core/background/interfaces/i-background'
import { firstValueFrom, Observable } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
    selector: 'app-create-camp',
    imports: [
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        JoinCampComponent,
    ],
    templateUrl: './create-camp.component.html',
    styleUrl: './create-camp.component.scss',
})
export class CreateCampComponent {
    private _injector = inject(Injector)

    @ViewChild('campDialog') createCampDialog!: TemplateRef<any>
    @ViewChild('autosize') autosize!: CdkTextareaAutosize

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private campPageService: CampPageService,
        private store: Store<{ background: IBackground }>,
        private destroyRef: DestroyRef
    ) {}

    createCampForm!: FormGroup
    background$!: Observable<IBackground>

    get campName(): string {
        return this.createCampForm.get('name')?.value || ''
    }

    get campDescription(): string {
        return this.createCampForm.get('description')?.value || ''
    }

    ngOnInit() {
        this.createCampForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: [''],
        })

        this.background$ = this.store.select((state: { background: IBackground }) => state.background)
    }

    openCreateCampDialog() {
        this.dialog.open(this.createCampDialog)
    }

    async onCreateCamp() {
        const backgroundSnapshot = await firstValueFrom(this.background$.pipe(takeUntilDestroyed(this.destroyRef)))
        const id = backgroundSnapshot.id
        this.dialog.closeAll()
        this.campPageService.createCamp(this.campName, this.campDescription, [{ id }]).subscribe({
            next: (response: string) => this.store.dispatch(updateCampCode({ campCode: response })),
        })
    }

    triggerResize() {
        // Wait for content to render, then trigger textarea resize.
        afterNextRender(
            () => {
                this.autosize.resizeToFitContent(true)
            },
            {
                injector: this._injector,
            }
        )
    }
}
