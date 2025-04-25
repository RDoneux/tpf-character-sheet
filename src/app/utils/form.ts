import { FormControl, FormGroup } from '@angular/forms'

export function buildForm<T extends object>(data: T): FormGroup {
    const formGroup: { [key: string]: FormGroup | FormControl } = {}

    Object.keys(data).forEach((key) => {
        const value = data[key as keyof T]
        if (
            value !== null &&
            typeof value === 'object'
            // !Array.isArray(value)
        ) {
            // If the value is an object, recursively create a nested FormGroup
            formGroup[key] = buildForm(value)
        } else {
            // Otherwise, create a FormControl
            formGroup[key] = new FormControl(value)
        }
    })

    return new FormGroup(formGroup)
}
