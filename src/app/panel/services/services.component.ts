import { Component, OnInit } from '@angular/core';
import { ApiManagerService } from '../../core/services/api-manager.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private api: ApiManagerService) {}

  ngOnInit() {
    this.api.getServices()
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
  }

}
