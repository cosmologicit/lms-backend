export interface Student {
  id?: number;
  userId?: number;
  name?: string;
  doa?: string;
  associationName?: string;
  email?: string;
  phone?: string;
  aadhar?: string;
  fatherName?: string;
  fatherEmail?: string;
  fatherPhone?: string;
  fatherOccupation?: string;
  motherEmail?: string;
  motherPhone?: string;
  motherOccupation?: string;
  guardianName?: string;
  guardianEmail?: string;
  guardianPhone?: string;
  guardianOccupation?: string;
  guardianRelation?: string;
  guardianAddress?: string;
  motherName?: string;
  dob?: string;
  gender?: string;
  permanentAddress?: string;
  currentAddress?: string;
  batch?: string;
  courseCode?: string;
  semester?: string;
  rollNo?: string;
  registrationNumber?: string;
  password?: string;
  secondaryEmail?: string;
  lateralEntry?: boolean;
  instituteBranchId?: number;
  courseId?: number;
  departmentId?: number;
  associationId?: number;
  studentId?: string;
  photoUrl?: string;
  isLinked?: boolean;
  isPresent?: boolean;
  isAbsent?: boolean;
  isLeave?: boolean;
  isHoliday?: boolean;
  comment?: string;
}

export interface Teacher {
  id?: number;
  name?: string;
  teacherId?: string;
  doj?: string;
  fatherName?: string;
  motherName?: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  address?: string;
  permanentAddress?: string;
  qualification?: string;
  workExperience?: string;
  previousSchool?: string;
  previousSchoolAddress?: string;
  govtId?: string;
  description?: string;
  password?: string;
  reportingTo?: string;
  photoUrl?: string;
  instituteBranchId?: number;
  courseId?: number;
  departmentId?: number;
  maritalStatus?: string;
  isDeleted?: boolean;
  associationName?: string
}

export interface UserRolePermission {
  role?: string;
  userPermissionResponse?: UserPermission[];
}

export interface UserPermission {
  userId?: number;
  moduleId?: number;
  moduleName?: string;
  instituteBranchId?: number;
  canCreate?: boolean;
  canDelete?: boolean;
  canEdit?: boolean;
  canView?: boolean;
  canShare?: boolean;
}

export interface LinkStudentWithClass {
  associationId?: number;
  studentDetailId?: number[];
  isLinked?: boolean;
}

export interface Attendance {
  id?: number;
  associationId?: number;
  date?: string;

  studentStatusRequests?: StudentStatusRequest[];
}

export interface StudentStatusRequest {
  studentDetailId?: number;
  attendanceStatus?: string;
  comment?: string;
}