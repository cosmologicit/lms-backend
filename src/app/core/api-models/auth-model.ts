export interface Signup{
    name?: string;
    email?: string;
    phone?: string;
    password?:string
}

export interface AuthResponse {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  token?: string;
  instituteId?: number;
  role?: string;
  roleName?: string;
  associationId?: number;
  instituteName?: string;
  startTime?: string;
  endTime?: string;
  profilePic?: string;
  instituteLogoUrl?: string;
}

export interface Login{
    email?: string;
    password?: string;
}

export interface InstituteSaveResponse {
  id?: number
  name?: string
  phone?: string
  email?: string
  address?: string
  token?: string
  instituteBranchId?: number
}

export interface SetPassword{
  token?: string;
  password?: string;
  userId?: number;
}

export interface TimeTable {
  id?: number;
  breakIntervalFrom?: string;
  breakIntervalTo?: string;
  breakDuration?: string;
  associationId?: number;
  associationName?: string;
  periodStartTime?: string;
  periodDuration?: string;
  periods?: Period[];
}

export interface TeacherStudentTimeTable {
  id?: number;
  teacherName?: string;
  periodStartTime?: string;
  periodEndTime?: string;
  associationName?: string;
  day?: string;
  subject?: string;
  color?: string;
}

export interface Period {
  intervalFrom?: string;
  intervalTo?: string;
  periodName?: string;
  isBreak?: boolean;
  subjectId?: number;
  userId?: number;
  day?: string;
  color?: string;
  subjectName?: string;
  teacherName?: string;
  associationName?:string
  associationId?:number
}

export interface SubmittedAssignmentStudentList {
  userId: number
  studentId: string
  name: string
  email: string
  phone: string
}

export interface TeacherAttendence {
  id?: number;
  userId?: number;
  checkInTime?: string;
  date?: string;
  checkOutTime?: string;
}

export interface AttendanceStatus {
  id?: number;
  date?: string;
  logStatus?: string;
  status?: string;
  diffrence?: string;
}

export interface CheckInTimeStamps{
  status?: string;
  dateTime?: string;
}

export interface CheckInOutResponse {
  time?: string;
  diffrence?: string;
  requestTime?: string;
}

export interface AssignmentRemainingStudent {
  remainingStudent?: number;
}