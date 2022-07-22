import { NgModule } from "@angular/core";
import { ImportFormComponent } from "src/app/pages/imports/import-form.component";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { MatExpansionModule } from "@angular/material/expansion";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, ImportFormComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatExpansionModule,
    HttpClientModule,
    SharedModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
