import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Association } from 'src/app/core/api-models/class-model';
import { Course, Department } from 'src/app/core/api-models/institute-model';
import { Student, Teacher } from 'src/app/core/api-models/user-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { UserService } from 'src/app/core/api-services/user/user.service';

@Component({
  selector: 'app-add-association',
  templateUrl: './add-association.component.html',
  styleUrls: ['./add-association.component.scss']
})
export class AddAssociationComponent implements OnInit {
  data: Association = {};
  status: string = 'Add';
  departments: Array<Department> = [];
  courses: Array<Course> = [];
  isassociationFormVisible = true;
  students: Student[] = [];
  teachers: Teacher[] = [];

  @ViewChild('associationForm') associationForm?: any;
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<AddAssociationComponent>, @Inject(MAT_DIALOG_DATA) public details: { id: number },
    private classService: ClassService, private toastr: ToastrService, private instituteService: InstituteService, private userService: UserService) { }

  ngOnInit() {
    if (this.details.id) {
      this.status = 'Edit';
      const sub = this.classService.getClasseById(this.details.id).subscribe(res => {
        if (res.code == 200) {
          this.data = res.data;
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      })
    }
    // const student = this.userService.getStudents().subscribe(res => {
    //   if (res.code == 200) {
    //     this.students = res.data;
    //   }
    //   student.unsubscribe();
    // });

    const teacher = this.userService.getTeachers().subscribe(res => {
      if (res.code == 200) {
        this.teachers = res.data;
      }
      teacher.unsubscribe();
    });
    
    // const course = this.instituteService.getCourses().subscribe(res => {
    //   this.courses = res.data;
    //   course.unsubscribe();
    // });
    // const dep = this.instituteService.getDepartments().subscribe(res => {
    //   this.departments = res.data;
    //   dep.unsubscribe();
    // });
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.isassociationFormVisible) {
      this.associationForm.control.markAllAsTouched();
    }
    if (!this.associationForm.form.valid)
      return;

    if (this.details.id) {
      const sub = this.classService.updateAssociation(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.confirmed.emit(true);
          this.close();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    } else {
      const sub = this.classService.saveAssociation(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.confirmed.emit(true);
          this.close();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
  }

}
