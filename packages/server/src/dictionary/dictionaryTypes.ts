export interface DictionaryWordType {
  meta: Meta;
  hwi: Hwi;
  fl: string;
  gram?: string;
  def?: DefEntity[] | null;
  uros?: UrosEntity[] | null;
  shortdef?: string[] | null;
  art?: Art;
  cxs?: CognateEntity[];
  suppl?: { cjts: Conjugation[] };
}
export interface AppShortdef {
  hw: string;
  fl: string;
  def?: string[] | null;
}
export interface Meta {
  id: string;
  uuid: string;
  src: string;
  section: string;
  target?: Target;
  stems?: string[] | null;
  'app-shortdef'?: AppShortdef;
  offensive: boolean;
  lang?: string;
}
export interface Target {
  tuuid: string;
  tsrc: string;
}

export interface Hwi {
  hw: string;
  prs?: PrsEntity[] | null;
}
export interface PrsEntity {
  ipa?: string;
  sound: Sound;
  mw?: string;
}
export interface Sound {
  audio: string;
}

export interface Art {
  artid?: string;
  capt?: string;
}

export interface DefEntity {
  sseq?: (((string | Sense)[] | null)[] | null)[] | null;
}
export interface Sense {
  sls?: string[] | null;
  dt?: ((string | Entity[] | null)[] | null)[] | null;
}
export interface Entity {
  t: string;
}
export interface UrosEntity {
  ure: string;
  fl: string;
  ins?: InsEntity[] | null;
  gram?: string;
  utxt?: ((string | Entity[] | null)[] | null)[] | null;
  prs?: PrsEntity[] | null;
}
export interface InsEntity {
  il: string;
  ifc: string;
  if: string;
}

export interface CognateEntity {
  cxl?: string;
  cxtis: CognateTarget[];
}

export interface CognateTarget {
  cxt?: string;
}

export interface Conjugation {
  cjid: string;
  cjfs: string[];
}
