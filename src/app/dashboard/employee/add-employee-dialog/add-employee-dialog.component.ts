import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseService } from 'src/app/shared/services/base.service';
import { Gender, MaritalStatus, MilitaryStatus, DriverLicense, Company, Department, Division, Position } from 'src/app/shared/interfaces/Base.interface';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.css']
})
export class AddEmployeeDialogComponent implements OnInit {
  employeeForm!: FormGroup;
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
    private dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      surName: [''],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfHire: ['', Validators.required],
      salary: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      education: ['', Validators.required],
      degreeName: [''],
      personalSkills: [''],
      computerSkills: [''],
      qualifications: [''],
      languageKnowledge: [''],
      party: [''],
      previousJob: [''],
      maritalStatus: ['', Validators.required],
      militaryStatus: ['', Validators.required],
      driverLicense: ['', Validators.required],
      numberOfChildren: [0, Validators.min(0)],
      specialization: [''],
      insuranceStatus: [''],
      companyId: ['', Validators.required],
      departmentId: ['', Validators.required],
      divisionId: [''],
      positionId: [''],
      isInReserve: [false]
    });

    this.loadCompanies();
    this.loadDepartments();
    this.loadDivisions();
    this.loadPositions();
  }

  loadCompanies(): void {
    this.baseService.getCompanies().subscribe(companies => {
      this.companies = companies;
    });
  }

  loadDepartments(): void {
    this.baseService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  loadDivisions(): void {
    this.baseService.getDivisions().subscribe(divisions => {
      this.divisions = divisions;
    });
  }

  loadPositions(): void {
    this.baseService.getPositions().subscribe(positions => {
      this.positions = positions;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
