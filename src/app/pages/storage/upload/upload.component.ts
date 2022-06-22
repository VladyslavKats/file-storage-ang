import { Component, OnInit } from '@angular/core';
import { FileUploadedResponse } from 'src/app/interfaces/file-uploaded-response';
import { DocumentService } from 'src/app/services/document.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  files : File[] = [];

  filesUploaded : FileUploadedResponse[]= [];

  onSelect(event : any) {
    
    this.files.push(...event.addedFiles);
   
  }
  
  onRemove(event : any) {
    
    this.files.splice(this.files.indexOf(event), 1);
  }

  constructor(private documentService : DocumentService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.files.length === 0){
      return;
    }

    this.documentService.uploadFiles(this.files)
      .subscribe((response : FileUploadedResponse[]) => {
        this.files = [];
        Swal.fire({heightAuto:false , text : 'Files has been uploaded successful' , icon : 'success'})
        for (const r of response) {
          this.filesUploaded.push({name : r.name , size : r.size});
        }
      });
    
  }
 
}
