import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthResponse } from 'src/app/core/api-models/auth-model';
import { UserPermission, UserRolePermission } from 'src/app/core/api-models/user-model';
import { GeneralService } from 'src/app/core/api-services/common/general.service';
import { UserService } from 'src/app/core/api-services/user/user.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  drawerItems: Array<any> = [];
  base = 'dashboard';
  currentRoute = '';
  userPermissions: UserRolePermission = {};
  baseModuleMap: Map<string, string> = new Map();
  user: AuthResponse = {};

  constructor(public router: Router, private userService: UserService, private toastr: ToastrService,
    private generalService: GeneralService, private authService: AuthenticationService) {
    this.initSidebar();

    this.drawerItems.forEach(x => {
      this.baseModuleMap.set(x.base, x.base?.toUpperCase());
    });
  }

  ngOnInit() {
    this.userService.getUserPermission().subscribe(res => {
      if (res) {
        if (res.code === 200) {
          if (res.data.userPermissionResponse) {
            this.userPermissions = res.data;
            this.authService.role = res.data.role!;
            this.authService.userId! = res.data.userPermissionResponse[0].userId!.toString()
          }
        } else {
          this.toastr.error(res.message);
        }
      }
    });
    this.currentRoute = this.router.url;
    const sub = this.generalService.getCurrentUserDetails().subscribe(res => {
      this.user = res.data
      sub.unsubscribe();
    });
    this.base = this.drawerItems.find(x => this.currentRoute.includes(x.routeLink))?.base ?? 'dashboard';
  }

  initSidebar() {
    this.drawerItems = [
      {
        routeLink: 'dashboard/',
        icon: 'fa-solid fa-gauge',
        title: 'Dashboard',
        base: 'dashboard',
        isActive: false,
      },
      // {
      //   icon: 'fas fa-building',
      //   title: 'Departments',
      //   isActive: true,
      //   isSubMenuVisible: false,
      //   base: 'department',
      //   subMenu: [
      //     {
      //       routeLink: 'institute/details',
      //       title: 'Department List',
      //       base: 'departmentList',
      //       isActive: false,
      //     },
      //     {
      //       routeLink: '/institute/department/add',
      //       title: 'Department Add',
      //       base: 'departmentAdd',
      //       isActive: false
      //     },
      //     {
      //       title: 'Department Edit',
      //       base: 'departmentEdit',
      //       isActive: false
      //     },
      //   ]
      // },
      {
        routeLink: 'institute/details',
        icon: 'fa-solid fa-school',
        title: 'Institute',
        base: 'institute',
        isActive: false
      },
      // {
      //   routeLink: 'institute/branch',
      //   icon: 'fa-solid fa-code-branch',
      //   title: 'Branch',
      //   base: 'institute_branch',
      //   isActive: false
      // },
      // {
      //   routeLink: 'institute/course',
      //   icon: 'fa-solid fa-book',
      //   title: 'Course',
      //   base: 'course',
      //   isActive: false
      // },
      // {
      //   routeLink: 'institute/department',
      //   icon: 'fas fa-building',
      //   title: 'Department',
      //   base: 'department',
      //   isActive: false
      // },
      {
        routeLink: 'user/teacher',
        icon: 'fa-solid fa-chalkboard-user',
        title: 'Teachers',
        base: 'teacher_invitation',
        isActive: false
      },
      {
        routeLink: 'user/student',
        icon: 'fa-solid fa-graduation-cap',
        title: 'Students',
        base: 'student_invitation',
        isActive: false
      },
      {
        routeLink: 'class/association',
        icon: 'fa-solid fa-user-group',
        title: 'Class',
        base: 'association',
        isActive: false
      },
      {
        routeLink: 'institute/attendence',
        icon: 'fas fa-file-lines',
        title: 'Attendance',
        base: 'attendance',
        isActive: false
      },
      {
        routeLink: 'class/subject',
        icon: 'fa-solid fa-book',
        title: 'Subject',
        base: 'subject',
        isActive: false
      },
      {
        routeLink: 'class/chapter',
        icon: 'fa-solid fa-book-open',
        title: 'Chapter',
        base: 'chapter',
        isActive: false
      },
      {
        routeLink: 'class/student-attendance',
        icon: 'fa-solid fa-table-cells',
        title: 'Mark Attendance',
        base: 'mark_attendance',
        isActive: false
      },
      {
        routeLink: 'class/notes',
        icon: 'fas fa-file-lines',
        title: 'Notes',
        base: 'note',
        isActive: false
      },
      {
        routeLink: 'class/assignment',
        icon: 'fa-solid fa-circle-question',
        title: 'Assignment',
        base: 'assignment',
        isActive: false
      },
      // {
      //   routeLink: 'class/syllabus',
      //   icon: 'fa-solid fa-book',
      //   title: 'Syllabus',
      //   base: 'syllabus',
      //   isActive: false
      // },
      {
        routeLink: 'institute/time-table',
        icon: 'fa-solid fa-table',
        title: 'Time Table',
        base: 'time_table',
        isActive: false
      },
      {
        routeLink: 'institute/holiday',
        icon: 'fa-solid fa-calendar-days',
        title: 'Holiday',
        base: 'holiday',
        isActive: false
      },
      {
        routeLink: 'institute/announcement',
        icon: 'fa-solid fa-scroll',
        title: 'Announcement',
        base: 'announcement',
        isActive: false
      },
      // {
      //   routeLink: 'institute/fees',
      //   icon: 'fa-solid fa-file-invoice',
      //   title: 'Fee',
      //   base: 'fee',
      //   isActive: false
      // },
      {
        routeLink: 'institute/grading',
        icon: 'fa-solid fa-a',
        title: 'Grade',
        base: 'exam_grade',
        isActive: false
      },
      {
        routeLink: 'class/exam',
        icon: 'fa-solid fa-clipboard',
        title: 'Exam',
        base: 'exam_schedule',
        isActive: false
      },
      {
        routeLink: 'class/exam-result',
        icon: 'fa-solid fa-square-poll-vertical',
        title: 'Exam Result',
        base: 'exam-result',
        isActive: false
      },
    ];
  }

  handleMenuClick(drawerItemIndex: number) {
    let item = this.drawerItems[drawerItemIndex];
    item.isSubMenuVisible = !item.isSubMenuVisible;
    this.drawerItems.splice(drawerItemIndex, 1, item);

    this.base = this.drawerItems[drawerItemIndex].base;
  }

  showLetter() {

  }

  userIsPermitted(drawerItemBase: string) {
    const module = this.baseModuleMap.get(drawerItemBase);

    if (module && this.userPermissions.userPermissionResponse) {
      const idx = this.userPermissions.userPermissionResponse!.findIndex(x => x.moduleName?.trim() === module.trim());
      if (idx >= 0) {
        return this.userPermissions.userPermissionResponse![idx].canView;
      }
      if (module === "INSTITUTE" && this.userPermissions.role === "INSTITUTE_ADMIN") {
        return true;
      }
      if (module === "DASHBOARD") {
        return true;
      }
      if (module === "TIME_TABLE") {
        return true;
      }
    }
    return false;
  }
}
