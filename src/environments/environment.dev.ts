import { IEnvironment } from './i-environment'

export const environment: IEnvironment = {
    production: false,
    versionSuffix: '-dev',
    apiUrl: 'https://fju4rlw3lmzihn5cvdkdx3rvda0byaki.lambda-url.eu-west-2.on.aws/',
    saveCharacterUrl: 'https://sraxl0ousf.execute-api.eu-west-2.amazonaws.com/dev/character',
    spellSearchUrl: 'https://sraxl0ousf.execute-api.eu-west-2.amazonaws.com/dev/spells',
    summonedCreaturesUrl: 'https://sraxl0ousf.execute-api.eu-west-2.amazonaws.com/dev/monsters',
    characterSheetListUrl: 'https://sraxl0ousf.execute-api.eu-west-2.amazonaws.com/dev/character/list',
    campUrl: 'https://sraxl0ousf.execute-api.eu-west-2.amazonaws.com/dev/camp',
    userUrl: 'https://sraxl0ousf.execute-api.eu-west-2.amazonaws.com/dev/user',
}
