import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, Observable, tap } from 'rxjs';
import { AutenticationLoginRequest } from 'src/apis/authentication/models/requests/autentication-login.request';
import { AutenticationResponse } from 'src/apis/authentication/models/responses/autentication.response';
import { UserResponse } from 'src/apis/authentication/models/responses/user.response';
import { AutenticationService } from 'src/apis/authentication/services/authentication.service';
import { LocalStorageService } from 'src/libs/tg-utilities/services/localstorage.service';

@Injectable({ providedIn: 'root' })
export class AutorizationService {
    private TOKEN_KEY = 'xxx-token';
    private USER_KEY = 'xxx-user-session';

    get User(): UserResponse {
        return JSON.parse(this.localSotrageService.get(this.USER_KEY).data);
    }

    get Token() {
        return this.localSotrageService.get(this.TOKEN_KEY).data;
    }

    get IsLogged() {
        return this.Token != null;
    }

    constructor(
        private readonly localSotrageService: LocalStorageService,
        private readonly router: Router,
        private readonly autenticationService: AutenticationService,
    ) {}

    authenticate(request: AutenticationLoginRequest): Observable<AutenticationResponse> {
        return this.autenticationService
            .encrypt(request.Password)
            .pipe(
                mergeMap((encrypted) => {
                    request.Password = encrypted.Value;
                    return this.autenticationService.autenticate(request);
                }),
            )
            .pipe(this.setUser());
    }

    changeCompany(companyId: number): Observable<AutenticationResponse> {
        return this.autenticationService.changeCompany(companyId).pipe(this.setUser());
    }

    private setUser() {
        return tap({
            next: (response: AutenticationResponse) => {
                this.localSotrageService.set(this.USER_KEY, JSON.stringify(response.User));
                this.localSotrageService.set(this.TOKEN_KEY, response.Token);
            },
        });
    }

    logout() {
        this.localSotrageService.remove(this.USER_KEY);
        this.localSotrageService.remove(this.TOKEN_KEY);
        this.router.navigate(['auth/login']);
    }
}
