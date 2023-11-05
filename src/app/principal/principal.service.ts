import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  getHeaders() {
    return {
      headers: new HttpHeaders ({
        'Content-Type': 'application/json' ,
        'Authorization': 'Bearer' + environment.apiKey 
      })
    };
  }

  constructor(private http: HttpClient) { }
  
  getSupportedCurrencies(): Observable<any> {
    return this.http.get("https://v6.exchangerate-api.com/v6/"+environment.apiKey+"/latest/BRL");
  }

  getMoedasNomes(): Observable<any> {
    return this.http.get("https://v6.exchangerate-api.com/v6/"+environment.apiKey+"/codes");
  }

  converterMoeda(valor: number, moedaOrigem: string, moedaDestino: string): Observable<any> {
    const params = {
      from: moedaOrigem,
      to: moedaDestino,
      amount: valor.toString()
    };
    return this.http.get("https://v6.exchangerate-api.com/v6/"+environment.apiKey, { params });
  }

  getListaMoedas(): Observable<any> {
    return this.http.get("https://v6.exchangerate-api.com/v6/"+environment.apiKey+"/currencies");
  }

  getExchangeRate(base: string, target: string, amount?: number): Observable<any> {
    let url = `https://v6.exchangerate-api.com/v6/${environment.apiKey}/pair/${base}/${target}`;
    if (amount) {
      url += `/${amount}`;
    }
    return this.http.get(url);
  }


}

