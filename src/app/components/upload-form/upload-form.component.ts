import {Component, Input, OnInit} from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  @Input() fileUpload!: FileUpload;

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  tempFile?: FileList;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }

  }

  selectTempFile(event: any): void {
    this.tempFile = event.target.files;
  }

  addFolder(fileUpload: any) {

    if (this.tempFile) {
      const file: File | null = this.tempFile.item(0);
      this.tempFile = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.addNewFolder(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }

    this.uploadService.deleteFile(fileUpload);
  }
}
