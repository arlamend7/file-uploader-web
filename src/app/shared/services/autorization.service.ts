import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './localstorage.service';

@Injectable({ providedIn: 'root' })
export class AutorizationService {
    private TOKEN_KEY = 'xxx-token';
    private USER_KEY = 'xxx-user-session';

    get Token() {
        return this.localSotrageService.get(this.TOKEN_KEY).data;
    }

    get IsLogged() {
        return this.Token != null;
    }

    constructor(
        private readonly localSotrageService: LocalStorageService,
        private readonly router: Router,
    ) {}


    logout() {
        this.localSotrageService.remove(this.USER_KEY);
        this.localSotrageService.remove(this.TOKEN_KEY);
        this.router.navigate(['auth/login']);
    }
}
