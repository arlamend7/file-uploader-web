import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate } from '@angular/router';
import { Observable, mergeMap, of } from 'rxjs';
import { ModalAutenticacaoComponent } from '../components/dialog-autentication/dialog-autenticacao.component';

@Injectable({ providedIn: 'root' })
export class AutenticationGuard implements CanActivate {
    constructor(private readonly dialog: MatDialog) { }

    canActivate() {
        return this.acertarSenha();
    }

    acertarSenha(): Observable<boolean> {
        return this.dialog.open(ModalAutenticacaoComponent, {
            width: '400px',
            data: {},
            enterAnimationDuration: '800ms'
        }).afterClosed()
            .pipe(mergeMap(({ password }) => of(password == "arlan")))
            .pipe(mergeMap((x: boolean) => x ? of(true) : this.acertarSenha()))
    }
}
