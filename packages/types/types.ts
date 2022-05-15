export enum Role {
    ADMIN,
    MEMBER,
    GUEST
}

export type User ={
    email: string;
    name: string;
    words: [Word];
    id: string;
    role: Role;
}

export type Word = {
    id: string;
    defs: [string];
    particle: string;
    imgUrl: string;
    audioUrl: string;
    tags: [string];
    additionalInfo: string;
    examples: [string];
    user: User;
}