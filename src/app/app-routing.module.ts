import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportFormComponent } from 'src/app/pages/import-form.component';

const routes: Routes = [
  {
    path:'import',
    component: ImportFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
