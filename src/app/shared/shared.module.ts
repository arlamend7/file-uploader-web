import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalAutenticacaoComponent } from './components/dialog-autentication/dialog-autenticacao.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
    declarations: [
        ModalAutenticacaoComponent
    ],
    imports: [
        MatDialogModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
        
    ],
    exports: [
        MatDialogModule,
        CommonModule,
        MatCardModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    
    ],
    providers: [],
})
export class SharedModule { }
