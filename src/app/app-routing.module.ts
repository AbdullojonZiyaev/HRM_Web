import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { NavComponent } from './dashboard/nav/nav.component';
import { UserComponent } from './dashboard/user/user.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'nav', // Add the new route here
    component: NavComponent,
  },
  {
    path: 'user', // Lazy load UserComponent
    loadChildren: () =>
      import('./dashboard/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./dashboard/company/company.module').then((m) => m.CompanyModule),
  },
  {
    path: "department",
    loadChildren: () =>
      import('./dashboard/department/department.module').then((m) => m.DepartmentModule),
  },
  {
    path: "employee",
    loadChildren: () =>
      import('./dashboard/employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
  path: "division",
  loadChildren: () =>
    import('./dashboard/division/division.module').then((m) => m.DivisionModule),
  },
  {
    path: "position",
    loadChildren: () =>
      import('./dashboard/position/position.module').then((m) => m.PositionModule),
  },
  {
    path: "orders",
    loadChildren: () =>
      import('./dashboard/orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: "orderType",
    loadChildren: () =>
      import('./dashboard/order-type/order-type.module').then((m) => m.OrderTypeModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
