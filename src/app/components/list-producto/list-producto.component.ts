import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css']
})
export class ListProductoComponent implements OnInit {

  listProductos: Producto[] = [];

  constructor(private _productoService: ProductoService, private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data
    }, error => {
      console.log(error);
    })
  }

  deleteProducto(id: any) {
    this._productoService.deleteProducto(id).subscribe(data => {
      this.toastr.error('El producto fue eliminado con exito!', 'Producto Eliminado' );
      this.getProductos();
    }, error => {
      console.log(error);
    });
  }
}
