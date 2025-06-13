export interface ICamp {
    details: ICampDetails
}

export const initialCampState: ICamp = {
    details: {
        code: null,
        name: null,
    },
}

export interface ICampDetails {
    code: string | null
    name: string | null
}
