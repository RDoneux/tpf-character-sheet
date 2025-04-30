import { FormControl, FormGroup, FormArray, AbstractControl } from '@angular/forms'

export type FormGroupType<T> = {
    [key in keyof T]: T[key] extends (infer U)[]
        ? FormArray<AbstractControl> // Explicitly use AbstractControl for FormArray
        : T[key] extends object
          ? FormGroup<FormGroupType<T[key]>>
          : FormControl<T[key]>
}
