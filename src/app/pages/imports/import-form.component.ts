import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";

@Component({
  selector: "selector-name",
  templateUrl: "import-form.component.html",
  styleUrls: ["import-form.component.css"],
})
export class ImportFormComponent {
  data = {
    password: "",

  }
  constructor(
    private readonly httpClient: HttpClient,
    private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      ...this.data,
      file: new UntypedFormControl("", Validators.required),
      fileSource: new UntypedFormControl("", Validators.required),
    });
  }

  form = new UntypedFormGroup({
    file: new UntypedFormControl("", Validators.required),
    fileSource: new UntypedFormControl("", Validators.required),
  });

  fileChanged(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.form.patchValue({
        fileSource: file,
      });
    }
  }

  import() {
    const formData = new FormData();
    formData.append("file", this.form.get("fileSource")?.value);
    formData.append("fileName", "Arquivo.xlsx");
    console.log(formData.get("file"));

    this.httpClient
      .post("https://localhost:44372/integracao/import", formData)
      .subscribe((data) => {
        console.log(data);
        console.log("Uploaded");
      });
  }
}
