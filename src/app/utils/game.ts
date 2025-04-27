import { CharacterExperienceTable } from '../types/game'

export function calculateLevelFromExperience(xp: number): number {
    // Find the highest level where XP is greater than or equal to the required XP
    for (let level = CharacterExperienceTable.length - 1; level >= 0; level--) {
        if (xp >= CharacterExperienceTable[level]) {
            return level + 1
        }
    }

    return 1 // Default to level 1 if XP is below the first threshold
}
