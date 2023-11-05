import { Component, OnInit } from '@angular/core';
import { PrincipalService } from '../principal/principal.service';
import { HistoricoConversao } from '../model/Historico';
import { HistoricoService } from '../historico/historico.service';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {
  moedas: any[] = [];
  moedaOrigem: string = '';
  moedaDestino: string = '';
  valor: number = 0;
  moedaConvertida: number = 0;
  taxaConversao: number = 0;

  constructor(
    private principalService: PrincipalService,
    private historicoService: HistoricoService
  ) {}

  ngOnInit() {
    this.conversorMoedas();
  }

  conversorMoedas() {
    this.principalService.getMoedasNomes().subscribe(
      (response: any) => {
        if (response.result === 'success' && response.supported_codes) {
          this.moedas = response.supported_codes.map((currency: any) => ({
            name: currency[1],
            symbol: currency[0]
          }));
        }
      },
      (error: any) => {
        console.error('Erro ao obter a lista de moedas:', error);
      }
    );
  }

  converterMoeda() {
    if (this.moedaOrigem && this.moedaDestino && this.valor) {
      this.principalService.getExchangeRate(this.moedaOrigem, this.moedaDestino, this.valor).subscribe(
        (response: any) => {
          if (response.result === 'success' && response.conversion_rate) {
            this.moedaConvertida = response.conversion_result;
            this.taxaConversao = response.conversion_rate;

            const conversao: HistoricoConversao = {
              moedaOrigem: this.moedaOrigem,
              moedaDestino: this.moedaDestino,
              valorOrigem: this.valor,
              valorConvertido: this.moedaConvertida,
              taxaConversao: this.taxaConversao,
              data: new Date()
            };
            this.historicoService.adicionarConversaoHistorico(conversao);
          }
        },
        (error: any) => {
          console.error('Erro na conversão:', error);
        }
      );
    } else {
      console.error('Preencha todos os campos.');
    }
  }
}
