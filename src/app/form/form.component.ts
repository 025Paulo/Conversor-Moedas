import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PrincipalService } from '../principal/principal.service';

export interface UserData {
  symbol: string;
  name: string;
}

@Component({
  selector: 'app-form',
  styleUrls: ['form.component.css'],
  templateUrl: './form.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
})
export class FormComponent implements OnInit {   

  displayedColumns: string[] = ['symbol', 'name'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>([]); pageSize: number = 10;

  @ViewChild('input', { static: true }) input: HTMLInputElement | undefined;
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort | undefined;

  constructor(private principalService: PrincipalService) {
    this.principalService.getMoedasNomes().subscribe((data: UserData[]) => {
      this.dataSource = new MatTableDataSource<UserData>(data);
    });
  }

  ngOnInit() {
  this.principalService.getMoedasNomes().subscribe(
    (response) => {
      if (response.result === 'success' && response.supported_codes) {
        const currenciesArray: UserData[] = response.supported_codes.map((currency: any) => {
          return {
            symbol: currency[0],
            name: currency[1]
          };
        });

        this.dataSource = new MatTableDataSource<UserData>(currenciesArray);

        if (this.paginator) {
          this.dataSource.paginator = this.paginator;

        } if (this.sort) {
          this.dataSource.sort = this.sort;
        }

        this.dataSource.filterPredicate = (data: UserData, filter: string) => {
          const dataStr = `${data.symbol.toLowerCase()} ${data.name.toLowerCase()}`;
          return dataStr.indexOf(filter) !== -1;
        };
      }
    },
    (error) => {
      console.error('Erro ao buscar os dados da API', error);
    }
  );
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}



