const mongoose=require('mongoose');
const {Schema}=mongoose;
const ProductosSchema=new Schema({
    descripcion:{type:String, required: true},
    unidades:{type:Number, required:true},
    valor_unitario:{type:Number, required:true},
    path_imagen:{type:String, required: true}
   })
   module.exports=mongoose.model('Producto',ProductosSchema);