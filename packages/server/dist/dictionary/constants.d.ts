export type TagType = {
    tag: string;
    replacement: string;
};
export type ComplexTagType = {
    opening: string;
    closing: string;
};
export declare const TAGS: TagType[];
export declare const COMPLEX_TAGS: ComplexTagType[];
export declare const COMPLEX_TAGS_TO_REMOVE: ComplexTagType[];
export declare const HW_TAGS: TagType[];
