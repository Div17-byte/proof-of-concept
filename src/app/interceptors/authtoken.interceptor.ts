import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable()
export class AuthtokenInterceptor implements HttpInterceptor {
  constructor(private service: DataService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.service.getAuthToken();

    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`),
    });

    if (authToken) return next.handle(authRequest);
    else return next.handle(request);
  }
}
