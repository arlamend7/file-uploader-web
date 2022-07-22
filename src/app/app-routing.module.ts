import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportFormComponent } from 'src/app/pages/imports/import-form.component';

const routes: Routes = [
  {
    path:'',
    component: ImportFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
