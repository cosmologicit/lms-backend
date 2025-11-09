export interface Assignment {
  id?: number;
  title?: string;
  description?: string;
  subjectName?: string
  chapterName?: string
  associationName?: string
  subjectId?: number;
  chapterId?: number;
  associationId?: number;
  assignmentId?: number;
  questions?: QuestionRequest[];
  deletedQuestionIds?: number[];
  totalPositiveMark?: number;
  totalNegativeMark?: number;
  startDate?: string;
  endDate?: string;
  time?: string;
  isSubmitted?: boolean;
  color?: string;
  totalMarks?: number;
}

export interface QuestionRequest {
  id?: number;
  type?: string;
  question?: string;
  options?: Option[];
  deletedOptionIds?: number[];
  positiveMark?: number;
  obtainMarks?: number
  negativeMark?: number;
  order?: number;
  answerText?: string;
  answeroptionId?: number;
  userAnswerText?: string
  userAnswerOptionId?: number;

  isFocused?: boolean;
}

export interface SubmitAssignment {
  assignmentId?: number;
  submitQuestionRequests?: submitQuestionRequests[];
}

export interface submitQuestionRequests {
  questionId?: number;
  answerText?: string;
  answerOptionId?: number;
}

export interface Option {
  id?: number;
  text?: string;
  isCorrect?: boolean;
  selectedId?: number;
}

export interface Association {
  id?: number
  name?: string
  code?: string
  courseId?: number
  departmentId?: number
  userIds?: Array<number>
  teacherDetailId?: number;
  teacherName?: string;
  isClassTeacher?: boolean
}

export interface Subject {
  id?: number;
  name?: string;
  code?: string;
  description?: string;
  semester?: string;
  chapterIds?: number[];
  associationIds?: Array<number>;
  instituteBranchId?: number;
  instituteBranchCourseDepartmentMapping?: InstituteBranchCourseDepartmentMapping[];
}

export interface InstituteBranchCourseDepartmentMapping {
  id?: number;
  instituteBranchName?: string;
  departmentName?: string;
  courseName?: string;
  instituteBranchId?: number;
  departmentId?: number;
  courseId?: number;
}

export interface Chapter {
  id?: number
  name?: string
  code?: string
  subjectId?: number
  associationId?: number
  instituteBranchId?: number
  subjectName?: string;
}

export interface SaveChapter {
  id?: number;
  chapterDetails?: ChapterDetail[];
  subjectId?: number;
  associationId?: number;
  instituteBranchId?: number;
}

export interface ChapterDetail {
  name?: string;
  code?: string;
}

export interface AddNotes {
  id?: number
  associationId?: number
  subjectId?: number
  chapterId?: number
  title?: string
  description?: string
}

export interface Notes {
  id: number
  title: string
  description: string
  subjectId?: number
  associationId?: number
  subjectName?: string;
  associationName?: string;
  filePath: Array<string>
}

export interface GetNotesById {
  id?: number;
  title?: string;
  description?: string;
  associationId?: number;
  subjectId?: number;
  chapterId?: number;
  files?: File[];
}

interface File {
  id?: number;
  fileName?: string;
  filePath?: string;
  fileType?: string;
}

export interface MapStudentClass {
  id: number
  name: string
  email: string
  phone: string
  doa: string
  isLinked: boolean
}

export interface Syllabus {
  id?: number;
  name?: string;
  associationId?: number;
  associationName?: string;
  subjectName?: string;
  subjectId?: number;
  chapterIds?: number[];
  description?: string;
}

export interface ExamineAssignment {
  assignmentId?: number;
  studentId?: number;
  questionMarks?: QuestionMark[];
}
export interface QuestionMark {
  questionId?: number;
  marksObtained?: number;
}

export interface GetAttendance {
  id?: number;
  studentDetailId?: number;
  teacherId?: number;
  status?: string;
  date?: string;
  associationId?: number;
}

export interface GetAttendanceByClassAndDate {
  attendance?: boolean;
  studentAttendanceResponseList?: Array<studentAttendanceResponseList>
}

export interface studentAttendanceResponseList{
id?: number;
  studentDetailId?: number;
  teacherId?: number;
  status?: string;
  date?: string;
  associationId?: number;
  holidayName?: string;
  comment?: string;
  studentName?: string;
  profilePhoto?: string;
  admissionNo?: string;
  isPresent?: boolean;
  isLeave?: boolean;
  isHoliday?: boolean;
  isAbsent?: boolean;
}

export interface GetTimetable {
  id: number;
  associationId: number;
  associationName: string;
  intervalFrom: string;
  intervalTo: string;
  subjectId: number;
  subjectName: string;
  userId: number;
  teacherName: string;
  day: string;
  periodName: string;
  isBreak: boolean;
  color: string;
}

export interface Exam {
  id?: number;
  name?: string;
  description?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  maxMarks?: string;
  passingMarks?: string;
  associationId?: number;
  subjectId?: number;
  examType?: string;
}

export interface ExamNumbers { 
  id?: number;
  studentId?: number;
  studentName?: string;
  associationId?: number;
  associationName?: string;
  examScheduleId?: number;
  subjectId?: number;
  subjectName?: string;
  marks?: number;
  comments?: string;
  attendanceStatus?: string;
  grade?: string;
  phone?: string;
  email?: string;
  profilePicture?: string;
  admissionNumber?: string;
}

export interface SubmitExamNumbers {
  examScheduleId?: number;
  examResults?: ExamResult[];
}

export interface ExamResult {
  userId?: number;
  marks?: number;
  comment?: string;
  attendanceStatus?: string;
}
