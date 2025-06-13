import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { afterNextRender, Component, inject, Injector, TemplateRef, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Store } from '@ngrx/store'
import { JoinCampComponent } from '../join-camp/join-camp.component'
import { CampPageService } from '../../services/camp-page.service'
import { updateCampCode } from '../../state/camp.actions'

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
        private store: Store
    ) {}

    createCampForm!: FormGroup

    get campName(): string {
        return this.createCampForm.get('name')?.value || ''
    }

    ngOnInit() {
        this.createCampForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: [''],
        })
    }

    openCreateCampDialog() {
        this.dialog.open(this.createCampDialog)
    }

    onCreateCamp() {
        this.dialog.closeAll()
        this.campPageService.createCamp(this.campName).subscribe({
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
