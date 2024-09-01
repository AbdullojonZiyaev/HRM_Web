import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyCreateDto, City } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-add-company-dialog',
  templateUrl: './add-company-dialog.component.html',
  styleUrls: ['./add-company-dialog.component.css']
})
export class AddCompanyDialogComponent implements OnInit {
  form!: FormGroup;
  cities: City[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddCompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      fullname: new FormControl('', Validators.required),
      address: new FormControl(''),
      inn: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      director: new FormControl(''),
      cityId: new FormControl('', Validators.required)
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
      const formValues: CompanyCreateDto = {
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
