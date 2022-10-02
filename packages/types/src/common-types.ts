export enum Role {
  ADMIN,
  MEMBER,
  GUEST
}

export type User = {
  email: string;
  name: string;
  id: string;
  role: Role;
};

export type LinkType = {
  url: string;
  text: string;
};

/**word definition with examples */
export type DefinitionType = {
  def: string;
  examples?: string[];
};

/**CEFR levels */
export type LevelType = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type TagType = {
  color: string;
  text: string;
};

/**word entity */
export type WordType = {
  /**id created by DB */
  id: string;
  /**id from dictionary, not defined by custom words created by user */
  uuid?: string;
  /**word inself */
  name: string;
  /**array of definitions with examoles */
  defs: DefinitionType[];
  /**particle like noun, adjective etc. */
  particle: string;
  /**is true for offensive taboo or dirty words */
  isOffensive: boolean;
  /** array of word forms */
  stems: string[];
  /**user id */
  user: string;
  /**one of 6 level from A1 to C1, added by user */
  level?: LevelType;
  transcription?: string;
  /**src of image */
  imgUrl?: string;
  /**src of the sound */
  audioUrl?: string;
  /**array of tags associated with the word. Might be added by user */
  tags?: TagType[];
  /**any additional info user would like to store */
  additionalInfo?: string;
};
