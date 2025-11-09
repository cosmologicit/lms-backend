import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Branch, InstituteBranchCourseDepartmentMapping } from 'src/app/core/api-models/institute-model';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';

@Component({
  selector: 'app-add-department-course-template-v2',
  templateUrl: './add-department-course-template-v2.component.html',
  styleUrls: ['./add-department-course-template-v2.component.scss']
})
export class AddDepartmentCourseTemplateV2Component implements OnInit {
  isDepartment = false;
  status: string = 'Add';
  model: any = {};
  selectedBranchId?: number;
  branches: Array<Branch> = [];
  dropDownPlaceholder = '';
  allMapping: InstituteBranchCourseDepartmentMapping[] = [];
  defaultMapping: InstituteBranchCourseDepartmentMapping[] = [];
  courseDeptDropDown: { id?: number; name?: string; }[] = [];
  selectedItemIds: number[] = [];

  @ViewChild('courseDeptForm') courseDeptForm?: any;
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<AddDepartmentCourseTemplateV2Component>, @Inject(MAT_DIALOG_DATA) public details: { id: number, type: string },
    private toastr: ToastrService, private instituteService: InstituteService) { }

  ngOnInit(): void {
    this.isDepartment = this.details.type == "DEPARTMENT";
    if (this.isDepartment) {
      this.dropDownPlaceholder = "Courses";
    } else {
      this.dropDownPlaceholder = "Departments";
    }

    // get All branch;
    this.callGetAllBranch();

    // get All mapping;
    this.callGetAllMapping();

    // get default mapping;
    this.callDefaultMapping();
  }

  callGetById() {
    if (this.details.id) {
      this.status = 'Edit';
      if (this.isDepartment) {
        // get deptById
        this.callGetDepartmentById();
      } else {
        // get courseById
        this.callGetCourseById();
      }
    }
  }

  callGetDepartmentById() {
    const sub = this.instituteService.getDepartmentById(this.details.id).subscribe(res => {
      if (res.code == 200) {
        this.model = res.data;
        if (this.model.instituteBranchCourseDepartmentMapping && this.model.instituteBranchCourseDepartmentMapping.length > 0) {
          this.selectedBranchId = this.model.instituteBranchCourseDepartmentMapping[0].instituteBranchId;
          this.onBranchSelected(this.model.instituteBranchCourseDepartmentMapping);
        }
      } else {
        this.toastr.error(res.message);
      }

      sub.unsubscribe();
    })
  }

  callGetCourseById() {
    const sub = this.instituteService.getCourseById(this.details.id).subscribe(res => {
      if (res.code == 200) {
        this.model = res.data;
        if (this.model.instituteBranchCourseDepartmentMapping && this.model.instituteBranchCourseDepartmentMapping.length > 0) {
          this.selectedBranchId = this.model.instituteBranchCourseDepartmentMapping[0].instituteBranchId;
          this.onBranchSelected(this.model.instituteBranchCourseDepartmentMapping);
        }
      } else {
        this.toastr.error(res.message);
      }

      sub.unsubscribe();
    })
  }

  callGetAllBranch() {
    const sub = this.instituteService.getBranches().subscribe(res => {
      if (res) {
        if (res.code === 200) {
          this.branches = res.data;
        }
      }
      sub.unsubscribe();
    });
  }

  callDefaultMapping() {
    const defaultSub = this.instituteService.getLinkedInstituteBranchCourseDepartment(true).subscribe(res => {
      if (res) {
        if (res.code === 200) {
          this.defaultMapping = res.data;

          // Only default branch is present at the backend or user is creating course/dept after creating a branch.
          if (this.branches.length == 0) {
            this.defaultMapping.forEach(link => {
              if (this.isDepartment) {
                if (link.courseId != null) {
                  this.courseDeptDropDown.push({
                    id: link.courseId,
                    name: link.courseName,
                  });
                }
              } else {
                if (link.departmentId != null) {
                  this.courseDeptDropDown.push({
                    id: link.departmentId,
                    name: link.departmentName
                  });
                }
              }
            });
          }
        } else {
          this.toastr.error(res.message);
        }
      }

      defaultSub.unsubscribe();
    });
  }

  callGetAllMapping() {
    const allSub = this.instituteService.getLinkedInstituteBranchCourseDepartment(false).subscribe(res => {
      if (res) {
        if (res.code === 200) {
          this.allMapping = res.data;
        } else {
          this.toastr.error(res.message);
        }
      }

      // call get by Id
      this.callGetById();
      allSub.unsubscribe();
    });
  }

  onBranchSelected(instituteBranchCourseDepartmentMapping?: InstituteBranchCourseDepartmentMapping[]) {
    this.courseDeptDropDown = [];
    this.selectedItemIds = [];

    this.allMapping.forEach(mapping => {
      if (mapping.instituteBranchId == this.selectedBranchId) {
        if (this.isDepartment) {
          const courseIdx = this.courseDeptDropDown.findIndex(x => x.id == mapping.courseId);
          if (courseIdx < 0 && mapping.courseId) {
            this.courseDeptDropDown.push({
              id: mapping.courseId,
              name: mapping.courseName,
            });
          }
        } else {
          const deptIdx = this.courseDeptDropDown.findIndex(x => x.id == mapping.departmentId);
          if (deptIdx < 0 && mapping.departmentId) {
            this.courseDeptDropDown.push({
              id: mapping.departmentId,
              name: mapping.departmentName,
            });
          }
        }
      }
    });

    this.defaultMapping.forEach(mapping => {
      if (mapping.instituteBranchId === this.selectedBranchId) {
        if (this.isDepartment) {
          const courseIdx = this.courseDeptDropDown.findIndex(x => x.id == mapping.courseId);
          if (courseIdx < 0 && mapping.courseId) {
            this.courseDeptDropDown.push({
              id: mapping.courseId,
              name: mapping.courseName,
            });
          }
        } else {
          const deptIdx = this.courseDeptDropDown.findIndex(x => x.id == mapping.departmentId);
          if (deptIdx < 0 && mapping.departmentId) {
            this.courseDeptDropDown.push({
              id: mapping.departmentId,
              name: mapping.departmentName,
            });
          }
        }
      }
    });

    if (instituteBranchCourseDepartmentMapping && instituteBranchCourseDepartmentMapping.length > 0) {
      instituteBranchCourseDepartmentMapping.forEach(x => {
        if (this.isDepartment) {
          x.courseId && this.selectedItemIds.push(x.courseId);
        } else {
          x.departmentId && this.selectedItemIds.push(x.departmentId);
        }
      })
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.courseDeptForm.control.markAllAsTouched();
    if (!this.courseDeptForm.valid) {
      return;
    }

    if (this.isDepartment) {
      if ((this.model?.instituteBranchCourseDepartmentMapping?.length ?? 0) == 0)
        this.model.instituteBranchCourseDepartmentMapping = [];

      let itemsToRemove = this.model.instituteBranchCourseDepartmentMapping
        .filter((x: InstituteBranchCourseDepartmentMapping) => x.courseId && !this.selectedItemIds.includes(x.courseId));

      itemsToRemove.forEach((element: InstituteBranchCourseDepartmentMapping) => {
        let idx = this.model.instituteBranchCourseDepartmentMapping.indexOf(element);
        this.model.instituteBranchCourseDepartmentMapping.splice(idx, 1);
      });
      this.selectedItemIds.forEach(courseDeptId => {
        let item = this.model.instituteBranchCourseDepartmentMapping.find((x: InstituteBranchCourseDepartmentMapping) =>
          x.courseId && x.courseId == courseDeptId);
        if (!item) {
          this.model.instituteBranchCourseDepartmentMapping.push({
            instituteBranchId: this.selectedBranchId,
            courseId: courseDeptId,
          })
        }
      });
    } else {
      if ((this.model?.instituteBranchCourseDepartmentMapping?.length ?? 0) == 0)
        this.model.instituteBranchCourseDepartmentMapping = [];

      let itemsToRemove = this.model.instituteBranchCourseDepartmentMapping
        .filter((x: InstituteBranchCourseDepartmentMapping) => x.departmentId && !this.selectedItemIds.includes(x.departmentId));

      itemsToRemove.forEach((element: InstituteBranchCourseDepartmentMapping) => {
        let idx = this.model.instituteBranchCourseDepartmentMapping.indexOf(element);
        this.model.instituteBranchCourseDepartmentMapping.splice(idx, 1);
      });
      this.selectedItemIds.forEach(courseDeptId => {
        let item = this.model.instituteBranchCourseDepartmentMapping.find((x: InstituteBranchCourseDepartmentMapping) =>
          x.departmentId && x.departmentId == courseDeptId);
        if (!item) {
          this.model.instituteBranchCourseDepartmentMapping.push({
            instituteBranchId: this.selectedBranchId,
            departmentId: courseDeptId,
          })
        }
      });
    }

    if (this.selectedItemIds.length === 0) {
      this.model.instituteBranchCourseDepartmentMapping = [];
      if (this.selectedBranchId) {
        this.model.instituteBranchCourseDepartmentMapping.push({
          instituteBranchId: this.selectedBranchId
        });
      }
    }

    if (this.isDepartment) {
      if (this.details.id) {
        const sub = this.instituteService.updateDepartment(this.model).subscribe(res => {
          if (res.code == 200) {
            this.toastr.success(res.message);
            this.confirmed.emit(true);
            this.close();
          } else {
            this.toastr.error(res.message);
          }

          sub.unsubscribe();
        })
      } else {
        const sub = this.instituteService.saveDepartment(this.model).subscribe(res => {
          if (res.code == 200) {
            this.toastr.success(res.message);
            this.confirmed.emit(true);
            this.close();
          } else {
            this.toastr.error(res.message);
          }

          sub.unsubscribe();
        })
      }
    }
    else {
      if (this.details.id) {
        const sub = this.instituteService.upadteCourse(this.model).subscribe(res => {
          if (res.code == 200) {
            this.toastr.success(res.message);
            this.confirmed.emit(true);
            this.close();
          } else {
            this.toastr.error(res.message);
          }

          sub.unsubscribe();
        })
      } else {
        const sub = this.instituteService.saveCourse(this.model).subscribe(res => {
          if (res.code == 200) {
            this.toastr.success(res.message);
            this.confirmed.emit(true);
            this.close();
          } else {
            this.toastr.error(res.message);
          }

          sub.unsubscribe();
        })
      }
    }
  }
}
