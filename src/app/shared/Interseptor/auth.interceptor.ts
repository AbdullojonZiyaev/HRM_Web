import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, switchMap, tap, throwError } from 'rxjs';
import { IErrorMessages } from '../interfaces/Base.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
private errorMessages:IErrorMessages = {
  INVALID_CREDENTIALS: 'Неверные учетные данные.',
  REFRESH_TOKEN_NOT_FOUND: 'Токен обновления не найден.',
  REFRESH_TOKEN_REVOKED: 'Токен обновления отозван.',
  REFRESH_TOKEN_ALREADY_REVOKED: 'Токен обновления уже отозван.',
  THIS_USERNAME_ALREADY_EXIST: 'Это имя пользователя уже существует.',
  ENTITY_WITH_THIS_ID_NOT_FOUND_FOR_DELETE:'Сущность с этим идентификатором не найдена для удаления.',
  ENTITY_WITH_THIS_ID_NOT_FOUND:'Сущность с этим идентификатором не найдена.',
  NOT_FOUND_USER: 'Пользователь не найден.',
  LIST_IS_EMPTY: 'Список пуст.',
  ENTITY_WITH_THIS_NAME_ALREADY_EXIST:'Сущность с указанным именем уже существует.',
  ENTITY_WITH_THIS_ID_NOT_FOUND_FOR_UPDATE:'Сущность с указанным ID не найдена для обновления.',
  COMPANY_WITH_THIS_ID_NOT_FOUND:'Компания с таким ID не найдена',
  USER_WITH_THIS_ID_NOT_FOUND:'Пользователь с таким ID не найден',
  CITY_WITH_THIS_ID_NOT_FOUND: 'Город с указанным ID не найден.',
  ENTITY_WITH_THIS_NAME_ALREADY_USING:'Объект с этим названием уже используется',
  ENTITY_WITH_THIS_NUMBER_ALREADY_EXIST:'Объект с указанным номером уже существует',
}
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.spinner.show();
    const token = localStorage.getItem('accessToken'); 
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(request).pipe(tap((Event)=>{
      if(Event instanceof HttpResponse && Event.status ===200){
        if(!Event.url?.startsWith('http://localhost:4200/assets/')){this.toastr.success('Добро пожаловать!');}
      }
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage =
        'Произошла ошибка. Пожалуйста, повторите попытку позже.';

      if (error.status === 401) {
        return this.authService.refreshToken().pipe(
          switchMap(() => {
            const newToken = localStorage.getItem('accessToken');
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });
            return next.handle(request);
          }),
          catchError(() => {
            localStorage.clear();
            this.router.navigate(['/login']);
            this.toastr.error('Пожалуйста, авторизуйтесь');
            return throwError(() => new Error('Пожалуйста, авторизуйтесь'));
          })
        );
      }
      if (error && error.error && error.error.message) {
        const errorKey = error.error.message;
        if (this.errorMessages.hasOwnProperty(errorKey)) {
          errorMessage = this.errorMessages[errorKey];
        }
      }
      this.toastr.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    }),
    finalize(() => {
      this.spinner.hide();
    })
  );
  }
}
