import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Course, Department, InstituteBranchCourseDepartmentMapping } from 'src/app/core/api-models/institute-model';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';

@Component({
  selector: 'app-add-department-course-template',
  templateUrl: './add-department-course-template.component.html',
  styleUrls: ['./add-department-course-template.component.scss']
})
export class AddDepartmentCourseTemplateComponent implements OnInit {
  isDepartment = false;
  status: string = 'Add';
  model: any = {};
  dropDownPlaceholder = '';
  isOnlyBranchMapping = false;
  defaultLinkedBranchCourseDept: InstituteBranchCourseDepartmentMapping[] = [];
  allLinkedBranchCourseDept: InstituteBranchCourseDepartmentMapping[] = [];
  uniqueBranches: { id?: number; name?: string }[] = [];
  uniqueBranchesClone: { id?: number; name?: string }[] = [];
  currentDropDownItems: { id?: number; name?: string; mappingId?: number }[] = [];
  selectedItemMappingIds: number[] = [];
  selectedBranchId: number | null = null;
  linkedBranchCourseDepartment: {
    instituteBranchId?: number;
    instituteBranchName?: string;
    linkedCourseDepartments?: {
      id?: number;
      name?: string;
      mappingId?: number;
    }[];
  }[] = [];
  isDropDownVisible = false;
  editLinkedCourseDepartments: {
    id?: number;
    name?: string;
    mappingId?: number;
  }[] = [];

  @ViewChild('courseDeptForm') courseDeptForm?: any;
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<AddDepartmentCourseTemplateComponent>, @Inject(MAT_DIALOG_DATA) public details: { id: number, type: string },
    private toastr: ToastrService, private instituteService: InstituteService) { }

  ngOnInit() {
    this.isDepartment = this.details.type == "DEPARTMENT";
    if (this.isDepartment) {
      this.dropDownPlaceholder = "Courses";
    } else {
      this.dropDownPlaceholder = "Departments";
    }

    // get all linking
    this.callGetAllLinking();

    // get default linking
    this.callDefaultLinking();

    // get All branch;
    this.callGetAllBranch();
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

  callGetAllBranch() {
    const sub = this.instituteService.getBranches().subscribe(res => {
      if (res) {
        if (res.code === 200) {
          let branches = res.data;
          branches.forEach(branch => {
            let idx = this.uniqueBranches.findIndex(x => x.id === branch.id);
            if (idx < 0) {
              this.uniqueBranches.push({
                id: branch.id,
                name: branch.name
              });
            }
          })
        }
      }
      sub.unsubscribe();
    });
  }

  callGetCourseById() {
    const sub = this.instituteService.getCourseById(this.details.id).subscribe(res => {
      if (res.code == 200) {
        // this.model = res.data;
        // if (this.model.instituteBranchCourseDepartmentMapping && this.model.instituteBranchCourseDepartmentMapping.length > 0) {
        //   // single branch was linked.
        //   if (this.model.instituteBranchCourseDepartmentMapping.length == 1 && this.model.instituteBranchCourseDepartmentMapping[0].departmentId == null) {
        //     this.selectedBranchId = this.model.instituteBranchCourseDepartmentMapping[0].instituteBranchId;
        //   }
        //   // multiple linking was done.
        //   else {
        //     let mapping: InstituteBranchCourseDepartmentMapping[] = this.model.instituteBranchCourseDepartmentMapping;
        //     mapping.forEach(link => {
        //       let linkedIdx = this.linkedBranchCourseDepartment.findIndex(x => x.instituteBranchId == link.instituteBranchId);
        //       if (linkedIdx == -1) {
        //         this.linkedBranchCourseDepartment.push({
        //           instituteBranchId: link.instituteBranchId,
        //           instituteBranchName: link.instituteBranchName,
        //           linkedCourseDepartments: [{
        //             id: link.departmentId,
        //             name: link.departmentName,
        //             mappingId: link.id
        //           }]
        //         });
        //       } else {
        //         this.linkedBranchCourseDepartment[linkedIdx].linkedCourseDepartments!.push({
        //           id: link.departmentId,
        //           name: link.departmentName,
        //           mappingId: link.id
        //         });
        //       }
        //     })
        //   }
        // }

        this.model = res.data;
        if (this.model.instituteBranchCourseDepartmentMapping.length > 0) {
          this.selectedBranchId = this.model.instituteBranchCourseDepartmentMapping[0].instituteBranchId!;
          let preSelectedItemIds: number[] = this.model.instituteBranchCourseDepartmentMapping.filter((mapping: InstituteBranchCourseDepartmentMapping) => mapping.departmentId != undefined && mapping.departmentId != null).map((map: InstituteBranchCourseDepartmentMapping) => map.id);
          this.onBranchSelected(preSelectedItemIds);
        }
      } else {
        this.toastr.error(res.message);
      }

      sub.unsubscribe();
    });
  }

  callGetDepartmentById() {
    const sub = this.instituteService.getDepartmentById(this.details.id).subscribe(res => {
      if (res.code == 200) {
        // this.model = res.data;
        // if (this.model.instituteBranchCourseDepartmentMapping && this.model.instituteBranchCourseDepartmentMapping.length > 0) {
        //   // single branch was linked.
        //   if (this.model.instituteBranchCourseDepartmentMapping.length == 1 && this.model.instituteBranchCourseDepartmentMapping[0].courseId == null) {
        //     this.selectedBranchId = this.model.instituteBranchCourseDepartmentMapping[0].instituteBranchId;
        //   }
        //   // multiple linking was done.
        //   else {
        //     let mapping: InstituteBranchCourseDepartmentMapping[] = this.model.instituteBranchCourseDepartmentMapping;
        //     mapping.forEach(link => {
        //       let linkedIdx = this.linkedBranchCourseDepartment.findIndex(x => x.instituteBranchId == link.instituteBranchId);
        //       if (linkedIdx == -1) {
        //         this.linkedBranchCourseDepartment.push({
        //           instituteBranchId: link.instituteBranchId,
        //           instituteBranchName: link.instituteBranchName,
        //           linkedCourseDepartments: [{
        //             id: link.courseId,
        //             name: link.courseName,
        //             mappingId: link.id
        //           }]
        //         });
        //       } else {
        //         this.linkedBranchCourseDepartment[linkedIdx].linkedCourseDepartments!.push({
        //           id: link.courseId,
        //           name: link.courseName,
        //           mappingId: link.id
        //         });
        //       }
        //     })
        //   }
        // }

        this.model = res.data;
        if (this.model.instituteBranchCourseDepartmentMapping.length > 0) {
          this.selectedBranchId = this.model.instituteBranchCourseDepartmentMapping[0].instituteBranchId!;
          let preSelectedItemIds: number[] = this.model.instituteBranchCourseDepartmentMapping.filter((mapping: InstituteBranchCourseDepartmentMapping) => mapping.courseId != undefined && mapping.courseId != null).map((map: InstituteBranchCourseDepartmentMapping) => map.id);
          this.onBranchSelected(preSelectedItemIds);
        }

      } else {
        this.toastr.error(res.message);
      }

      sub.unsubscribe();
    })
  }

  callDefaultLinking() {
    const defaultSub = this.instituteService.getLinkedInstituteBranchCourseDepartment(true).subscribe(res => {
      if (res) {
        if (res.code === 200) {
          this.defaultLinkedBranchCourseDept.push(...res.data);

          // Only default branch is present at the backend or user is creating course/dept after creating a branch.
          if (this.uniqueBranches.length == 0) {
            this.defaultLinkedBranchCourseDept.forEach(link => {
              if (this.isDepartment) {
                if (link.courseId != null) {
                  this.currentDropDownItems.push({
                    id: link.courseId,
                    name: link.courseName,
                    mappingId: link.id
                  });
                }
              } else {
                if (link.departmentId != null) {
                  this.currentDropDownItems.push({
                    id: link.departmentId,
                    name: link.departmentName,
                    mappingId: link.id
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

  callGetAllLinking() {
    const allSub = this.instituteService.getLinkedInstituteBranchCourseDepartment(false).subscribe(res => {
      if (res) {
        if (res.code === 200) {
          this.allLinkedBranchCourseDept.push(...res.data);
          res.data.forEach(branch => {
            const branchIdx = this.uniqueBranches.findIndex(x => x.id === branch.instituteBranchId);
            const linkedBranchIdx = this.linkedBranchCourseDepartment.findIndex(x => x.instituteBranchId == branch.instituteBranchId);
            if (branchIdx < 0 && linkedBranchIdx < 0) { // TODO: && linkedBranchIdx < 0 to remove branches that are already linked in edit.
              this.uniqueBranches.push({
                id: branch.instituteBranchId,
                name: branch.instituteBranchName
              });
            }

            this.uniqueBranchesClone.push({
              id: branch.instituteBranchId,
              name: branch.instituteBranchName
            });
          });
        } else {
          this.toastr.error(res.message);
        }
      }
      this.callGetById();
      allSub.unsubscribe();
    });
  }

  close() {
    this.dialogRef.close();
  }

  onBranchSelected(preSelectedItemIds?: number[]) {
    this.currentDropDownItems = [];
    this.selectedItemMappingIds = [];
    this.allLinkedBranchCourseDept.forEach(link => {
      if (link.instituteBranchId == this.selectedBranchId) {
        if (this.isDepartment) {
          const courseIdx = this.currentDropDownItems.findIndex(x => x.id == link.courseId);
          if (link.courseId != undefined && link.courseId != null && courseIdx == -1) {
            this.currentDropDownItems.push({
              id: link.courseId,
              name: link.courseName,
              mappingId: link.id
            });
          }
        } else {
          const deptIdx = this.currentDropDownItems.findIndex(x => x.id == link.departmentId);
          if (link.departmentId != undefined && link.departmentId != null && deptIdx == -1) {
            this.currentDropDownItems.push({
              id: link.departmentId,
              name: link.departmentName,
              mappingId: link.id
            });
          }
        }
      }
    });
    this.defaultLinkedBranchCourseDept.forEach(link => {
      if (this.isDepartment) {
        const courseIdx = this.currentDropDownItems.findIndex(x => x.id == link.courseId);
        if (link.courseId != null && courseIdx == -1) {
          this.currentDropDownItems.push({
            id: link.courseId,
            name: link.courseName,
            mappingId: link.id
          });
        }
      } else {
        const deptIdx = this.currentDropDownItems.findIndex(x => x.id == link.departmentId);
        if (link.departmentId != null && deptIdx == -1) {
          this.currentDropDownItems.push({
            id: link.departmentId,
            name: link.departmentName,
            mappingId: link.id
          });
        }
      }
    });
    if (preSelectedItemIds) {
      this.selectedItemMappingIds = preSelectedItemIds;
    }
  }

  handleAddLinking() {
    let branch: { instituteBranchId?: number; instituteBranchName?: string } = {};
    let foundBranch = this.allLinkedBranchCourseDept.find(x => x.instituteBranchId == this.selectedBranchId);
    if (foundBranch) {
      branch = { ...foundBranch };
    } else {
      const tempFoundBranch = this.defaultLinkedBranchCourseDept.find(x => x.instituteBranchId == this.selectedBranchId);
      if (tempFoundBranch) {
        branch = { ...tempFoundBranch };
      }
    }

    let linkedCourseDepartments: { id?: number; name: string; mappingId?: number }[] = [];
    this.selectedItemMappingIds.forEach(id => {
      let idx = this.editLinkedCourseDepartments.findIndex(x => x.id === id);
      // linkedCourseDepartments.push({
      //   id: id,
      //   name: this.getNameById(id),
      //   mappingId: idx >= 0 ? this.editLinkedCourseDepartments[idx].mappingId : undefined
      // })
    })

    this.linkedBranchCourseDepartment.push({
      instituteBranchId: branch.instituteBranchId,
      instituteBranchName: branch.instituteBranchName,
      linkedCourseDepartments: linkedCourseDepartments
    });

    this.selectedBranchId = null;
    this.selectedItemMappingIds = [];
  }

  getNameById(id: number) {
    let name = "";
    this.allLinkedBranchCourseDept.forEach(x => {
      if (this.isDepartment) {
        if (x.courseId == id) {
          name = x.courseName!;
        }
      } else {
        if (x.departmentId == id) {
          name = x.departmentName!;
        }
      }
    });
    return name;
  }

  removeCourse(idx: number) {
    this.selectedItemMappingIds.splice(idx, 1)
  }

  getLinkedCourseDepartment(idx: number) {
    let names: string[] = [];
    this.linkedBranchCourseDepartment[idx].linkedCourseDepartments?.forEach(x => x.name && names.push(x.name));
    return names.join(',');
  }

  handleDeleteLinking(idx: number) {
    this.linkedBranchCourseDepartment.splice(idx, 1);
  }

  handleEditLinking(idx: number) {
    if (this.linkedBranchCourseDepartment[idx].instituteBranchId) {
      this.selectedBranchId = this.linkedBranchCourseDepartment[idx].instituteBranchId!
      this.editLinkedCourseDepartments = this.linkedBranchCourseDepartment[idx].linkedCourseDepartments ?? [];
      // this.onBranchSelected(this.linkedBranchCourseDepartment[idx].linkedCourseDepartments?.map(x => x.id!));
    }
    this.linkedBranchCourseDepartment.splice(idx, 1);
  }

  getUniqueBranches() {
    return this.uniqueBranches.filter(branch => this.linkedBranchCourseDepartment.findIndex(mapping => mapping.instituteBranchId === branch.id) < 0);
  }

  onSubmit() {
    this.courseDeptForm.control.markAllAsTouched();
    if (!this.courseDeptForm.valid) {
      return;
    }

    // if (this.selectedBranchId && this.selectedBranchId > 0 && this.selectedItemIds.length > 0) {
    //   this.toastr.error("Please confirm the linking first.");
    //   return;
    // }
    const mappings: InstituteBranchCourseDepartmentMapping[] = [];

    //// OLD LOGIC
    // // only branch and dept/course is selected
    // if (this.linkedBranchCourseDepartment.length > 0) {
    //   this.linkedBranchCourseDepartment.forEach(link => {
    //     if (link.linkedCourseDepartments && link.linkedCourseDepartments.length > 0) {
    //       link.linkedCourseDepartments.forEach(courseDept => {
    //         if (this.isDepartment) {
    //           mappings.push({
    //             instituteBranchId: link.instituteBranchId,
    //             courseId: courseDept.id,
    //             id: courseDept.mappingId
    //           });
    //         } else {
    //           mappings.push({
    //             instituteBranchId: link.instituteBranchId,
    //             departmentId: courseDept.id,
    //             id: courseDept.mappingId
    //           });
    //         }
    //       })
    //     }
    //   });
    // }
    // // only dept/course is selected
    // else if (this.linkedBranchCourseDepartment.length == 0 && this.selectedItemIds.length > 0) {
    //   this.selectedItemIds.forEach(id => {
    //     if (this.isDepartment) {
    //       mappings.push({
    //         courseId: id
    //       });
    //     } else {
    //       mappings.push({
    //         departmentId: id
    //       });
    //     }
    //   })
    // }
    // // only branch is selected
    // else if (this.selectedBranchId != null && this.selectedBranchId > 0) {
    //   mappings.push({
    //     instituteBranchId: this.selectedBranchId!
    //   })
    // }

    //// NEW LOGIC
    if (this.selectedItemMappingIds.length > 0) {
      this.selectedItemMappingIds.forEach(mappingId => {
        let idx = this.currentDropDownItems.findIndex(x => x.mappingId == mappingId);
        if (idx >= 0) {
          mappings.push({
            id: mappingId,
            courseId: this.isDepartment ? this.currentDropDownItems[idx].id : undefined,
            departmentId: !this.isDepartment ? this.currentDropDownItems[idx].id : undefined,
            instituteBranchId: this.selectedBranchId ? this.selectedBranchId : undefined
          });
        }
      });
    } else if (this.selectedBranchId) {
      mappings.push({
        id: undefined,
        instituteBranchId: this.selectedBranchId
      });
    }

    if (this.isDepartment) {
      const dept: Department = {
        code: this.model.code,
        name: this.model.name,
        // add hodId
        instituteBranchCourseDepartmentMapping: mappings
      }
      if (this.details.id) {
        dept.id = this.details.id;
        const sub = this.instituteService.updateDepartment(dept).subscribe(res => {
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
        const sub = this.instituteService.saveDepartment(dept).subscribe(res => {
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
      const course: Course = {
        code: this.model.code,
        name: this.model.name,
        duration: this.model.duration,
        instituteBranchCourseDepartmentMapping: mappings
      }

      if (this.details.id) {
        course.id = this.details.id;
        const sub = this.instituteService.upadteCourse(course).subscribe(res => {
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
        const sub = this.instituteService.saveCourse(course).subscribe(res => {
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
