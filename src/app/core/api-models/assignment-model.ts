export interface AssignmentModel {
    id?: number
    title?: string
    associationId?: number
    description?: string
    subjectId?: number
    chapterId?: number
    sections?: Section[]
    deletedSectionIds?: number[]
    totalPositiveMark?: number
    totalMarks?: number
    totalNegativeMark?: number
    startDate?: string
    endDate?: string
    time?: string
    isSubmitted?: boolean
}

export interface Section {
    name?: string
    id?: number
    questions?: Question[]
    deletedQuestionIds?: number[]
}

export interface Question {
    id?: number
    type?: string
    question?: string
    options?: Option[]
    deletedOptionIds?: number[]
    positiveMark?: number
    negativeMark?: number
    order?: number

    isFocused?: boolean;
    hasError?: boolean;
    errorMessage?: string;
}

export interface Option {
    id?: number
    text?: string
    isCorrect?: boolean
    correct?: boolean
}