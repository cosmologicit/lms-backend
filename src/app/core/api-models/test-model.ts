export interface Test {
  id?: number;
  title?: string;
  associationId?: number;
  description?: string;
  subjectId?: number;
  chapterId?: number;
  sections?: Section[];
  totalPositiveMark?: number;
  totalNegativeMark?: number;
  startDate?: string; 
  endDate?: string;
  time?: string; 
}

export interface Section {
  id?: number;
  name?: string;
  questions?: Question[];
}

export interface Question {
  id?: number;
  type?: string; // Example?: "MCQ"
  question?: string;
  file?: string;
  options?: Option[];
  deletedOptionIds?: number[];
  positiveMark?: number;
  negativeMark?: number;
  order?: number;
  isAttempted?: boolean;
  isMarked?: boolean;
  isNotVisited?: boolean;
  isNotAnswered?: boolean;
  isMarkedAndAnswered?: boolean;
  timer?:string
}

export interface Option {
  id?: number;
  text?: string;
  correct?: boolean;
}
