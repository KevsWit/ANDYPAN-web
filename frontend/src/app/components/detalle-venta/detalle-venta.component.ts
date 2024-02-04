import { Component, OnInit } from '@angular/core';
import { ProductoFactura, Factura } from '../../models/factura';
import { FacturaService } from '../../services/factura.service';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css']
})
export class DetalleVentaComponent implements OnInit {
  factura: Factura = new Factura(); // Inicializar factura con un objeto vacío de tipo Factura

  constructor(private facturaService: FacturaService, private productoService: ProductoService, private router: Router) { } // Inyectar FacturaService, ProductoService y Router en el constructor

  ngOnInit(): void {
    // Recuperar los productos guardados en el almacenamiento local
    const productosGuardados = ProductoFactura.recuperarProductosDeAlmacenamientoLocal();
    
    // Verificar si existen productos guardados
    if (!productosGuardados || productosGuardados.length === 0) {
      alert('No hay productos en la factura. Serás redirigido al catálogo.');
      this.router.navigateByUrl('/catalogo'); // Redirigir al catálogo
      return;
    }
    
    // Inicializar la factura con los productos recuperados si existen
    if (productosGuardados) {
      this.factura.productos = productosGuardados;
      this.factura.calcularValorTotal();
      // Limpiar los productos guardados en el almacenamiento local
      ProductoFactura.limpiarProductosEnAlmacenamientoLocal();
    }
  }

  guardarFactura(): void {
    // Verificar si todos los campos requeridos están completos
    if (!this.camposCompletos()) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
  
    // Llamar al método createFactura de FacturaService para guardar la factura en el servidor
    this.facturaService.createFactura(this.factura)
      .subscribe(
        (response) => {
          console.log('Factura guardada con éxito:', response);
          alert('Factura guardada con éxito');
          
          // Actualizar las unidades de los productos en la base de datos
          this.actualizarUnidadesProductos();
          // Redirigir a '/catalogo' y forzar la actualización de la página
          this.router.navigateByUrl('/catalogo').then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error al guardar la factura:', error);
          alert('Error al guardar la factura');
          // Manejar el error aquí si es necesario
        }
      );
  }
  
  camposCompletos(): boolean {
    // Verificar si todos los campos requeridos están completos
    return (
      this.factura.nombre !== "" &&
      this.factura.correo !== "" &&
      this.factura.telefono !== "" &&
      this.factura.dir !== "" &&
      this.factura.fecha.length > 0 && // Verificar que la fecha no esté vacía
      this.factura.cedula !== null
    );
  }  

  private actualizarUnidadesProductos(): void {
    this.factura.productos.forEach((productoFactura) => {
      this.productoService.getProductoByDescription(productoFactura.descripcion)
        .subscribe((producto) => {
          if (producto) {
            producto.unidades -= productoFactura.unidades; // Disminuir las unidades del producto
            this.productoService.updateProductoByDescription(producto.descripcion, producto)
              .subscribe(
                (response) => {
                  console.log('Unidades de producto actualizadas con éxito:', response);
                },
                (error) => {
                  console.error('Error al actualizar las unidades del producto:', error);
                }
              );
          }
        });
    });
  }

  // Método para agregar automáticamente los valores para "Consumidor Final"
  agregarConsumidorFinal(): void {
    this.factura.nombre = "Consumidor Final";
    this.factura.correo = "andypan@outlook.com";
    this.factura.telefono = "9999999";
    this.factura.dir = "Quitumbe";
    // Establecer la fecha actual
    const fechaActual = new Date();
    const formattedDate = fechaActual.toISOString().split('T')[0];
    this.factura.fecha = formattedDate;
    this.factura.cedula = 9999999999;
  }
}
