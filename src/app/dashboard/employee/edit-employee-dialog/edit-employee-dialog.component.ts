import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee, Gender, MaritalStatus, MilitaryStatus, DriverLicense, Company, Department, Division, Position } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.css']
})
export class EditEmployeeDialogComponent implements OnInit {
  editForm!: FormGroup;
  genders = Object.keys(Gender).filter(key => isNaN(Number(key))).map(key => ({ key, value: Gender[key as keyof typeof Gender] }));
  maritalStatuses = Object.keys(MaritalStatus).filter(key => isNaN(Number(key))).map(key => ({ key, value: MaritalStatus[key as keyof typeof MaritalStatus] }));
  militaryStatuses = Object.keys(MilitaryStatus).filter(key => isNaN(Number(key))).map(key => ({ key, value: MilitaryStatus[key as keyof typeof MilitaryStatus] }));
  driverLicenses = Object.keys(DriverLicense).filter(key => isNaN(Number(key))).map(key => ({ key, value: DriverLicense[key as keyof typeof DriverLicense] }));
  companies: Company[] = [];
  departments: Department[] = [];
  divisions: Division[] = [];
  positions: Position[] = [];

  constructor(
    private fb: FormBuilder,
    private baseService: BaseService,
    private dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [this.data.id, Validators.required],
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      surName: [this.data.surName],
      dateOfBirth: [this.data.dateOfBirth],
      address: [this.data.address],
      email: [this.data.email],
      phone: [this.data.phone],
      dateOfHire: [this.data.dateOfHire],
      salary: [this.data.salary, Validators.required],
      gender: [this.data.gender, Validators.required],
      nationality: [this.data.nationality, Validators.required],
      education: [this.data.education],
      degreeName: [this.data.degreeName],
      personalSkills: [this.data.personalSkills],
      computerSkills: [this.data.computerSkills],
      qualifications: [this.data.qualifications],
      languageKnowledge: [this.data.languageKnowledge],
      party: [this.data.party],
      previousJob: [this.data.previousJob],
      maritalStatus: [this.data.maritalStatus, Validators.required],
      militaryStatus: [this.data.militaryStatus, Validators.required],
      driverLicense: [this.data.driverLicense, Validators.required],
      numberOfChildren: [this.data.numberOfChildren, Validators.min(0)],
      specialization: [this.data.specialization],
      insuranceStatus: [this.data.insuranceStatus],
      companyId: [this.data.companyId, Validators.required],
      departmentId: [this.data.departmentId, Validators.required],
      divisionId: [this.data.divisionId],
      positionId: [this.data.positionId],
      isInReserve: [this.data.isInReserve]
    });

    this.loadDropdownData();
  }

  loadDropdownData(): void {
    this.baseService.getCompanies().subscribe(data => this.companies = data);
    this.baseService.getDepartments().subscribe(data => this.departments = data);
    this.baseService.getDivisions().subscribe(data => this.divisions = data);
    this.baseService.getPositions().subscribe(data => this.positions = data);
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.baseService.updateEmployee(this.editForm.value).subscribe(() => {
        this.dialogRef.close(this.editForm.value);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
