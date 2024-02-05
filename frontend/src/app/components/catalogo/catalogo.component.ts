import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoFactura } from '../../models/factura';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  productosAgregados: ProductoFactura[] = [];
  cantidad: number = 0;
  productoSeleccionado: Producto | null = null; // Inicializar productoSeleccionado como null
  mostrarValorTotal: boolean = false;
  constructor(private productoService: ProductoService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.getProductos()
      .subscribe(productos => this.productos = productos);
  }

  agregarProductoConCantidad(event: Event): void {
    event.preventDefault(); // Detener el envío automático del formulario

    if (!this.productoSeleccionado) {
      return; // Salir si no hay ningún producto seleccionado
    }

    if (!Number.isInteger(this.cantidad)) {
      alert('La cantidad debe ser un número entero.');
      return;
    }

    if (this.cantidad <= 0) {
      alert('La cantidad debe ser mayor que cero.');
      return;
    }

    const producto = { ...this.productoSeleccionado };

    if (this.cantidad > producto.unidades) {
      alert('La cantidad ingresada es mayor que las unidades disponibles.');
      return;
    }

    producto.unidades = this.cantidad;

    const id = this.productosAgregados.length + 1; // Genera un id único
    const productoFactura: ProductoFactura = {
      id: id,
      descripcion: producto.descripcion,
      unidades: producto.unidades,
      valor_unitario: producto.valor_unitario,
      valor_final: producto.valor_unitario * producto.unidades
    };

    this.productosAgregados.push(productoFactura);

    this.cantidad = 0;
    this.productoSeleccionado = null;
  }

  calcularValorTotal(): number {
    const errores = this.verificarErroresUnidades();
    if (errores) {
      alert(errores);
      return -1;
    }
  
    this.recalcularValorFinal();
    this.mostrarValorTotal = true;
    return this.productosAgregados.reduce((total, producto) => total + producto.valor_final, 0);
  }
  
  
  guardarProductos(): void {
    if (this.productosAgregados.length === 0) {
      alert('No hay productos agregados para guardar.');
      return;
    }
    if (this.calcularValorTotal() === -1){
      return;
    }
    // Guardar los productos agregados en el almacenamiento local
    ProductoFactura.guardarProductosEnAlmacenamientoLocal(this.productosAgregados);
    console.log('Productos guardados en el almacenamiento local:', this.productosAgregados);
    this.router.navigateByUrl('/detalle-venta');
  }
  

  eliminarProducto(id: number): void {
    this.productosAgregados = this.productosAgregados.filter(producto => producto.id !== id);
  }
  
  recalcularValorFinal(): void {
    this.productosAgregados.forEach(producto => {
      producto.valor_final = producto.unidades * producto.valor_unitario;
    });
  }

  verificarErroresUnidades(): string {
    let mensajeError = "";
    for (let producto of this.productosAgregados) {
      const productoExistente = this.productos.find(p => p.descripcion === producto.descripcion);
      if (!productoExistente) {
        mensajeError += `${producto.descripcion}: Producto no encontrado. Verifique.\n`;
      }
      if (!Number.isInteger(producto.unidades)) {
        mensajeError += `${producto.descripcion}: La cantidad ingresada debe ser un número entero. Verifique.\n`;
      }
      if (producto.unidades <= 0) {
        mensajeError += `${producto.descripcion}: La cantidad ingresada debe ser mayor que cero. Verifique.\n`;
      }
      if (productoExistente && producto.unidades > productoExistente.unidades) {
        mensajeError += `${producto.descripcion}: La cantidad ingresada es mayor que las unidades disponibles. Verifique.\n`;
      }
    }
    return mensajeError;
  }  
  
}
