import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { OrderComponent } from './orders.component';
import { AddOrderDialogComponent } from './add-order-dialog/add-order-dialog.component';
import { InfoOrderDialogComponent } from './info-order-dialog/info-order-dialog.component';




const routes: Routes = [{ path: '', component: OrderComponent }];

@NgModule({
  declarations: [OrderComponent, AddOrderDialogComponent, InfoOrderDialogComponent],
  imports: [SharedModule, RouterModule.forChild(routes), MatDialogModule,
    MatFormFieldModule,
    MatInputModule,]
})
export class OrdersModule {}
