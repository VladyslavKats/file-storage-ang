import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DocumentModel } from 'src/app/interfaces/document-model';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private documentService : DocumentService , public authService : AuthService) { }
  files : DocumentModel[] = [];
  filesPage : DocumentModel[] = [];
  filteredFiles: DocumentModel[] = [];
  filesPerPage : number = 4;
  nameFilter : string = '';
  ownerFilter : string = '';
  sortedBySize : boolean = false;
  sortedByOwner : boolean = false;
  ngOnInit(): void {

    if(this.authService.getUser()?.isAdmin){
      this.documentService.getAllFiles()
        .subscribe((response : DocumentModel[]) =>{
          this.files = response;
          this.filteredFiles = [...this.files];
          this.filesPage = this.filteredFiles.slice(0 , this.filesPerPage);
        })

    }else{
      this.documentService.getUserFiles()
      .subscribe((response :DocumentModel[] ) =>{
        this.files = response;
        this.filteredFiles = [...this.files];
        this.filesPage = this.filteredFiles.slice(0 , this.filesPerPage);
      });
    }

    
  }

  onPageChange(event : PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.filteredFiles.length){
      endIndex = this.filteredFiles.length;
    }
    this.filesPage = this.filteredFiles.slice(startIndex , endIndex);
  } 


  applyFilterName(value : string , paginator : MatPaginator){
    if(!value && !this.ownerFilter){
      this.filteredFiles = [...this.files];
    }else if(!value && this.ownerFilter){
      this.filteredFiles = [...this.files];
      this.applyFilterOwner(this.ownerFilter , paginator);
    }
   
    this.filteredFiles = this.filteredFiles.filter(f => f.name.toLowerCase().startsWith(value.toLowerCase()));
    this.onPageChange({length : this.filteredFiles.length , pageIndex : 0 , pageSize : this.filesPerPage});
  }


  applyFilterOwner(value : string , paginator : MatPaginator){
    if(!value && !this.nameFilter){
      this.filteredFiles = [...this.files];
    }else if(!value && this.nameFilter){
      this.filteredFiles = [...this.files];
      this.applyFilterOwner(this.nameFilter , paginator);
    } 
   
    this.filteredFiles = this.filteredFiles.filter(f => f.user.name.toLowerCase().startsWith(value.toLowerCase()));
    this.onPageChange({length : this.filteredFiles.length , pageIndex : 0 , pageSize : this.filesPerPage});
  }


  sortBySize(){
    if(this.sortedBySize){
      this.filteredFiles = this.filteredFiles.sort((a , b) => {return  b.size - a.size});
      this.onPageChange({length : this.filteredFiles.length , pageIndex : 0 , pageSize : this.filesPerPage});
    }
  }

  sortByOwner(){
    if(this.sortedByOwner){
      this.filteredFiles = this.filteredFiles.sort((a , b) => {return  b.user.name > a.user.name ? -1 : (b.user.name < a.user.name )? 1 : 0});
      this.onPageChange({length : this.filteredFiles.length , pageIndex : 0 , pageSize : this.filesPerPage});
    }
  }

  resetFilters(){
    this.filteredFiles = [...this.files];
    this.nameFilter = '';
    this.ownerFilter = '';
    this.sortedByOwner = false;
    this.sortedBySize = false;
    this.onPageChange({length : this.filteredFiles.length , pageIndex : 0 , pageSize : this.filesPerPage});
  }

  removeFile(event: any){
    this.files = this.files.filter(f => f.id !== <number>event);
    this.filteredFiles = this.files;
    this.onPageChange({length : this.filteredFiles.length , pageIndex : 0 , pageSize : this.filesPerPage});
  }

}
