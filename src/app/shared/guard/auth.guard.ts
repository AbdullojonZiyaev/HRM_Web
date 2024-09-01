import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AccessControlService } from '../services/access-control.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private accessControlService: AccessControlService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return of(false);
    }
    let requiredRoles = route.data['requiredRoles'];

    if (!requiredRoles) {
      return of(true);
    }
    if (!Array.isArray(requiredRoles)) {
      requiredRoles = [requiredRoles];
    }
    return this.accessControlService.getUserInfo().pipe(
      map((userInfo) => {
        if (userInfo && userInfo.functionals) {
          if (
            requiredRoles.some((role: string) =>
              userInfo.functionals.includes(role)
            )
          ) {
            return true;
          } else {
            const firstAccessibleRoute = this.getFirstAccessibleRoute(
              userInfo.functionals
            );
            if (firstAccessibleRoute) {
              this.router.navigate([firstAccessibleRoute]);
            } else {
              this.router.navigate(['/login']);
              localStorage.clear();
            }
            return false;
          }
        } else {
          this.router.navigate(['/login']);
          localStorage.clear();
          return false;
        }
      })
    );
  }
  private getFirstAccessibleRoute(functionals: string[]): string | null {
    const functionalsRoutesMap: { [key: string]: string } = {
      allFunctionals: '',
    };

    for (const functional of functionals) {
      const route = functionalsRoutesMap[functional];
      if (route) {
        return route;
      }
    }
    return null;
  }
}
