import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, mergeMap, Observable, of, tap } from 'rxjs';
import { AutorizationService } from 'src/libs/tg-utilities/services/autorization.service';
import { TgOperatoresService } from 'src/libs/tg-utilities/services/tg-operators.service';

const InterceptorSkipHeader = 'X-Skip-spinner';

export const headersSkipSpinner = new HttpHeaders({
    [InterceptorSkipHeader]: 'true',
});

@Injectable({ providedIn: 'root' })
export class TgHttpInterceptor implements HttpInterceptor {
    constructor(
        private readonly autorizationService: AutorizationService,
        private readonly tgOperatorService: TgOperatoresService,
        private readonly spinner: NgxSpinnerService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = request.clone({
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.autorizationService.Token}`,
            }),
        });

        if (request.headers.has(InterceptorSkipHeader)) {
            return next.handle(authReq).pipe(this.tgOperatorService.handleError());
        }

        return of(this.spinner.show())
            .pipe(mergeMap(() => next.handle(authReq)))
            .pipe(
                tap({error : (err) => {if(err.status == 401) this.autorizationService.logout()}}),
                this.tgOperatorService.handleError(),
                finalize(() => {
                    this.spinner.hide();
                }),
            );
    }
}
