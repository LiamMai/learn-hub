export enum TopicCategory {
  ANGULAR = 'angular',
  NESTJS = 'nestjs',
  MONGODB = 'mongodb',
  TYPESCRIPT = 'typescript',
  JAVASCRIPT = 'javascript',
}

export interface Topic {
  _id: string;
  title: string;
  category: TopicCategory;
  sourceDocUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type CreateTopic = Omit<
  Topic,
  '_id' | 'createdAt' | 'updatedAt'
>;
