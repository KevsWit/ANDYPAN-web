const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan=require('morgan');
const {mongoose}=require('./database');
const app = express();
const port = 3000; // Puerto del servidor
app.set('nombreApp','Aplicacion para manejo de panaderia');
app.set('puerto',process.env.PORT|| 3000);


// Middleware para habilitar CORS (permitir todas las solicitudes desde cualquier origen)
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/facturas',require('./routes/facturas.routes'))
app.use('/api/productos',require('./routes/productos.routes'))


app.listen(app.get('puerto'), ()=>{
    console.log('Nombre de la App: ',app.get('nombreApp'));
    console.log('Puerto del servidor: ',app.get('puerto'));
})
