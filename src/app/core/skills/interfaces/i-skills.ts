import { v4 } from 'uuid'
import { FormGroupType } from '../../../interfaces/form-group-type'
import { Ability } from '../../abilities/interfaces/i-abilities'
import { CraftSpecialisation } from '../../../types/game'

export interface ISkill {
    id: string
    name: Skill
    keyAbility: Ability
    skillModifier: number
    abilityModifier: number
    ranks: number
    miscModifier: number
    isClassSkill: boolean
    isTrainedOnly: boolean
    specialisation: ISkillSpecialisation | null
}

export interface ISkillSpecialisation {
    name: CraftSpecialisation | null
    canDelete: boolean
}

export type ISkillForm = FormGroupType<ISkill>

export const Skill = {
    APPRAISE: 'Appraise',
    BALANCE: 'Balance',
    BLUFF: 'Bluff',
    CLIMB: 'Climb',
    CONCENTRATION: 'Concentration',
    CRAFT: 'Craft',
    DECIPHER_SCRIPT: 'Decipher Script',
    DIPLOMACY: 'Diplomacy',
    DISABLE_DEVICE: 'Disable Device',
    DISGUISE: 'Disguise',
    ESCAPE_ARTIST: 'Escape Artist',
    FORGERY: 'Forgery',
    GATHER_INFORMATION: 'Gather Information',
    HANDLE_ANIMAL: 'Handle Animal',
    HEAL: 'Heal',
    HIDE: 'Hide',
    INTIMIDATE: 'Intimidate',
    JUMP: 'Jump',
    KNOWLEDGE: 'Knowledge',
    LISTEN: 'Listen',
    MOVE_SILENTLY: 'Move Silently',
    OPEN_LOCK: 'Open Lock',
    PERFORM: 'Perform',
    PROFESSION: 'Profession',
    RIDE: 'Ride',
    SEARCH: 'Search',
    SENSE_MOTIVE: 'Sense Motive',
    SLEIGHT_OF_HAND: 'Sleight of Hand',
    SPELLCRAFT: 'Spellcraft',
    SPOT: 'Spot',
    SURVIVAL: 'Survival',
    SWIM: 'Swim',
    TUMBLE: 'Tumble',
    USE_MAGIC_DEVICE: 'Use Magic Device',
    USE_ROPE: 'Use Rope',
    OTHER: 'Other',
} as const
export type Skill = (typeof Skill)[keyof typeof Skill]

export const initialSpecialisationState: ISkillSpecialisation = {
    name: null,
    canDelete: false,
}

export const initialSkillState: ISkill[] = [
    {
        id: v4(),
        name: Skill.APPRAISE,
        keyAbility: Ability.INTELLIGENCE,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.BALANCE,
        keyAbility: Ability.DEXTERITY,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.BLUFF,
        keyAbility: Ability.CHARISMA,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.CLIMB,
        keyAbility: Ability.STRENGTH,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.CONCENTRATION,
        keyAbility: Ability.CONSTITUTION,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.CRAFT,
        keyAbility: Ability.INTELLIGENCE,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: initialSpecialisationState,
    },
    {
        id: v4(),
        name: Skill.DECIPHER_SCRIPT,
        keyAbility: Ability.INTELLIGENCE,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: true,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.DIPLOMACY,
        keyAbility: Ability.CHARISMA,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.DISABLE_DEVICE,
        keyAbility: Ability.INTELLIGENCE,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: true,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.DISGUISE,
        keyAbility: Ability.CHARISMA,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.ESCAPE_ARTIST,
        keyAbility: Ability.DEXTERITY,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.FORGERY,
        keyAbility: Ability.INTELLIGENCE,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.GATHER_INFORMATION,
        keyAbility: Ability.CHARISMA,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.HANDLE_ANIMAL,
        keyAbility: Ability.CHARISMA,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: true,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.HEAL,
        keyAbility: Ability.WISDOM,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.HIDE,
        keyAbility: Ability.DEXTERITY,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.INTIMIDATE,
        keyAbility: Ability.CHARISMA,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.JUMP,
        keyAbility: Ability.STRENGTH,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.KNOWLEDGE,
        keyAbility: Ability.INTELLIGENCE,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: true,
        specialisation: initialSpecialisationState,
    },
    {
        id: v4(),
        name: Skill.LISTEN,
        keyAbility: Ability.WISDOM,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.MOVE_SILENTLY,
        keyAbility: Ability.DEXTERITY,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.OPEN_LOCK,
        keyAbility: Ability.DEXTERITY,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: true,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.PERFORM,
        keyAbility: Ability.CHARISMA,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: initialSpecialisationState,
    },
    {
        id: v4(),
        name: Skill.PROFESSION,
        keyAbility: Ability.WISDOM,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: true,
        specialisation: initialSpecialisationState,
    },
    {
        id: v4(),
        name: Skill.RIDE,
        keyAbility: Ability.DEXTERITY,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.SEARCH,
        keyAbility: Ability.INTELLIGENCE,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.SENSE_MOTIVE,
        keyAbility: Ability.WISDOM,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.SLEIGHT_OF_HAND,
        keyAbility: Ability.DEXTERITY,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: true,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.SPELLCRAFT,
        keyAbility: Ability.INTELLIGENCE,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: true,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.SPOT,
        keyAbility: Ability.WISDOM,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.SURVIVAL,
        keyAbility: Ability.WISDOM,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.SWIM,
        keyAbility: Ability.STRENGTH,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.TUMBLE,
        keyAbility: Ability.DEXTERITY,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: true,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.USE_MAGIC_DEVICE,
        keyAbility: Ability.CHARISMA,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: true,
        specialisation: null,
    },
    {
        id: v4(),
        name: Skill.USE_ROPE,
        keyAbility: Ability.DEXTERITY,
        skillModifier: 0,
        abilityModifier: 0,
        ranks: 0,
        miscModifier: 0,
        isClassSkill: false,
        isTrainedOnly: false,
        specialisation: null,
    },
]
