import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) { 
    this.cargarProducto();
  }

  private cargarProducto(){

    return new Promise( (resolve, reject) =>{
      this.http.get('https://angular-html-dcb27.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        this.cargando = false;
        this.productos = resp;

        resolve();
      });
    });
  }

  getProducto(id: string){
    // `cadena${variable}`; //utilizar esos signos para concatenar strings

    return this.http.get(`https://angular-html-dcb27.firebaseio.com/productos/${id}.json`);

  }

  buscarProducto(termino: string){

    if(this.productos.length == 0){
      //cargar productos
      this.cargarProducto().then(()=>{
        //ejecutar despues de tener los productos
        //aplicar filtro
        this.filtrarProductos(termino);
      });
    }else{
      //aplicar filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string){
    // this.productosFiltrado = this.productos.filter(producto => {
    //   return true;
    // });
    this.productosFiltrado = [];
    termino = termino.toLowerCase();

    this.productos.forEach(prod => {
      const titulo = prod.titulo.toLowerCase();

      if(prod.categoria.indexOf(termino)>=0 || titulo.indexOf(termino)>=0){
        this.productosFiltrado.push(prod);
      }
    });
    
  }

}
