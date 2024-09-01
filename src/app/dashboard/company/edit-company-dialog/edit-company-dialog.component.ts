import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyUpdateDto, City } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-edit-company-dialog',
  templateUrl: './edit-company-dialog.component.html',
  styleUrls: ['./edit-company-dialog.component.css']
})
export class EditCompanyDialogComponent implements OnInit {
  form!: FormGroup;
  cities: City[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditCompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, company: CompanyUpdateDto },
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.data.company.id),
      fullname: new FormControl(this.data.company.fullname, Validators.required),
      address: new FormControl(this.data.company.address),
      inn: new FormControl(this.data.company.inn, Validators.required),
      email: new FormControl(this.data.company.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.data.company.phone),
      director: new FormControl(this.data.company.director),
      cityId: new FormControl(this.data.company.cityId, Validators.required),
    });

    this.loadCities();
  }

  loadCities(): void {
    this.baseService.getCities().subscribe(data => {
      this.cities = data;
    }, error => {
      console.error('Error loading cities:', error);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValues: CompanyUpdateDto = {
        id: +this.form.value.id,
        fullname: this.form.value.fullname,
        address: this.form.value.address,
        inn: this.form.value.inn,
        email: this.form.value.email,
        phone: this.form.value.phone,
        director: this.form.value.director,
        cityId: +this.form.value.cityId // Convert to number
      };
      this.dialogRef.close(formValues);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
