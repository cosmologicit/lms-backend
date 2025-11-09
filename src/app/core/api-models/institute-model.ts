export interface InstituteDetails {
  id?: number;
  name?: string
  code?: string
  phone?: string
  email?: string
  website?: string
  accreditationStatus?: string
  affiliation?: string
  description?: string
  session?: string
  branches?: Branch[];
  logoUrl?: string;
  startTiming?: string;
  endTiming?: string;
}


export interface Branch {
  id?: number;
  name?: string;
  address?: string;
  pincode?: string;
  stateId?: number;
  country?: string;
  phone?: string;
  code?: string;
  website?: string;
  description?: string;
  session?: string;
  updateDefaultBranch?: boolean
}

export interface Department {
  id?: number;
  name?: string;
  hodId?: number;
  code?: string;
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

export interface Course {
  id?: number;
  name?: string;
  code?: string;
  duration?: number;
  instituteBranchCourseDepartmentMapping?: InstituteBranchCourseDepartmentMapping[];
}

export interface Holiday {
  id?: number;
  title?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  instituteId?: number;
  color?: string;
}

export interface Books {
  id?: number;
  name?: string;
  bookNo?: string;
  publisher?: string;
  author?: string;
  rackNo?: string;
  quantity?: string;
  available?: string;
  price?: string;
  postDate?: string;
  instituteId?: number;
}

export interface Announcement {
  id?: number
  title?: string
  description?: string
  associationIds?: Array<number>
  color?: string;
}

export interface Fees {
  id?: number;
  name?: string;
  fatherName?: string;
  examinationFee?: number;
  associationName?: string;
  associationId?: number;
  libraryFee?: number;
  admissionFee?: number;
  activityFee?: number;
  computerFee?: number;
  hostelFee?: number;
  tuitionFee?: number;
  transportFee?: number;
  duesFee?: number;
  otherFee?: number;
  date?: string;
  academicYear?: string;
  userId?: number;
  status?: string;
  totalFee?: number;
}

export interface Workingdays{
  id?: number;
  dayOfWeek?: string;
  workingDay?: boolean;
}

export interface Grading {
  id?: number;
  name?: string;
  minMarks?: number;
  maxMarks?: number;
  description?: string;
  examStatus?: string;
}
