import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Association } from 'src/app/core/api-models/class-model';
import { State } from 'src/app/core/api-models/common-model';
import { Course, Department } from 'src/app/core/api-models/institute-model';
import { Student } from 'src/app/core/api-models/user-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { GeneralService } from 'src/app/core/api-services/common/general.service';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { UserService } from 'src/app/core/api-services/user/user.service';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  status: string = 'Add';
  data: Student = {};
  states: Array<State> = [];
  isBothAddressSame = false;
  dateRanges: string[] = [];
  courses: Array<Course> = [];
  isStudentFormisible = true;
  associations: Array<Association> = [];
  departments: Array<Department> = [];
  profilePic: File | null = null;
  previewProfilePicUrl: string | ArrayBuffer | null = null;

  @Output() confirmed = new EventEmitter<boolean>();
  @ViewChild('studentForm') studentForm?: any;
  constructor(private generalService: GeneralService, private instituteService: InstituteService, private toastr: ToastrService,
    private userService: UserService, private classService: ClassService, private router: Router, private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.router.url.includes("edit")) {
      this.status = "Edit";
    } else if (this.router.url.includes("view")) {
      this.status = "View";
    }
    this.route.paramMap.subscribe(parameterMap => {
      if (parameterMap.get("id")) {
        this.userService.getStudentById(Number(parameterMap.get("id"))).subscribe(res => {
          if (res.code == 200) {
            this.data = res.data;
            if (this.data.associationId) {
              this.data.associationId = undefined;
            }
            if (this.data.photoUrl) {
              this.previewProfilePicUrl = this.data.photoUrl;
            }
          }
        });
      }
    });
    const currentYear = new Date().getFullYear();
    this.dateRanges = this.generateDateRanges(2014, currentYear);
    this.data.batch = currentYear + '-' + (currentYear + 1);
    const sub = this.generalService.getStates().subscribe(res => {
      this.states = res.data;
      sub.unsubscribe();
    });
    const course = this.instituteService.getCourses().subscribe(res => {
      if (res.code == 200) {
        this.courses = res.data;
      } else {
        this.toastr.error(res.message);
      }
      course.unsubscribe();
    });
    const association = this.classService.getAllClasses().subscribe(res => {
      if (res.code == 200) {
        this.associations = res.data;
      } else {
        this.toastr.error(res.message);
      }
      association.unsubscribe();
    });
    const department = this.instituteService.getDepartments().subscribe(res => {
      if (res.code == 200) {
        this.departments = res.data;
      } else {
        this.toastr.error(res.message);
      }
      department.unsubscribe();
    });
  }

  generateDateRanges(startYear: number, endYear: number): string[] {
    const dateRanges: string[] = [];
    for (let year = startYear; year < (endYear + 1); year++) {
      dateRanges.push(`${year}-${year + 1}`);
    }
    return dateRanges;
  }

  close() {
    if (this.data.id) {
      this.router.navigateByUrl('/app/user/student/view/'+this.data.id);
    } else {   
      this.router.navigateByUrl('/app/user/student');
    }
  }

  openImagePicker(id: string) {
    document.getElementById(id)?.click()
  }

  removeProfilePicUrl() {
    this.profilePic = null;
    this.previewProfilePicUrl = null;
  }

  onProfileChange(event: any) {
    let file = event.target.files[0];
    this.profilePic = file;
    if (this.profilePic) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewProfilePicUrl = reader.result;
      };
      reader.readAsDataURL(this.profilePic);
    }
  }

  onSubmit() {   
    if (this.isStudentFormisible) {
      this.studentForm.control.markAllAsTouched();
    }
    if (!this.studentForm.form.valid)
      return;

    if (this.data.id) {
      const sub = this.userService.updateStudent(this.data).subscribe(res => {  
        if (res.code == 200) {
          let profilePicFormData = new FormData();
          console.log(this.previewProfilePicUrl);
          if (this.previewProfilePicUrl) {            
            if (this.profilePic) {
              profilePicFormData.append('photo', this.profilePic);
              this.httpClient.post(`${environment.lmsEndPoint}user/photo?userId=${res.data}&userType=STUDENT&isDeleted=false`, profilePicFormData).subscribe((response: any) => {
                if (response.code == 200) {
                  this.toastr.success(res.message);
                  this.close();
                }
              });
            } else {
              this.close();
            }
          } else if (!this.previewProfilePicUrl) {            
            this.httpClient.post(`${environment.lmsEndPoint}user/photo?userId=${res.data}&userType=STUDENT&isDeleted=true`, null).subscribe((response: any) => {
              if (response.code == 200) {
                this.toastr.success(res.message);
                this.close();
              }
            });
          }
        } else {
          this.toastr.error(res.message);
        }
      })
    } else {
      if ((this.data.password == undefined || this.data.password == null || this.data.password.length == 0) && (this.data.email == null || this.data.email == undefined || this.data.email.length == 0 || this.data.email.trim().length == 0)) {
        this.toastr.error('Enter the password first');
        return;
      }

      if (this.data.password != undefined && this.data.password != null && this.data.password.length > 0 && this.data.password?.length < 8) {
        this.toastr.error('Password must contain 8 digits');
        return;
      }
      const sub = this.userService.saveStudent(this.data).subscribe(res => {
        if (res.code == 200) {
          if (this.profilePic) {
            let profilePicFormData = new FormData();
            profilePicFormData.append('photo', this.profilePic);
            this.httpClient.post(`${environment.lmsEndPoint}user/photo?userId=${res.data}&userType=STUDENT`, profilePicFormData).subscribe((response: any) => {
              if (response.code == 200) {
                this.toastr.success(res.message);
                this.close();
              }
            });
          } else {
             this.toastr.success(res.message);
            this.close();
          }
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
  }

}
