const Producto=require('../models/productos');
const express=require('express');
const router=express.Router();
const productosController={};

productosController.getProductos= async(req, res)=>
{
  const productos= await Producto.find();
  res.json(productos);
}

productosController.createProductos= async(req,res)=>{
    const producto=new Producto(req.body);
    console.log(producto);
    await producto.save();
    res.json('status: Producto guardado');
   }
   
   productosController.getProducto=async(req,res)=>{
    try {
        const productos = await Producto.find();
        res.send(productos);
      } catch (error) {
        res.status(500).send(error);
      }
   }
   productosController.editProductoByDescription = async (req, res) => {
    try {
      const descripcion = req.params.descripcion;
      const updatedData = req.body;
      const producto = await Producto.findOneAndUpdate({ descripcion: descripcion }, updatedData, { new: true });
  
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  productosController.deleteProductoByDescription = async (req, res) => {
    try {
      const descripcion = req.params.descripcion;
      const producto = await Producto.findOneAndDelete({ descripcion: descripcion });
  
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports=productosController;

