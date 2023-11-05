import { Injectable } from '@angular/core';
import { HistoricoConversao } from '../model/Historico';
import { Observable, of } from 'rxjs'; // Importe Observable e of

@Injectable()
export class HistoricoService {
  private historicoKey = 'Historico';

  // Obtém o histórico de conversões
  obterHistoricoDeConversoes(): Observable<HistoricoConversao[]> {
    const historico = this.getHistorico();
    return of(historico); 
  }

  private getHistorico(): HistoricoConversao[] {
    const historicoJSON = localStorage.getItem(this.historicoKey);
    return historicoJSON ? JSON.parse(historicoJSON) : [];
  }

  adicionarConversaoHistorico(conversao: HistoricoConversao) {
    const historico = this.getHistorico();
    historico.push(conversao);
    localStorage.setItem(this.historicoKey, JSON.stringify(historico));
  }
}
