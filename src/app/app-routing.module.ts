import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { StorageComponent } from './pages/storage/storage.component';
import { OverviewComponent } from './pages/storage/overview/overview.component';
import { UploadComponent } from './pages/storage/upload/upload.component';
import { ManageComponent } from './pages/storage/manage/manage.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  {path:"" , component:HomeComponent},
  {path:"signup" , component:SignUpComponent},
  {path:"login" , component:LogInComponent},
  {path:"storage" , component:StorageComponent, canActivate : [AuthGuard] ,
   children :[
    {path :"" , component : OverviewComponent},
    {path : "upload" , component : UploadComponent},
    {path : "manage-files" , component : ManageComponent},
    {path : "manage-users" , component : ManageUsersComponent , canActivate : [AdminGuard]}
   ]},
   {path : "**" , component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
