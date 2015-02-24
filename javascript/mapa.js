$(function() {
	navigator.geolocation.getCurrentPosition(function(posicion) {
		var latitud = posicion.coords.latitude;
		var longitud = posicion.coords.longitude;
		//alert("lon " + longitud + " lat " + latitud);
		//pintar el mapa
		$("#mapa").goMap({
			markers : [{
				latitude: latitud,
				longitude: longitud,
				draggable: true,
				icon: "../imagenes/marcadores/arrastrar.png",
				title: "Tu ubicacion",
				html:"Tu ubicacion"
			},{
				address: "Villa Cuahutèmoc, Edo. de Mex",
				icon:"../imagenes/marcadores/upo.png",
				title:"UNIVERSIDAD POLITECNICA DE OTZOLOTEPEC",
				html:"Calle Industria No. 36, Col. Villa Cuahutèmoc, Otzolotepec, Edo. de Mex"
			}],
			zoom : 12,
			maptype:"roadmap"
		});

	});

});
