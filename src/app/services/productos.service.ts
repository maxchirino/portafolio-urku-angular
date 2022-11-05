import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  cargando: boolean = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          'https://portafolio-urku-angular-default-rtdb.firebaseio.com/productos_idx.json'
        )
        .subscribe((resp: any) => {
          // console.log(resp);
          this.productos = resp;
          this.cargando = false;
          resolve('Todo ok');
        });
    });
  }

  getProducto(id: string) {
    return this.http.get(
      `https://portafolio-urku-angular-default-rtdb.firebaseio.com/productos/${id}.json`
    );
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      /* Cargar productos */
      this.cargarProductos().then(() => {
        /* Ejecutar después de tener los productos */
        /* Aplicar filtro */
        this.filtrarProductos(termino);
      });
    } else {
      /* Aplicar el filtro */
      this.filtrarProductos(termino);
    }

    // this.productosFiltrado = this.productos.filter((p) => {
    //   return true;
    // });
  }

  filtrarProductos(termino: string) {
    termino = termino.toLocaleLowerCase();
    /* Purgo el arreglo para que no se repitan los elementos cuando se busca varias veces */
    this.productosFiltrado = [];
    this.productos.forEach((prod) => {
      const tituloLower = prod.titulo.toLowerCase();
      if (
        prod.categoria.indexOf(termino) >= 0 ||
        tituloLower.indexOf(termino) >= 0
      ) {
        /* Si lo ingresado coincide de alguna forma con la categoría o el titulo, lo inserto en el arreglo */
        this.productosFiltrado.push(prod);
      }
    });
  }
}
