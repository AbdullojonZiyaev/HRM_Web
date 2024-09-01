import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-add-order-type-dialog',
  templateUrl: './add-order-type-dialog.component.html',
  styleUrl: './add-order-type-dialog.component.css'
})
export class AddOrderTypeDialogComponent implements OnInit {
  orderForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddOrderTypeDialogComponent>
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],     
      description: ['', Validators.required],
      orderCategory: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.dialogRef.close(this.orderForm.value);
    }
  }
  

  onCancel(): void {
    this.dialogRef.close(false); // Close the dialog without doing anything
  }
}
