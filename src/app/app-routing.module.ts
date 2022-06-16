import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {FaqComponent} from "./pages/faq/faq.component";
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { StorageComponent } from './pages/storage/storage.component';
import { OverviewComponent } from './pages/storage/overview/overview.component';
import { UploadComponent } from './pages/storage/upload/upload.component';
import { ManageComponent } from './pages/storage/manage/manage.component';


const routes: Routes = [
  {path:"" , component:HomeComponent},
  {path:"about" , component:AboutComponent},
  {path:"contact" , component:ContactComponent},
  {path:"faq" , component:FaqComponent},
  {path:"signup" , component:SignUpComponent},
  {path:"login" , component:LogInComponent},
  {path:"storage" , component:StorageComponent ,
   children :[
    {path :"" , component : OverviewComponent},
    {path : "upload" , component : UploadComponent},
    {path : "manage" , component : ManageComponent}
   ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
