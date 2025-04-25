import { FormControl, FormGroup } from '@angular/forms'

export type FormGroupType<T> = {
    [key in keyof T]: T[key] extends object
        ? FormGroup<FormGroupType<T[key]>>
        : FormControl<T[key]>
}
