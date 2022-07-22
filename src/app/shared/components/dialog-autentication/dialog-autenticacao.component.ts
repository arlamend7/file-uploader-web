import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: `
    <h1 mat-dialog-title>Log in</h1>
    <div mat-dialog-content>
    <mat-form-field class="w-100">
        <mat-label>Usuario</mat-label>
        <input matInput type="text"  [(ngModel)]="data.usuario">
      </mat-form-field>
      <mat-form-field class="w-100">
        <mat-label>Senha</mat-label>
        <input matInput type="password" [(ngModel)]="data.password">
      </mat-form-field>
    </div>
    <div mat-dialog-actions class="d-flex justify-content-around">
      <button type="button" mat-button (click)="onNoClick()">No Thanks</button>
      <button type="submit" mat-raised-button color="primary" [mat-dialog-close]="data" cdkFocusInitial>Confirm</button>
    </div>
    `
})

export class ModalAutenticacaoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalAutenticacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { password: string, usuario:string },
  ) { }

  @HostListener("keydown.enter")
  confirm() {
    this.dialogRef.close(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}