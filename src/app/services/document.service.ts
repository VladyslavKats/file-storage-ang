import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { DocumentModel } from '../interfaces/document-model';
import { FileUploadedResponse } from '../interfaces/file-uploaded-response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient , private authService : AuthService) { }

  uploadFiles(files : File[]) : Observable<FileUploadedResponse[]> {


    let formData = new FormData();
    for (const file of files) {
      formData.append('files' , <File>file , file.name);
    }
    
    let userName  = this.authService.getUser()?.userName;
    let url : string = `${environment.baseUrl}api/documents/upload/${userName}`
    let headers = this.authService.createHeaderWithToken();

    return this.http.post<FileUploadedResponse[]>(url , formData , {headers : headers} );
  }


  renameFile(file : DocumentModel) : Observable<DocumentModel>{
    let url:string = `${environment.baseUrl}api/documents`;
    let body = {id : file.id , name : file.name , size : file.size , contentType : file.contentType , path : file.path , userId: file.userId}
    let headers = this.authService.createHeaderWithToken();

    return this.http.put<DocumentModel>(url ,body , {headers : headers});
  }

  deleteFile(file : DocumentModel){
    let url:string = `${environment.baseUrl}api/documents?Id=${file.id}&UserName=${file.user.name}`;
    let headers = this.authService.createHeaderWithToken();
    return this.http.delete(url , {headers : headers});
  }

  downloadFile(file : DocumentModel) : Observable<Blob>{
   
    let url:string = `${environment.baseUrl}api/documents/download`;
    let body = {path : file.path , fileName : file.name , contentType : file.contentType};
    let headers = this.authService.createHeaderWithToken();
    return this.http.post(url , body , {responseType : 'blob' , headers : headers});
  }

  getUserFiles() : Observable<DocumentModel[]>{
    let userName = this.authService.getUser()?.userName;
    let url:string = `${environment.baseUrl}api/documents/${userName}`;
    let headers = this.authService.createHeaderWithToken();
    return this.http.get<DocumentModel[]>(url , {headers : headers});
  }

  getAllFiles() : Observable<DocumentModel[]>{
    let url : string = `${environment.baseUrl}api/documents`;
    let headers = this.authService.createHeaderWithToken();
    return this.http.get<DocumentModel[]>(url , {headers : headers});
  }
}
