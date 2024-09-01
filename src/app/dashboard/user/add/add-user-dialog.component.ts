import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserCreateDto, Company } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';
import { passwordComplexityValidator } from 'src/app/shared/services/validator.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {
  form!: FormGroup;
  userCreateDto!: UserCreateDto;
  companies: Company[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.userCreateDto = new UserCreateDto();
    this.form = new FormGroup({
      firstName: new FormControl(this.userCreateDto.firstName, Validators.required),
      secondName: new FormControl(this.userCreateDto.secondName),
      surname: new FormControl(this.userCreateDto.surname, Validators.required),
      phone: new FormControl(this.userCreateDto.phone),
      address: new FormControl(this.userCreateDto.address),
      position: new FormControl(this.userCreateDto.position),
      companyId: new FormControl(this.userCreateDto.companyId, Validators.required),
      roleId: new FormControl(this.userCreateDto.roleId, Validators.required),
      isActived: new FormControl(this.userCreateDto.isActived, Validators.required),
      username: new FormControl(this.userCreateDto.username, Validators.required),
      password: new FormControl(this.userCreateDto.password, [
        Validators.required,
        passwordComplexityValidator()
      ])
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
      // Convert form values to the appropriate types
      const formValues = this.form.value;
      formValues.companyId = +formValues.companyId; // Convert to number
      formValues.roleId = +formValues.roleId; // Convert to number
      formValues.isActived = formValues.isActived === 'true'; // Convert to boolean

      this.dialogRef.close(formValues);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
