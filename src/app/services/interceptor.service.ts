import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loaderService : LoaderService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    setTimeout(() => this.loaderService.show(), 0);
    
    return next.handle(req)
      .pipe(
        finalize(() => {
          setTimeout(() => this.loaderService.hide() , 0);
        })
      )
    }
}
