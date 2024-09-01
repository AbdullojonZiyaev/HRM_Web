import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserUpdateDto, Company } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  form!: FormGroup;
  companies: Company[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, user: UserUpdateDto },
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.data.user.id, Validators.required),
      firstName: new FormControl(this.data.user.firstName, Validators.required),
      secondName: new FormControl(this.data.user.secondName),
      surname: new FormControl(this.data.user.surname, Validators.required),
      username: new FormControl(this.data.user.username, Validators.required),
      password: new FormControl(this.data.user.password, Validators.required),
      phone: new FormControl(this.data.user.phone),
      address: new FormControl(this.data.user.address),
      position: new FormControl(this.data.user.position),
      companyId: new FormControl(this.data.user.companyId, Validators.required),
      roleId: new FormControl(this.data.user.roleId, Validators.required),
      isActived: new FormControl(this.data.user.isActived, Validators.required)
    });

    this.loadCompanies();
  }

  loadCompanies(): void {
    this.baseService.getCompanies().subscribe(data => {
      this.companies = data;
    }, error => {
      console.error('Error loading companies:', error);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValues = {
        ...this.form.value,
        isActived: !!this.form.value.isActived // Convert to boolean
      } as UserUpdateDto;
      this.dialogRef.close(formValues);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
