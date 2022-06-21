import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-dialog-document-remove',
  templateUrl: './dialog-document-remove.component.html',
  styleUrls: ['./dialog-document-remove.component.css']
})
export class DialogDocumentRemoveComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDocumentRemoveComponent> ,@Inject(MAT_DIALOG_DATA) public data : any , private documentService:DocumentService , private router : Router) { }

  ngOnInit(): void {
  }

  remove(){
    this.documentService.deleteFile(this.data.file)
      .subscribe(response => {
        this.dialogRef.close(true);
      }, error => {
        this.dialogRef.close(false);
      });
    
    
  }
}
