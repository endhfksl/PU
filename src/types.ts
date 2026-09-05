export interface CharacterRule {
  before: string;
  after: string;
  lover: string;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  age: number;
  mbti: string;
  tags: string[];
  background: string;
  rules: CharacterRule;
  images: string[];
}

export interface Nuisance {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface WorldLore {
  title: string;
  description: string;
  operation: string;
  setting: string;
}
