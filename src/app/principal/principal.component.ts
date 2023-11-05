import { Component, OnInit } from '@angular/core';
import { PrincipalService } from './principal.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  apiResponse: any;

  constructor(private principalService: PrincipalService) {}
}
