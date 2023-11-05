import { Component, OnInit } from '@angular/core';
import { HistoricoService } from './historico.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 



@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, MatPaginatorModule, CommonModule],

})
export class HistoricoComponent implements OnInit {
  public historicoConversao: any[];

  constructor(private historicoService: HistoricoService) {
    this.historicoConversao = [];
  }

  ngOnInit(): void {
    this.historicoService.obterHistoricoDeConversoes().subscribe((dadosHistorico) => {
      this.historicoConversao = dadosHistorico;
    });
  }
}
