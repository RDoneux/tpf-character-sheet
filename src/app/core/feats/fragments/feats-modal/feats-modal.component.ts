import {
    afterNextRender,
    Component,
    DestroyRef,
    inject,
    Inject,
    Injector,
    signal,
    ViewChild,
    WritableSignal,
} from '@angular/core'
import { IFeat, IFeatForm } from '../../interfaces/i-feat'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { buildForm } from '../../../../utils/form'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { debounceTime } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Store } from '@ngrx/store'
import { addFeat, updateFeat } from '../../state/feats.actions'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'

@Component({
    selector: 'app-feats-modal',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    templateUrl: './feats-modal.component.html',
    styleUrl: './feats-modal.component.scss',
})
export class FeatsModalComponent {
    private _injector = inject(Injector)

    @ViewChild('autosize') autosize!: CdkTextareaAutosize

    form: FormGroup<IFeatForm>
    feat: WritableSignal<IFeat>
    isNew: WritableSignal<boolean> = signal(false)

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { feat: IFeat; isNew: boolean },
        private store: Store<{ feats: IFeat[] }>,
        private destroyRef: DestroyRef
    ) {
        this.form = buildForm<IFeat>(data.feat)
        this.feat = signal(data.feat)
        this.isNew.set(data.isNew)
    }

    ngOnInit() {
        this.form.valueChanges
            .pipe(debounceTime(200), takeUntilDestroyed(this.destroyRef))
            .subscribe((value: Partial<IFeat>) => {
                this.store.dispatch(
                    this.isNew() ? addFeat({ feat: value as IFeat }) : updateFeat({ feat: value as IFeat })
                )
                this.isNew.set(false)
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
