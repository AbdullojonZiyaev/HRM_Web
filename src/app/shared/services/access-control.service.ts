import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { UserInfo } from '../interfaces/Base.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessControlService {
  private userInfoSubject = new BehaviorSubject<UserInfo | undefined>(
    undefined
  );
  userInfo$ = this.userInfoSubject.asObservable();
  constructor(private authService: AuthService) { }

  setUserInfo(user: UserInfo) {
    this.userInfoSubject.next(user);
  }
  getUserInfo(): Observable<UserInfo | undefined> {
    return this.userInfo$.pipe(
      switchMap((userInfo) => {
        if (userInfo !== undefined) {
          return of(userInfo);
        } else {
          return this.authService
            .getUserInfo()
            .pipe(tap((v) => this.userInfoSubject.next(v)));
        }
      })
    );
  }
  canAccess(functional: string): Observable<boolean> {
    return this.getUserInfo().pipe(
      map((userInfo) => {
        if (userInfo !== undefined) {
          const userFunctionals = userInfo.functionals;
          if (userFunctionals.includes('All_Functional')) {
            return true;
          }
          return userFunctionals.includes(functional);
        }
        return false;
      })
    );
  }
}
