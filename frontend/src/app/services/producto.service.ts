import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://192.168.100.26:3000/api/productos';

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Crear un nuevo producto
  createProducto(producto: Producto): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto);
  }

  // Obtener un producto por descripción
  getProductoByDescription(descripcion: string): Observable<Producto> {
    const url = `${this.apiUrl}/${descripcion}`;
    return this.http.get<Producto>(url);
  }

  // Actualizar un producto por descripción
  updateProductoByDescription(descripcion: string, producto: Producto): Observable<Producto> {
    const url = `${this.apiUrl}/${descripcion}`;
    return this.http.put<Producto>(url, producto);
  }

  // Eliminar un producto por descripción
  deleteProductoByDescription(descripcion: string): Observable<any> {
    const url = `${this.apiUrl}/${descripcion}`;
    return this.http.delete<any>(url);
  }
  
}
