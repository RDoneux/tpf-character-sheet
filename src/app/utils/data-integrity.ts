import { initialArmourClassState } from '../core/armour-class/interfaces/i-armour-class'
import { STORAGE_KEY } from './state'

const SLICE_NAME = 'migrations'

export interface IDataMigration<T> {
    version: string
    sliceName: string
    description: string
    initialState: T
    actions: IDataMigrationAction<keyof T>[]
}

export interface IDataMigrationAction<T> {
    key: T
    action: 'add' | 'remove' | 'update'
    value: any
}

export function applyDataMigrations() {
    const existingMigrations: string[] = JSON.parse(
        localStorage.getItem(`${STORAGE_KEY}${SLICE_NAME}`) ?? '[]'
    ) as string[]

    migrations.forEach((migration: IDataMigration<any>) => {
        if (
            !existingMigrations.find((storedMigrationVersion: string) => migration.version === storedMigrationVersion)
        ) {
            const currentValue =
                JSON.parse(localStorage.getItem(`${STORAGE_KEY}${migration.sliceName}`) as string) ??
                migration.initialState

            migration.actions.forEach((fieldKey: IDataMigrationAction<any>) => {
                switch (fieldKey.action) {
                    case 'add':
                    case 'update':
                        localStorage.setItem(
                            `${STORAGE_KEY}${migration.sliceName}`,
                            JSON.stringify({
                                ...currentValue,
                                [fieldKey.key]: fieldKey.value,
                            })
                        )
                        break
                    case 'remove':
                        delete currentValue[fieldKey.key]
                        localStorage.setItem(
                            `${STORAGE_KEY}${migration.sliceName}`,
                            JSON.stringify({
                                ...currentValue,
                            })
                        )
                        break
                }
            })
            existingMigrations.push(migration.version)
        }
    })

    localStorage.setItem(`${STORAGE_KEY}${SLICE_NAME}`, JSON.stringify(existingMigrations))
}

export const migrations: IDataMigration<any>[] = [
    {
        version: '1.3.0',
        description: 'Update Armour Class to Include Touch & Flat Footed',
        sliceName: 'armourClass',
        initialState: initialArmourClassState,
        actions: [
            {
                key: 'touch',
                action: 'add',
                value: null,
            },
            {
                key: 'flatFooted',
                action: 'add',
                value: null,
            },
        ],
    },
]
