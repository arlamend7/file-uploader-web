import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    template: `
        <h1 mat-dialog-title>Report</h1>
        <div mat-dialog-content>
            <table class="table table-dark">
                <thead>
                    <th></th>
                    <th>Index</th>
                    <th>Linha</th>
                    <th>Classe</th>
                    <th>Erro</th>
                </thead>
                <tbody *ngFor="let row of registrosComErros; index as i">
                    <tr>
                        <td><button mat-raised-button color="accent" class="rounded-circle" (click)="row.detail = true">O</button></td>
                        <td>{{ i }}</td>
                        <td>{{ row.Line + 1 }}</td>
                        <td>{{ row.TypeName }}</td>
                        <td>{{ row.Error ? 'Sim' : 'Não' }}</td>
                    </tr>
                    <tr *ngIf="row.detail">
                        <td colspan="5">
                        <table>
                            <thead>
                                <th>Coluna</th>
                                <th>Propriedade</th>
                                <th>Tipo</th>
                                <th>Possui Valor</th>
                                <th>Valor arquivo</th>
                                <th>Error</th>
                                <th>Mensagem</th>
                            </thead>
                            <tbody *ngFor="let cell of row.Cells">
                                <td>{{ cell.Column + 1 }}</td>
                                <td>{{ cell.Property }}</td>
                                <td>{{ cell.TypeName }}</td>
                                <td>{{ cell.HasValue }}</td>
                                <td>{{ cell.Value }}</td>
                                <td>{{ cell.Success ? 'Não' : 'Sim' }}</td>
                                <td>{{ cell.ErrorMessage }}</td>
                            </tbody>
                        </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div mat-dialog-actions class="d-flex justify-content-around">
            <button type="submit" mat-raised-button color="accent" [mat-dialog-close]="data" cdkFocusInitial>
                Confirm
            </button>
        </div>
    `,
})
export class ModalUploadReportComponent {
    get registrosComErros() {
        return this.data.Rows.filter((x) => x.Error);
    }
    constructor(
        public dialogRef: MatDialogRef<ModalUploadReportComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { Rows: any[] },
    ) {}

    @HostListener('keydown.enter')
    confirm() {
        this.dialogRef.close(this.data);
    }
}
