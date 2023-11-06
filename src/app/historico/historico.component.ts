import { Component, OnInit } from '@angular/core';
import { HistoricoService } from './historico.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],

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
