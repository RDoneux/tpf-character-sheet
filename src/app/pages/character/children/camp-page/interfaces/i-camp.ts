export interface ICamp {
    details: ICampDetails
    members: ICampMember[]
    copper: number
}

export interface ICampDetails {
    code: string | null
    name: string | null
}

export interface ICampMember {
    id: string
}

export const initialCampState: ICamp = {
    details: {
        code: null,
        name: null,
    },
    members: [],
    copper: 0,
}
