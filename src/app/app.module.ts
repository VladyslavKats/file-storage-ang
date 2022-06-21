import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MaterialExampleModule } from './material.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgCircleProgressModule } from 'ng-circle-progress';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import {AuthService} from "./services/auth.service";
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { StorageComponent } from './pages/storage/storage.component';
import { OverviewComponent } from './pages/storage/overview/overview.component';
import { UploadComponent } from './pages/storage/upload/upload.component';
import { DocumentService } from './services/document.service';
import { NumberTrackerComponent } from './number-tracker/number-tracker.component';
import { ManageComponent } from './pages/storage/manage/manage.component';
import { FileComponent } from './file/file.component';
import { DialogDocumentRenameComponent } from './dialog-document-rename/dialog-document-rename.component';
import { DialogDocumentRemoveComponent } from './dialog-document-remove/dialog-document-remove.component';
import { IterceptorService } from './services/iterceptor.service';
import {  BytePipe } from './pipes/byte.pipe';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    FaqComponent,
    FooterComponent,
    SignUpComponent,
    LogInComponent,
    StorageComponent,
    OverviewComponent,
    UploadComponent,
    NumberTrackerComponent,
    ManageComponent,
    FileComponent,
    DialogDocumentRenameComponent,
    DialogDocumentRemoveComponent,
    BytePipe,
    ManageUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialExampleModule,
    NgxDropzoneModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    })
  ],
  providers: [AuthService , DocumentService , {provide : HTTP_INTERCEPTORS , useClass: IterceptorService , multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
