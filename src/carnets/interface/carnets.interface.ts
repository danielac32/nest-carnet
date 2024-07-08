interface Department {
    id?: number;
    name: string;
}

interface Charge {
    id?: number;
    name: string;
}

export interface Type_creations {
    id?: number;
    name: string;
}

interface Texture {
    id?: number;
    name: string;
}

interface Status {
    id?: number;
    name: string;
}

interface AccessLevel {
    id?: number;
    name: string;
}

interface Gender {
    id?: number;
    name: string;
}

interface HairColor {
    id?: number;
    name: string;
}

interface State {
    id?: number;
    name: string;
}

interface SkinColor {
    id?: number;
    name: string;
}

interface CivilStatus {
    id?: number;
    name: string;
}

export interface Carnet {
    id?: number;
    name?: string;
    lastname?: string;
    card_code?: string;
    expiration: Date;
    note?: string;
    cedule?: string;
    extent?: string;
    address?: string;
    phone?: string;
    cellpone?: string;
    photo?: string;
    qr?: string;

    department?: Department;
    charge?: Charge;
    type_creations: Type_creations[];
    textures?: Texture;
    status?: Status;
    access_levels?: AccessLevel;
    genders?: Gender;
    hair_colors?: HairColor;
    state?: State;
    municipalities?: string;
    parishes?: string;
    skin_colors?: SkinColor;
    civil_statuses?: CivilStatus;
    created_at: Date;
    updated_at: Date;
}
