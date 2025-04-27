import { FormGroupType } from '../../../interfaces/form-group-type'

export interface IProtectiveItem {
    name: string | null
    description: string | null
    armourClassBonus: number | null
    weight: number | null
    specialProperties: string | null
}

export interface IProtectiveItemForm extends FormGroupType<IProtectiveItem> {}

export interface IShield extends IProtectiveItem {
    checkPenalty: number | null
    spellFailureChance: number | null
}

export interface ISheildForm extends FormGroupType<IShield> {}

export interface IArmour extends IProtectiveItem {
    maxDex: number | null
    checkPenalty: number | null
    spellFailureChance: number | null
    speed: number | null
}

export interface IArmourForm extends FormGroupType<IArmour> {}

export interface IGear {
    totalWeight: number
    totalArmourClassBonus: number
    leftArm: IShield | null
    rightArm: IShield | null
    leftHand: IProtectiveItem | null
    rightHand: IProtectiveItem | null
    legs: IProtectiveItem | null
    feet: IProtectiveItem | null
    torso: IArmour | null
    head: IProtectiveItem | null
}

export interface IGearForm extends FormGroupType<IGear> {}

export const initialGearState: IGear = {
    totalWeight: 0,
    totalArmourClassBonus: 0,
    leftArm: {
        name: null,
        description: null,
        armourClassBonus: 0,
        weight: 0,
        specialProperties: null,
        checkPenalty: null,
        spellFailureChance: null,
    },
    rightArm: {
        name: null,
        description: null,
        armourClassBonus: 0,
        weight: 0,
        specialProperties: null,
        checkPenalty: null,
        spellFailureChance: null,
    },
    leftHand: {
        name: null,
        description: null,
        armourClassBonus: 0,
        weight: 0,
        specialProperties: null,
    },
    rightHand: {
        name: null,
        description: null,
        armourClassBonus: 0,
        weight: 0,
        specialProperties: null,
    },
    legs: {
        name: null,
        description: null,
        armourClassBonus: 0,
        weight: 0,
        specialProperties: null,
    },
    feet: {
        name: null,
        description: null,
        armourClassBonus: 0,
        weight: 0,
        specialProperties: null,
    },
    torso: {
        name: null,
        description: null,
        armourClassBonus: 0,
        weight: 0,
        specialProperties: null,
        maxDex: null,
        checkPenalty: null,
        spellFailureChance: null,
        speed: null,
    },
    head: {
        name: null,
        description: null,
        armourClassBonus: 0,
        weight: 0,
        specialProperties: null,
    },
}
