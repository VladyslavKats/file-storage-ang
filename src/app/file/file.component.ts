import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DialogDocumentRemoveComponent } from '../dialog-document-remove/dialog-document-remove.component';
import { DialogDocumentRenameComponent } from '../dialog-document-rename/dialog-document-rename.component';
import { DocumentModel } from '../interfaces/document-model';
import { AuthService } from '../services/auth.service';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  @Output() deleted = new EventEmitter<number>();
  @Input() file : DocumentModel | undefined;  
  isDeleted : boolean = false;

  constructor(private documentService:DocumentService , public dialog : MatDialog ,public authService : AuthService) { }

  ngOnInit(): void {
  }

  rename(){
    
    const dialogRef = this.dialog.open(DialogDocumentRenameComponent , {
      data : {
        file : this.file
      }
    });
   
  }


  remove(){
    const dialogRef = this.dialog.open(DialogDocumentRemoveComponent , {
      data : {
        file : this.file ,isDeleted : this.isDeleted
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      
      if(result && this.file){
        this.documentService.deleteFile(this.file)
          .subscribe(response => {
            
            Swal.fire({heightAuto:false , text : 'File ' + this.file?.name + ' was  deleted successful ' , icon : 'success'})
            this.deleted.emit(this.file?.id);
          } , error => {
            Swal.fire({title : 'Error' , heightAuto:false , text : 'Please try again or later' , icon : 'error'})
          });
       
      }
    });
  }


  download(){
    if(this.file === undefined)
      return;
   
    this.documentService.downloadFile(this.file)
      .subscribe((blob ) => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = this.file!.name;
        
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
  }


}
