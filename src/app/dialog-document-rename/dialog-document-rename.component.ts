import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentModel } from '../interfaces/document-model';
import { DocumentService } from '../services/document.service';


@Component({
  selector: 'app-dialog-document-rename',
  templateUrl: './dialog-document-rename.component.html',
  styleUrls: ['./dialog-document-rename.component.css']
})
export class DialogDocumentRenameComponent implements OnInit {

  form : any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data : any , private documentService:DocumentService) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.data.file.name , Validators.required)
    })
    
  }

  save(){
    if(this.form.invalid){
      return;
    }
    const name = this.form.get('name').value;
    this.data.file.name = name;
    this.documentService.renameFile(this.data.file)
      .subscribe((response : DocumentModel) => {
        this.data.file = response;
      });

  }

}
