/* obtener las librerias */
var express = require("express");
var nunjucks = require("nunjucks");
var bodyParser = require("body-parser");
var socketio = require("socket.io");
var http = require("http");
var sanitizer = require("sanitizer");

/*app representa la funcionalidad de la aplicacion web*/
var app = express();
var servidor = http.createServer(app);
servidor.listen(8080);

console.log("servidor levantado");

/*usamos body parser para recibir datos del cliente*/
app.use(bodyParser.urlencoded({
	extended : true
}));
console.log("body parser configurado");

/*configurar vistas estaticas css, videos, imagenes,
 * fuentes, javascript*/
app.use("/videos", express.static(__dirname + "/videos"));
app.use("/fuentes", express.static(__dirname + "/fuentes"));
app.use("/imagenes", express.static(__dirname + "/imagenes"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/javascript", express.static(__dirname + "/javascript"));

console.log("rutas estaticas configuradas");

/*configurar la carpeta de vistas*/
nunjucks.configure(__dirname + "/vistas", {
	express : app
});

console.log("sistemas de templates configurado");

app.get("/", function(req, res) {
	//res.send("Repondiendo a la peticion get /");
	res.render("index.html");
});

app.get("/index_contenido", function(req, res) {
	//res.send("Repondiendo a la peticion get /index_contenido");
	res.render("index_contenido.html");
});

app.get("/galeria", function(req, res) {
	//res.send("Repondiendo a la peticion get /galeria");
	res.render("galeria.html");
});

app.get("/galeria_contenido", function(req, res) {
	//res.send("Repondiendo a la peticion get /galeria_contenido");
	res.render("galeria_contenido.html");
});

app.get("/ubicacion", function(req, res) {
	//res.send("Repondiendo a la peticion get /ubicacion");
	res.render("ubicacion.html");
});

app.get("/ubicacion_contenido", function(req, res) {
	//res.send("Repondiendo a la peticion get /ubicacion_contenido");
	res.render("ubicacion_contenido.html");
});

app.get("/chat", function(req, res) {
	//res.send("Repondiendo a la peticion get /chat");
	res.render("chat.html");
});

app.get("/chat_contenido", function(req, res) {
	//res.send("Repondiendo a la peticion get /chat_contenido");
	res.render("chat_contenido.html");
});

app.get("/contacto", function(req, res) {
	//res.send("Repondiendo a la peticion get /contacto");
	res.render("contacto.html");
});

app.get("/contacto_contenido", function(req, res) {
	//res.send("Repondiendo a la peticion get /contacto_contenido");
	res.render("contacto_contenido.html");
});

/*respoder a una peticion post*/
app.post("/suscribir", function(req, res) {
	var parametroEmail = req.body.correo;
	console.log("Recibi " + parametroEmail);
	//por default se responde con suscribir.html
	var respuesta = "suscribir.html";
	//pero si la peticion es ajax se responde con suscribir_contenido.html
	if (req.body.esAjax) {
		respuesta = "suscribir_contenido.html";
	}

	res.render(respuesta, {
		email : parametroEmail
	});
});

app.post("/contactar", function(request, response) {
	var nombre = request.body.nombre;
	var email = request.body.correo;
	var web = request.body.sitio;
	var comentario = request.body.comentario;

	console.log(nombre);
	console.log(email);
	console.log(web);
	console.log(comentario);

	//por default se responde con contactar.html
	var respuesta = "contactar.html";
	//pero si la peticion es ajax se responde con contactar_contenido.html
	if (request.body.esAjax) {
		respuesta = "contactar_contenido.html";
	}

	response.render(respuesta, {
		nombre : nombre,
		email : email,
		comentario : comentario
	});
});

//escuchar peticiones de conexion
var io = socketio.listen(servidor);
//escuchar mensaje de cualqueir cliente
var contador = 0;
io.sockets.on("connection", function(socket) {
	//actualizar contador
	contador = contador + 1;
	//enviar un mensaje a los clientes
	io.sockets.emit("actualizar_contador", {
		clientes : contador
	});

	//enviarle el mensaje que recibi a todos los demas clientes
	socket.on("mensaje_al_servidor", function(datos) {
		console.log(datos.nombre);
		console.log(datos.mensaje);
		//enviale mensaje a todos los clientes
		io.sockets.emit("mensaje_al_cliente", {
			mensaje : sanitizer.escape(datos.mensaje),
			nombre : sanitizer.escape(datos.nombre)
		});
	});
});

