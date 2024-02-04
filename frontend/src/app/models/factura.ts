export class Factura {
    constructor(
      public nombre: string = "",
      public correo: string = "",
      public telefono: string = "",
      public dir: string = "",
      public fecha: string = "",
      public cedula: number = 0,
      public productos: ProductoFactura[] = [],
      public valor_total: number = 0
    ) {}

    // Método para calcular el valor total de la factura
    calcularValorTotal(): void {
      this.valor_total = this.productos.reduce((total, producto) => total + producto.valor_final, 0);
    }
  } 
  
  export class ProductoFactura {
    constructor(
      public id: number,
      public descripcion: string,
      public unidades: number,
      public valor_unitario: number,
      public valor_final: number
    ) {}
  
    // Método estático para guardar la lista de productos en el almacenamiento local
    static guardarProductosEnAlmacenamientoLocal(productos: ProductoFactura[]): void {
      sessionStorage.setItem('productos', JSON.stringify(productos));
    }
  
    // Método estático para recuperar la lista de productos del almacenamiento local
    static recuperarProductosDeAlmacenamientoLocal(): ProductoFactura[] | null {
      const productosGuardados = sessionStorage.getItem('productos');
      return productosGuardados ? JSON.parse(productosGuardados) : null;
    }

    // Método estático para limpiar los productos guardados en el almacenamiento local
    static limpiarProductosEnAlmacenamientoLocal(): void {
      sessionStorage.removeItem('productos');
    }
  }