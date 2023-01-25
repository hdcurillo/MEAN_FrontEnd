import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';

// ? COMPONENTES
import { ListProductoComponent } from './components/list-producto/list-producto.component';

const routes: Routes = [
  { path: '', component: ListProductoComponent },
  { path: 'create', component: CrearProductoComponent },
  { path: 'edit/:id', component: CrearProductoComponent },
  { path: '**', redirectTo:'', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
