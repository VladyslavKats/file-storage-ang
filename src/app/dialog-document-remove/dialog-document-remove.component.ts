import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { switchAll } from 'rxjs';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-dialog-document-remove',
  templateUrl: './dialog-document-remove.component.html',
  styleUrls: ['./dialog-document-remove.component.css']
})
export class DialogDocumentRemoveComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDocumentRemoveComponent> ,@Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit(): void {
  }

  remove(){
        this.dialogRef.close(true);  
  }
}
