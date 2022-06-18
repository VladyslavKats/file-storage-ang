import { Component, OnInit } from '@angular/core';
import { DocumentModel } from 'src/app/interfaces/document-model';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private documentService : DocumentService , private authService : AuthService) { }
  files : DocumentModel[] = [];

  ngOnInit(): void {

    if(this.authService.getUser()?.isAdmin){
      this.documentService.getAllFiles()
        .subscribe((response : DocumentModel[]) =>{
          this.files = response;
        })

    }else{
      this.documentService.getUserFiles()
      .subscribe((response :DocumentModel[] ) =>{
        this.files = response;
      });
    }
  }

}
