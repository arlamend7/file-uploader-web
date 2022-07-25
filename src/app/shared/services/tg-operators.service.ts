import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MonoTypeOperatorFunction, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TgOperatoresService {
    constructor(private readonly toastr: MatSnackBar) {}

    handleError<T>() : MonoTypeOperatorFunction<T> {
        return tap({
            error: (err: HttpErrorResponse) => {
                const errorMessage: { [index: number | string]: { title: string; message: string } } = {
                    0: {
                        title: 'Error',
                        message: 'Servidor encontra-se fora do ar.\n Por favor tente novamente mais tarde',
                    },
                    400: { title: 'Error', message: err.error?.Message },
                    404: { title: 'Not Found', message: "Serviço/Funcionalidade não encontrado" },
                    500: { title: 'Error', message: "Instabilidade no servidor" },
                    502: { title: 'Inconsistencia', message: 'por favor atualize a pagina novamente' },
                    default : {title : "Error", message : "Por favor, entre em contato com nossa equipe interna"}
                };
                const message = errorMessage[err.status] || errorMessage.default;
                this.toastr.open(message.message, "OK");
            },
        });
    }
}
