import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, mergeMap, Observable, of, tap } from 'rxjs';
import { TgOperatoresService } from './tg-operators.service';
const InterceptorSkipHeader = 'X-Skip-spinner';

export const headersSkipSpinner = new HttpHeaders({
    [InterceptorSkipHeader]: 'true',
});

@Injectable({ providedIn: 'root' })
export class SpinnerHttpInterceptor implements HttpInterceptor {
    constructor(
        private readonly tgOperatorService: TgOperatoresService,
        private readonly spinner: NgxSpinnerService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = request.clone({
            headers: new HttpHeaders({
                Authorization: `Bearer ${"oi"}`,
            }),
        });

        if (request.headers.has(InterceptorSkipHeader)) {
            return next.handle(authReq).pipe(this.tgOperatorService.handleError());
        }

        return of(this.spinner.show())
            .pipe(mergeMap(() => next.handle(authReq)))
            .pipe(
                this.tgOperatorService.handleError(),
                finalize(() => {
                    this.spinner.hide();
                }),
            );
    }
}
