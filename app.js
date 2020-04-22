const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', 'views');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/registroVisitantes', {
	useNewUrlParser: true,	
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

const schema = new mongoose.Schema({
   
    name: String,
    email: String,
    password: String
  
});

const Visitor = mongoose.model('Registry', schema);

app.get('/', async (req, res) => {
	
	res.render('table');

});

app.get('/register', async (req, res) => {

	res.render('form');	

});

app.post('/', async (req, res) => {

	let allVisitors = [];

	const person = new Visitor({		
		name: req.body.nombre,
		email: req.body.correo,
		password: req.body.contrasena
	});

	await person.save(function(error){
		if(error)console.log("Error visitor vacio ", error);				
	});

	Visitor.find(function(err, visitors) {
	  if (err) return console.error("Error buscando "+ err);	  
	  console.log(visitors);

	  res.render("tabla2", { visitors: visitors });
	});			
  	
});


app.listen(3000, () => console.log('Listening on port 3000!'));