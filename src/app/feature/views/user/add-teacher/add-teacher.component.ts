import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { State } from 'src/app/core/api-models/common-model';
import { Branch, Course, Department } from 'src/app/core/api-models/institute-model';
import { Teacher } from 'src/app/core/api-models/user-model';
import { GeneralService } from 'src/app/core/api-services/common/general.service';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { UserService } from 'src/app/core/api-services/user/user.service';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {
  status: string = 'Add';
  data: Teacher = {};
  states: Array<State> = [];
  isteacherFormVisible = true;
  departments: Array<Department> = [];
  branches: Array<Branch> = [];
  courses: Array<Course> = [];
  profilePic: File | null = null;
  previewProfilePicUrl: string | ArrayBuffer | null = null;
  isProfilePicChange = false;
  teachers: Array<Teacher> = [];

  @ViewChild('teacherForm') teacherForm?: any;

  constructor(
    private userService: UserService, private toastr: ToastrService, private generalService: GeneralService,
    private instituteService: InstituteService, private router: Router, private httpClient: HttpClient, private route: ActivatedRoute,) { }

  ngOnInit() {
    if (this.router.url.includes("edit")) {
      this.status = "Edit";
    } else if (this.router.url.includes("view")) {
      this.status = "View";
    }
    const sub = this.generalService.getStates().subscribe(res => {
      this.states = res.data;
      sub.unsubscribe();
    });
    const teach = this.userService.getTeachers().subscribe(res => {
      if (res.code == 200) {
        this.teachers = res.data;
        this.loadData();
      } else {
        this.toastr.error(res.message);
      }
      teach.unsubscribe();
    })
  }

  loadData() {
    this.route.paramMap.subscribe(parameterMap => {
      if (parameterMap.get("id")) {
        this.userService.getTeacherById(Number(parameterMap.get("id"))).subscribe(res => {
          if (res.code == 200) {
            this.data = res.data;
            if (this.teachers.length > 0) {
              let idx = this.teachers.findIndex(x => x.id == this.data.id);
              if (idx != null) {
                this.teachers.splice(idx, 1);
                console.log(this.teachers);
              }
            }
            if (this.data.photoUrl) {
              this.previewProfilePicUrl = this.data.photoUrl;
            }
          }
        });
      }
    });
  }

  close() {
    if (this.data.id) {
      this.router.navigateByUrl('/app/user/teacher/view/' + this.data.id);
    } else {
      this.router.navigateByUrl('/app/user/teacher');
    }
  }

  openImagePicker(id: string) {
    document.getElementById(id)?.click()
  }

  onProfileChange(event: any) {
    if (this.data.id) {
      this.isProfilePicChange = true;
    }
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

  removeProfilePicUrl() {
    this.profilePic = null;
    this.previewProfilePicUrl = null;
    if (this.data.id) {
      this.isProfilePicChange = true;
    }
  }

  onSubmit() {
    if (this.isteacherFormVisible) {
      this.teacherForm.control.markAllAsTouched();
    }
    if (!this.teacherForm.form.valid)
      return;

    if (this.data.id) {
      const sub = this.userService.updateTeacher(this.data).subscribe(res => {
        if (res.code == 200) {
          let profilePicFormData = new FormData();
          if (this.previewProfilePicUrl) {
            if (this.profilePic) {
              profilePicFormData.append('photo', this.profilePic);
              this.httpClient.post(`${environment.lmsEndPoint}user/photo?userId=${res.data}&userType=TEACHER&isDeleted=false`, profilePicFormData).subscribe((response: any) => {
                if (response.code == 200) {
                  this.toastr.success(res.message);
                  this.close();
                }
              });
            } else {
              this.close();
            }
          } else if (!this.previewProfilePicUrl) {
            this.httpClient.post(`${environment.lmsEndPoint}user/photo?userId=${res.data}&userType=TEACHER&isDeleted=true`, null).subscribe((response: any) => {
              if (response.code == 200) {
                this.toastr.success(res.message);
                this.close();
              }
            });
          }
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    } else {
      if ((this.data.password == undefined || this.data.password == null || this.data.password.length == 0) && (this.data.email == null || this.data.email == undefined || this.data.email.length == 0 || this.data.email.trim().length == 0)) {
        this.toastr.error('Enter the password first');
        return;
      }

      if (this.data.password && this.data.password.length < 8) {
        this.toastr.error('Password must contain 8 digits');
        return;
      }

      const sub = this.userService.saveTeacher(this.data).subscribe(res => {
        if (res.code == 200) {
          if (this.profilePic) {
            let profilePicFormData = new FormData();
            profilePicFormData.append('photo', this.profilePic);
            this.httpClient.post(`${environment.lmsEndPoint}user/photo?userId=${res.data}&userType=TEACHER`, profilePicFormData).subscribe((response: any) => {
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
