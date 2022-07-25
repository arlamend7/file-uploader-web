import { LOCALE_ID, NgModule } from '@angular/core';
import { ImportFormComponent } from 'src/app/pages/imports/import-form.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from './shared/shared.module';
import { SpinnerHttpInterceptor } from './shared/services/interceptor.service';
import { ModalUploadReportComponent } from './components/dialog-upload/dialog-upload-report.component';

@NgModule({
    declarations: [AppComponent, ImportFormComponent, ModalUploadReportComponent],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatExpansionModule,
        HttpClientModule,
        SharedModule,
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SpinnerHttpInterceptor,
            multi: true,
        },
        {
            provide: LOCALE_ID,
            useValue: 'pt-PT',
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
