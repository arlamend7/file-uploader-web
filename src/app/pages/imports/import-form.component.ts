import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'selector-name',
    templateUrl: 'import-form.component.html',
    styleUrls: ['import-form.component.css'],
})
export class ImportFormComponent {
    data = {
        password: '',
    };
    disabled = true;

    form: FormGroup;
    constructor(private readonly httpClient: HttpClient, private readonly formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            ...this.data,
            file: ['', Validators.required],
            fileSource: ['', Validators.required],
            month: [''],
            year: [''],
            fileType: [''],
            operadora: [1],
        });
    }

    fileChanged(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];

            this.form.patchValue({
                fileSource: file,
            });
        }
    }

    operadoras = [
        {
            id: 1,
            name: 'SulAmerica',
            value: 'Sul America',
        },
        {
            id: 2,
            name: 'Amil',
            value: 'Amil',
        },
    ];

    fileTypes = [
        {
            id: 1,
            name: 'Beneficiarios',
        },
        {
            id: 2,
            name: 'Eventos',
        },
    ];

    months = [
        {
            id: 1,
            name: 'Janeiro',
        },
        {
            id: 2,
            name: 'Fevereiro',
        },
        {
            id: 3,
            name: 'Março',
        },
        {
            id: 4,
            name: 'Abril',
        },

        {
            id: 5,
            name: 'Maio',
        },

        {
            id: 6,
            name: 'Junho',
        },

        {
            id: 7,
            name: 'Julho',
        },

        {
            id: 8,
            name: 'Agosto',
        },
        {
            id: 9,
            name: 'Setembro',
        },
        {
            id: 10,
            name: 'Outubro',
        },
        {
            id: 11,
            name: 'Novembro',
        },
        {
            id: 12,
            name: 'Dezembro',
        },
    ];

    get Years() {
        const currentYear = new Date().getFullYear();
        const range = (start: any, stop: any, step: any) =>
            Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
        return range(currentYear, currentYear - 50, -1);
    }

    import() {
        const formData = new FormData();
        formData.append('file', this.form.get('fileSource')?.value);
        formData.append('fileName', 'Arquivo.xlsx');
        formData.append('month', this.form.get('month')?.value);
        formData.append('year', this.form.get('year')?.value);
        formData.append('classe', this.form.get('fileType')?.value);
        formData.append('operadora', this.form.get('operadora')?.value);

        console.log(this.form.value);

        this.httpClient.post('https://localhost:44372/integracao/import', formData).subscribe((data) => {
            console.log(data);
            console.log('Uploaded');
        });
    }
}
