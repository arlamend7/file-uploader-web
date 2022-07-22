import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: `app.component.html`,
    styles: [
        `
            .page {
                display: flex;
                margin-top: 80px;
                height: 100%;
                max-height: calc(100% - 65px);
            }
        `,
    ],
})
export class AppComponent {
    title = 'Apolices-Front';
}
