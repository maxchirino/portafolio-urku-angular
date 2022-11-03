import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root',
})
export class InfoPaginaService {
  info: InfoPagina = {};
  dataCargada: boolean = false;
  equipo: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    /* Leer archivo JSON */
    this.http
      .get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        // console.log(resp);
        this.info = resp;
        this.dataCargada = true;
      });
  }

  private cargarEquipo() {
    this.http
      .get(
        'https://portafolio-urku-angular-default-rtdb.firebaseio.com/equipo.json'
      )
      .subscribe((resp: any) => {
        // console.log(resp);
        this.equipo = resp;
      });
  }
}
