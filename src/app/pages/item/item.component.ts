import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  producto!: ProductoDescripcion;
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parametros) => {
      // console.log(parametros['id']);
      this.id = parametros['id'];
      this.productosService
        .getProducto(parametros['id'])
        .subscribe((producto: any) => {
          // console.log(producto);
          this.producto = producto;
        });
    });
  }
}
