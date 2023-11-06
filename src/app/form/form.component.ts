import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PrincipalService } from '../principal/principal.service';
import { IListaMoedas } from '../model/ListarMoedas';

export interface UserData {
  symbol: string;
  name: string;
}

@Component({
  selector: 'app-form',
  styleUrls: ['form.component.css'],
  templateUrl: './form.component.html',
  standalone: true,
  imports: [ MatInputModule, MatTableModule, MatPaginatorModule],
})
export class FormComponent implements OnInit {   


  displayedColumns: string[] = ['symbol', 'name'];
  dataSource: MatTableDataSource<IListaMoedas> = new MatTableDataSource<IListaMoedas>([]); pageSize: number = 10;

  @ViewChild('input', { static: true }) input: HTMLInputElement | undefined;
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort | undefined;

  constructor(private principalService: PrincipalService) {
      this.dataSource = new MatTableDataSource<IListaMoedas>([]);
  }

  ngOnInit() {
  this.principalService.getMoedasNomes().subscribe(
    (response) => {
      if (response.result === 'success' && response.supported_codes) {
        const currenciesArray: IListaMoedas[] = response.supported_codes.map((currency: any) => {
          return {
            symbol: currency[0],
            name: currency[1]
          };
        });
        this.dataSource = new MatTableDataSource<IListaMoedas>(currenciesArray);

        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }

        this.dataSource.filterPredicate = (data: IListaMoedas, filter: string) => {
          const dataStr = `${data.symbol.toLowerCase()} ${data.name.toLowerCase()}`;
          return dataStr.indexOf(filter) !== -1;
        };
      }
    },
  );
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}



