import { Component, OnInit } from '@angular/core';
import { DocumentModel } from 'src/app/interfaces/document-model';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private documentService : DocumentService) { }
  files : DocumentModel[] = [];

  ngOnInit(): void {
    this.documentService.getFiles()
      .subscribe((response :DocumentModel[] ) =>{
        this.files = response;
      })
  }

}
