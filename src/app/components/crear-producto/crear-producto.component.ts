import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear Producto';
  id: string | null;

  constructor(private fb: FormBuilder, private router: Router,
    private toastr: ToastrService, private _productoService: ProductoService,
    private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEdit();
  }

  addProducto() {
    console.log(this.productoForm);

    //* FIXME: El valor de cada producto se guarda en las variables
    const product: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    //TODO: SI el id es distinto a null se edita el registro
    if(this.id !== null) {
      //* Editamos el producto
      this._productoService.updateProducto(this.id, product).subscribe(data => {
        
        // ? mensaje de actualizado
        this.toastr.info('El producto se actualizó con exito!', 'Producto Actualizado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })

    }else{
      //* Agregamos el producto
      console.log(product);
      this._productoService.saveProducto(product).subscribe(data => {
        // todo: mensaje de guardado
        this.toastr.success('El producto se registró exitosamente!', 'Producto Registrado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    }

  }

  isEdit() {
    if(this.id !== null) {
      this.titulo = "Editar Producto";
      this._productoService.getProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        })
      })
    }
  }
}
