export class Producto {
    constructor(descripcion="",unidades=0,valor_unitario=0,path_imagen=""){
        this.descripcion=descripcion;
        this.unidades=unidades;
        this.valor_unitario=valor_unitario;
        this.path_imagen=path_imagen;
    }
    descripcion: string;
    unidades: number;
    valor_unitario: number;
    path_imagen: string;
}