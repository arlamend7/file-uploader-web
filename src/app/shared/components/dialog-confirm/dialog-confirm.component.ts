import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: `
    <h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content>
        <p>{{data.message}}</p>
    </div>
    <div mat-dialog-actions class="d-flex justify-content-around">
      <button type="button" mat-button (click)="onNoClick()">No Thanks</button>
      <button type="submit" mat-raised-button color="primary" [mat-dialog-close]="true" cdkFocusInitial>Confirm</button>
    </div>
    `
})

export class ModalConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message:string },
  ) { }

  @HostListener("keydown.enter")
  confirm() {
    this.dialogRef.close(true)
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}