import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "selector-name",
  templateUrl: "import-form.component.html",
  styleUrls: ["import-form.component.css"],
})
export class ImportFormComponent implements OnInit {
  constructor(private readonly httpClient: HttpClient) {}

  form = new FormGroup({
    file: new FormControl("", Validators.required),
    fileSource: new FormControl("", Validators.required),
  });

  ngOnInit() {}

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
