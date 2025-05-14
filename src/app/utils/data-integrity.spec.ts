import { initialArmourClassState } from '../core/armour-class/interfaces/i-armour-class'
import { applyDataMigrations, migrations } from './data-integrity'
import { STORAGE_KEY } from './state'

describe('Data Integrity Tests', () => {
    let localStorageMock: Record<string, string>

    beforeAll(() => {
        // Mock the global localStorage object
        Object.defineProperty(global, 'localStorage', {
            value: {
                getItem: jest.fn((key: string) => localStorageMock[key] || null),
                setItem: jest.fn((key: string, value: string) => {
                    localStorageMock[key] = value
                }),
                removeItem: jest.fn((key: string) => {
                    delete localStorageMock[key]
                }),
            },
            writable: true,
        })
    })

    beforeEach(() => {
        localStorageMock = {}
        jest.clearAllMocks() // Clear any previous mock calls
    })

    afterEach(() => {
        jest.restoreAllMocks() // Restore original implementations
    })

    it('should apply migrations when no existing migrations are present', () => {
        localStorageMock = {} // Simulate empty localStorage

        applyDataMigrations()

        const storedMigrations = JSON.parse(localStorage.getItem(`${STORAGE_KEY}migrations`) || '[]')
        expect(storedMigrations).toContain('1.3.0')

        const armourClassState = JSON.parse(localStorage.getItem(`${STORAGE_KEY}armourClass`) || '{}')
        expect(armourClassState).toEqual({
            ...initialArmourClassState,
            touch: null,
            flatFooted: null,
        })
    })

    it('should not reapply migrations if they already exist', () => {
        localStorageMock[`${STORAGE_KEY}migrations`] = JSON.stringify(['1.3.0'])
        localStorageMock[`${STORAGE_KEY}armourClass`] = JSON.stringify({
            touch: 5,
            flatFooted: 10,
        })

        applyDataMigrations()

        const storedMigrations = JSON.parse(localStorage.getItem(`${STORAGE_KEY}migrations`) || '[]')
        expect(storedMigrations).toContain('1.3.0')

        const armourClassState = JSON.parse(localStorage.getItem(`${STORAGE_KEY}armourClass`) || '{}')
        expect(armourClassState).toEqual({
            touch: 5,
            flatFooted: 10,
        }) // Ensure no changes were made
    })

    it('should handle removing a field during migration', () => {
        migrations.push({
            version: '1.4.0',
            description: 'Remove deprecated field',
            sliceName: 'armourClass',
            initialState: initialArmourClassState,
            actions: [
                {
                    key: 'deprecatedField',
                    action: 'remove',
                    value: null,
                },
            ],
        })

        localStorageMock[`${STORAGE_KEY}migrations`] = JSON.stringify([])
        localStorageMock[`${STORAGE_KEY}armourClass`] = JSON.stringify({
            deprecatedField: 'toBeRemoved',
        })

        applyDataMigrations()

        const storedMigrations = JSON.parse(localStorage.getItem(`${STORAGE_KEY}migrations`) || '[]')
        expect(storedMigrations).toContain('1.4.0')

        const armourClassState = JSON.parse(localStorage.getItem(`${STORAGE_KEY}armourClass`) || '{}')
        expect(armourClassState).not.toHaveProperty('deprecatedField')
    })
})
