import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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


  @Input() file : DocumentModel | undefined;  


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
        file : this.file
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
        console.log(objectUrl)
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
  }


}
