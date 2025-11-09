export const ApiUrl = {
    //auth
    signup: 'auth/signup',
    login: 'auth/login',
    forgotpassword: 'auth/forgot-password',
    setPassword: 'auth/set-password',
    userSetPassword: 'user/set-password',


    //institute
    saveInstituteDetails: 'institute/save',
    getInstituteDetails: 'institute/get/detail',
    updateInstituteDetails: 'institute/update',
    saveWorkingDays: 'institute/update/workingDays',
    getWorkingDays:'institute/getWorkingDays',


    //branch
    saveBranch: 'institute-branch/save',
    getBranches: 'institute-branch/getAll',
    getBranchById: 'institute-branch/',
    updateBranch: 'institute-branch/update',
    deleteBranch: 'institute-branch/',


    //department
    saveDepartment: 'department/save',
    getDepartments: 'department/getAll',
    getDepartmentById: 'department/',
    updateDepartment: 'department/update',
    deleteDepartment: 'department/',


    //course
    deleteCourse: 'course/',
    saveCourse: 'course/save',
    getCourses: 'course/getAll',
    getCourseById: 'course/',
    upadteCourse: 'course/update',

    //fees
    saveFeesDeatils: 'fee/save',
    getFeeDetails: 'fee/getAll',
    getFeesById: 'fee/',
    updateFeesDeatils: 'fee/update',
    deleteFees:'fee/',

    //teacher
    saveTeacher: 'user/invite-teacher',
    updateTeacher:'user/update-teacher',
    getTeachers: 'user/teachers',
    getTeacherById: 'user/teacher/',
    // getStudents: 'user/students',


    //student
    saveStudent: 'user/invite-student',
    getStudents: 'user/students',
    updateStudent:'user/update-student',
    deleteUser: 'user/',
    getStudentById: 'user/student/',
    getMapStudentAssoction: 'map/student-associations?associationId=',
    getStudentsByAssociationId:'generic/student/getAll/',
 
    
    //assignment
    saveAssignment: 'assignment/save',
    getAllAssignment: 'assignment/getAll',
    getAssignmentByDate:'dashboard/get-assignment-by-date?startDate=',
    getAssignmentById: 'assignment/get/',
    updateAssignment: 'assignment/update',
    deleteAssignment: 'assignment/delete/',
    submitAssignment: 'assignment/submit',
    getSubmittedAssignmentById: 'assignment/submission/',
    getSubmitAssignmentStudents: 'assignment/users/',
    getAssignmnetRemainingStudents:'assignment/remainingStudent/',
    getAssignmentByStudentAndAssignmentId: 'assignment/submission/student/',
    examineAssignment: 'assignment/fill-subjective-marks',
    
    //exam
    saveExam: 'exam-schedule/save',
    updateExam: 'exam-schedule/update',
    getAllExam: 'exam-schedule/all',
    getExamById: 'exam-schedule/',
    deleteExam: 'exam-schedule/',
    getSubmittedExams: 'exam-result/getAll?examScheduleId=',
    submitExamNumbers:'exam-result/saveOrUpdate',
    
    //syllabus
    saveSyllabus:'syllabus/save',
    updateSyllabus: 'syllabus/update',
    getSyllabusById: 'syllabus/',
    getAllSyllabus: 'syllabus/getAll',
    deleteSyllabus:'syllabus/',

    //association
    saveAssociation: 'association/save',
    getAllClasses: 'association/getAll',
    getClasseById: 'association/',
    getAssociationDetailsById:'dashboard/get-association-details?associationId=',
    updateAssociation: 'association/update',
    deleteClass: 'association/delete/',


    //subject
    saveSubject: 'subject/save',
    getAllSubject: 'subject/getAll',
    getSubjectById: 'subject/',
    getSubjectByAssociationId: 'subject/',
    updateSubject: 'subject/update',
    deleteSubject: 'subject/',

    //chapter
    saveChapter: 'chapter/save',
    getAllChapters: 'chapter/getAll',
    getChapterById: 'chapter/',
    updateChapter: 'chapter/update',
    deleteChapter: 'chapter/',

    
    //books
    saveBook: 'book/save',
    upadteBook: 'book/update',
    getBookDetailById: 'book/',
    getBooksDetails:'book',

    //notes
    saveNotes: 'notes/upload',
    getAllNotes: 'notes/getAll',
    getNotesById: 'notes/',
    deleteNotes: 'notes/',
    

    // time table 
    saveTimeTable: 'timetable/save',
    getTimeTables: 'timetable/all',
    getTimeTableByUserId:'timetable/get-time-table-by-user-id/',
    getTodayTimeTable:'dashboard/get-today-timetable',
    getTimeTableById: 'timetable/',
    updateTimeTable: 'timetable/update',
    geTimeTableForStudentAndTeacher:'timetable/',
    

    //holiday
    saveHoliday: 'holiday/save',
    updateHoliday: 'holiday/update',
    getHolidays: 'holiday/getAll',
    getHolidaysByDate:'dashboard/get-holiday-by-date?startDate=',
    getHolidayById:'holiday/',
    deleteHoliday: 'holiday/',


    //anouncement
    saveAnnoucement: 'announcement/save',
    updateAnnouncement: 'announcement/update',
    getAnnouncementById: 'announcement/',
    getAnnouncemnets: 'announcement/all',
    getAnnouncemnetsByDate:'dashboard/get-announcement-by-date?startDate=',
    deleteAnnouncemnet:'announcement/',

    //general
    getStates: 'generic/state/getAll',
    getCurrentUserDetails: 'auth/user/detail',
    checkDefaultMapping: 'generic/branch/check-default-mapping',
    getLinkedInstituteBranchCourseDepartment: 'generic/getAll/institute-branch-course-department',
    userPermission: 'permission/user',
    attendanceUpdateStatus: 'attendance/update-status?status=',
    getAttendanceLastStatus: 'attendance/last-status',
    getQuotes: 'dashboard/get-quotes',
    getClassAttendanceInformation:'generic/student-information?associationId=',

    //attendence
    saveAttendence: 'attendance/save-attendance',
    updateAttendence: 'attendence/update-attendence',
    getTodayAttendance: 'attendance/get-today-attendance-by-association?associationId=',
    getAttendanceByClassAndDate: 'attendance/get-class-attendance-by-date?associationId=',
    updateAttendance: 'attendance/student-attendance-update',
    
    //grades
    getGrades: 'grading/all',
    getGradeById: 'grading/',
    updateGrade: 'grading/update',
    saveGrade: 'grading/save',
    deleteGrade: 'grading/',
    

    // mapping 
    linkUnlinkStudentWithAssociation: 'map/student-association',
    getTeacherAttendenceById: 'attendance/detailsByUser?teacherId=',
    getStudentAttendenceById:'attendance/student-attendance-by-date?studentId='
}