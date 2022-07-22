import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportFormComponent } from 'src/app/pages/imports/import-form.component';
import { AutenticationGuard } from './shared/guards/autentication.guard';

const routes: Routes = [
  {
    path:'',
    component: ImportFormComponent,
    canActivate: [AutenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
