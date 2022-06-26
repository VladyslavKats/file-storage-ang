import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loading$ : any;

  constructor(public loaderService : LoaderService){}
  ngOnInit(): void {
    this.loading$ =  this.loaderService.isLoading$;
  }

 

}
