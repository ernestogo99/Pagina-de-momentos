import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { moment } from '../../../moment';
import { environment } from '../../../../environments/environment.development';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; //icone de busca
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  allmoments: moment[] = [];
  moments: moment[] = [];
  baseapiurl = environment.baseapiurl;

  fasearch = faSearch; // definindo o icone
  searchterm: string = '';
  // todo search

  constructor(private momentservice: MomentService) {}

  ngOnInit(): void {
    //inicialização dos momentos buscando o service
    // usando método de recepção de dados
    this.momentservice.getmoments().subscribe((items) => {
      const data = items.data;
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.allmoments = data;
      this.moments = data;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allmoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value);
      // includes é um metodo string que verifica se um texto contem outro texto
      // no caso seria o value
    });
  }
}
