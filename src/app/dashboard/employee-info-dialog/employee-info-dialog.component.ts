import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getDriverLicenseString, getGenderString, getMaritalStatusString, getMilitaryStatusString } from 'src/app/shared/enum/Base.enum';
import { Employee } from 'src/app/shared/interfaces/Base.interface';

@Component({
  selector: 'app-employee-info-dialog',
  templateUrl: './employee-info-dialog.component.html',
  styleUrls: ['./employee-info-dialog.component.css']
})
export class EmployeeInfoDialogComponent {
  genderString: string;
  maritalStatusString: string;
  militaryStatusString: string;
  driverLicenseString: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Employee) {
    this.genderString = getGenderString(data.gender);
    this.maritalStatusString = getMaritalStatusString(data.maritalStatus);
    this.militaryStatusString = getMilitaryStatusString(data.militaryStatus);
    this.driverLicenseString = getDriverLicenseString(data.driverLicense);
  }
}
