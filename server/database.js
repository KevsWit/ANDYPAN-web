const mongoose=require('mongoose');
const URI = 'mongodb://username:password@host:port/[database]?ssl=true';
mongoose.connect(URI)
.then(db=> console.log('BD conectada'))
.catch(err => console.error(err));
module.exports=mongoose;