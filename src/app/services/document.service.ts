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
    return this.http.post<FileUploadedResponse[]>(url , formData );
  }


  renameFile(file : DocumentModel) : Observable<DocumentModel>{
    let url:string = `${environment.baseUrl}api/documents`;
    let body = {id : file.id , name : file.name , size : file.size , contentType : file.contentType , path : file.path , userId: file.userId}
    return this.http.put<DocumentModel>(url ,body);
  }

  deleteFile(file : DocumentModel){
    let url:string = `${environment.baseUrl}api/documents/${file.id}`;
    return this.http.delete(url);
  }

  downloadFile(file : DocumentModel) : Observable<Blob>{
   
    let url:string = `${environment.baseUrl}api/documents/download`;
    let body = {path : file.path , fileName : file.name , contentType : file.contentType};
    return this.http.post(url , body , {responseType : 'blob'});
  }

  getFiles() : Observable<DocumentModel[]>{
    let userName = this.authService.getUser()?.userName;
    let url:string = `${environment.baseUrl}api/documents/${userName}`;
    return this.http.get<DocumentModel[]>(url);
  }
}
