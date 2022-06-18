import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class IterceptorService implements HttpInterceptor {

  constructor(private loaderService : LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    setTimeout( () => {
      this.loaderService.isLoading$.next(true);
    });
    

    return next.handle(req)
      .pipe(
        finalize(() => {
          this.loaderService.isLoading$.next(false);
        })
      )
    }
}
