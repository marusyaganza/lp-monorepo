export type LinkType = {
  url: string;
  text: string;
};

export type WordType = {
  id: string;
  name: string;
  defs: string[];
  particle: string;
  user: string;
  uuid?: string;
  transcription?: string;
  imgUrl?: string;
  audioUrl?: string;
  tags?: string[];
  additionalInfo?: string;
  examples?: string[];
};
